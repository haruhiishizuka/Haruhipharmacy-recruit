// src/components/TagManager.js - 強化版

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GTMコンテナID - 画面で確認された正しいID
const GTM_ID = 'GTM-NHNQQ82M';

// デバッグモード - 開発環境では true に設定
const DEBUG_MODE = true;

/**
 * GTMスクリプトを初期化する関数
 * - dataLayerの初期化を行う
 * - 既に初期化済みの場合は処理をスキップ
 */
function initializeGTM() {
  if (typeof window === 'undefined') return;
  
  // dataLayerが未定義の場合のみ初期化
  if (!window.dataLayer) {
    window.dataLayer = [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    
    if (DEBUG_MODE) {
      console.log('🏷️ Google Tag Manager dataLayer 初期化完了');
    }
  }
}

/**
 * GTMスクリプトをDOMに追加する関数
 * - script要素がまだ存在しない場合のみ追加
 */
function injectGTMScript() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('gtm-script')) return;
  
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  
  // エラーハンドリングを追加
  script.onerror = () => {
    console.error('🏷️ GTMスクリプトの読み込みに失敗しました');
  };
  
  script.onload = () => {
    if (DEBUG_MODE) {
      console.log('🏷️ GTMスクリプト読み込み完了');
    }
  };
  
  // DOMに追加
  document.head.appendChild(script);
}

/**
 * GTM noScriptフレームを追加する関数
 */
function injectGTMNoScript() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('gtm-noscript')) return;
  
  const noscript = document.createElement('noscript');
  noscript.id = 'gtm-noscript';
  
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  
  noscript.appendChild(iframe);
  
  // body要素が読み込まれていることを確認
  if (document.body) {
    document.body.insertBefore(noscript, document.body.firstChild);
  } else {
    // bodyがまだ読み込まれていない場合は、DOMContentLoadedイベントで処理
    document.addEventListener('DOMContentLoaded', () => {
      document.body.insertBefore(noscript, document.body.firstChild);
    });
  }
}

/**
 * 手動でページビューを送信する関数
 */
function sendPageView(path, title) {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  const pageInfo = {
    event: 'page_view',
    page: {
      path: path,
      title: title || document.title,
      location: window.location.href
    }
  };
  
  window.dataLayer.push(pageInfo);
  
  if (DEBUG_MODE) {
    console.log(`📊 ページビュー送信: ${path}`, pageInfo);
  }
}

/**
 * メインコンポーネント - パフォーマンス最適化版
 */
const TagManager = () => {
  const location = useLocation();
  
  // マウント時の初期化処理
  useEffect(() => {
    try {
      // GTM初期化
      initializeGTM();
      
      // スクリプト挿入
      injectGTMScript();
      
      // NoScript挿入
      injectGTMNoScript();
      
      if (DEBUG_MODE) {
        console.log('🏷️ Google Tag Manager 初期化完了');
      }
    } catch (error) {
      console.error('🏷️ TagManager初期化エラー:', error);
    }
    
    // コンポーネントのアンマウント時にメッセージを出力（デバッグ用）
    return () => {
      if (DEBUG_MODE) {
        console.log('🏷️ TagManagerコンポーネントがアンマウントされました');
      }
    };
  }, []); // 空の依存配列で初期化を1回だけ実行
  
  // ルート変更時のページビュートラッキング
  useEffect(() => {
    try {
      if (window.dataLayer) {
        // ページビュー送信
        sendPageView(location.pathname, document.title);
      } else if (DEBUG_MODE) {
        console.warn('🏷️ dataLayerが初期化されていないため、ページビューを送信できません');
      }
    } catch (error) {
      console.error('🏷️ ページビュー送信エラー:', error);
    }
  }, [location]); // locationが変わるたびに実行
  
  // このコンポーネントはUIを表示しない
  return null;
};

export default TagManager;