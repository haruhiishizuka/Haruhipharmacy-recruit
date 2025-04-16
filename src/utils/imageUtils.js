// src/utils/imageUtils.js

/**
 * 画像の遅延ロードと最適化のためのユーティリティ関数群
 */

/**
 * 画像ファイルパスを圧縮画像へのパスに変換
 * 例: '/images/icon.png' → '/images/optimized/icon.png'
 * 
 * @param {string} src - 元の画像パス
 * @returns {string} - 最適化された画像パス
 */
export const getOptimizedImagePath = (src) => {
  if (!src) return '';
  
  // すでに最適化済みの画像はそのまま返す
  if (src.includes('/optimized/')) {
    return src;
  }
  
  // パスを分解して最適化フォルダを挿入
  const lastSlashIndex = src.lastIndexOf('/');
  if (lastSlashIndex === -1) return src;
  
  const directory = src.substring(0, lastSlashIndex);
  const filename = src.substring(lastSlashIndex + 1);
  
  return `${directory}/optimized/${filename}`;
};

/**
 * Webpフォーマットの画像パスを取得
 * ブラウザがWebpをサポートしている場合に使用
 * 
 * @param {string} src - 元の画像パス
 * @returns {string} - Webp形式の画像パス
 */
export const getWebpPath = (src) => {
  if (!src) return '';
  
  // すでにwebp形式の場合はそのまま返す
  if (src.endsWith('.webp')) {
    return src;
  }
  
  // 拡張子をwebpに変更
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return `${src}.webp`;
  
  return `${src.substring(0, lastDotIndex)}.webp`;
};

/**
 * 画像のサイズ指定バージョンのパスを取得
 * 例: '/images/icon.png' → '/images/icon-300w.png'
 * 
 * @param {string} src - 元の画像パス
 * @param {number} width - 希望する画像幅
 * @returns {string} - サイズ指定された画像パス
 */
export const getSizedImagePath = (src, width) => {
  if (!src || !width) return src;
  
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return src;
  
  const basePath = src.substring(0, lastDotIndex);
  const extension = src.substring(lastDotIndex);
  
  return `${basePath}-${width}w${extension}`;
};

/**
 * 環境に応じた最適な画像パスを返す（Webpサポート、画面サイズを考慮）
 * 
 * @param {string} src - 元の画像パス
 * @param {number} desiredWidth - 希望する画像幅
 * @returns {string} - 最適化された画像パス
 */
export const getResponsiveImagePath = (src, desiredWidth = 0) => {
  // 環境チェック
  const isWebpSupported = typeof document !== 'undefined' && 
                         document.createElement('canvas')
                         .toDataURL('image/webp')
                         .indexOf('data:image/webp') === 0;
  
  // ベースパスを最適化フォルダに変更
  let optPath = getOptimizedImagePath(src);
  
  // Webpサポートの場合はWebp形式に
  if (isWebpSupported) {
    optPath = getWebpPath(optPath);
  }
  
  // サイズ指定がある場合は適用
  if (desiredWidth > 0) {
    optPath = getSizedImagePath(optPath, desiredWidth);
  }
  
  return optPath;
};

/**
 * 画像の遅延ロード用のカスタムコンポーネント
 */
import React, { useState, useEffect } from 'react';

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  style = {},
  quality = 'auto',  // 'low', 'medium', 'high', 'auto'
  priority = false   // trueの場合は遅延ロードしない
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  
  // 画面幅に基づいたサイズ選択
  const getOptimalWidth = () => {
    if (typeof window === 'undefined') return 800;
    
    // モバイルかどうかを判定
    const isMobile = window.innerWidth <= 768;
    
    // 画質設定に基づいて幅を選択
    switch(quality) {
      case 'low':
        return isMobile ? 200 : 400;
      case 'medium':
        return isMobile ? 400 : 800;
      case 'high':
        return isMobile ? 600 : 1200;
      case 'auto':
      default:
        // ディスプレイの幅に応じて最適なサイズを選択
        return Math.min(window.innerWidth, 1200);
    }
  };
  
  // プレースホルダーの色を生成（srcから簡易的なハッシュを作成）
  const getPlaceholderColor = () => {
    if (!src) return '#cccccc';
    
    let hash = 0;
    for (let i = 0; i < src.length; i++) {
      hash = src.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${"00000".substring(0, 6 - c.length)}${c}`;
  };
  
  useEffect(() => {
    if (!src) return;
    
    // 優先度が高い場合は即座に読み込み
    if (priority) {
      const optimizedSrc = getResponsiveImagePath(src, getOptimalWidth());
      setImageSrc(optimizedSrc);
      return;
    }
    
    // Intersection Observer APIを使用した遅延ロード
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const optimizedSrc = getResponsiveImagePath(src, getOptimalWidth());
          setImageSrc(optimizedSrc);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // 画面外200pxの位置から先行して読み込み開始
      threshold: 0.01      // わずかに見えただけで読み込み開始
    });
    
    // 自分自身を監視対象に
    const currentElement = document.getElementById(`img-container-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, priority]);
  
  return (
    <div 
      id={`img-container-${src ? src.replace(/[^a-zA-Z0-9]/g, '') : 'unknown'}`}
      className={`optimized-image-container ${className}`}
      style={{ 
        position: 'relative',
        width: width || '100%', 
        height: height || 'auto',
        backgroundColor: getPlaceholderColor(),
        borderRadius: '8px',
        overflow: 'hidden',
        ...style
      }}
    >
      {!isLoaded && imageSrc && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px'
        }}>
          <div className="loading-spinner" style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            borderTop: '2px solid white',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      )}
      
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={alt || '画像'} 
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          loading={priority ? "eager" : "lazy"}
        />
      )}
      
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

/**
 * 複数の環境に対応できるimgSrcSetを生成
 * 
 * @param {string} src - 元の画像パス 
 * @returns {string} - srcset属性用の文字列
 */
export const generateSrcSet = (src) => {
  if (!src) return '';
  
  const widths = [200, 400, 800, 1200, 1600];
  const isWebpSupported = typeof document !== 'undefined' && 
                         document.createElement('canvas')
                         .toDataURL('image/webp')
                         .indexOf('data:image/webp') === 0;
  
  // 最適化されたベースパス
  const basePath = getOptimizedImagePath(src);
  const webpPath = isWebpSupported ? getWebpPath(basePath) : basePath;
  
  // srcsetを生成
  const srcsetArray = widths.map(w => `${getSizedImagePath(webpPath, w)} ${w}w`);
  
  return srcsetArray.join(', ');
};

/**
 * 画像のプリロード処理
 * 重要な画像を事前にロードする場合に使用
 * 
 * @param {string[]} srcArray - プリロードする画像パスの配列
 */
export const preloadImages = (srcArray) => {
  if (!Array.isArray(srcArray) || !srcArray.length) return;
  
  srcArray.forEach(src => {
    if (!src) return;
    
    const img = new Image();
    img.src = getResponsiveImagePath(src);
  });
};