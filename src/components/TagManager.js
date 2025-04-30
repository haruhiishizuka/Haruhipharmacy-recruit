// src/components/TagManager.js（更新版）
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GTMコンテナIDとGoogle広告IDの設定
const GTM_ID = 'GTM-NHNQQ82M';
const ADS_CONVERSION_ID = 'AW-17044188297';

// 初期化関数（既存のGTMと新しいGoogle広告タグの両方を初期化）
function initializeTracking() {
  // GTMの初期化
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  
  // Google広告タグの初期化
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ADS_CONVERSION_ID);
}

// スクリプトを挿入する関数
function injectTrackingScripts() {
  // GTMスクリプト挿入
  if (!document.getElementById('gtm-script')) {
    const gtmScript = document.createElement('script');
    gtmScript.id = 'gtm-script';
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtmScript);
  }
  
  // Google広告タグスクリプト挿入
  if (!document.getElementById('google-ads-script')) {
    const adsScript = document.createElement('script');
    adsScript.id = 'google-ads-script';
    adsScript.async = true;
    adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_CONVERSION_ID}`;
    document.head.appendChild(adsScript);
  }
  
  // GTM noScriptフレーム挿入
  if (!document.getElementById('gtm-noscript')) {
    const noscript = document.createElement('noscript');
    noscript.id = 'gtm-noscript';
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

// コンバージョンイベント送信関数をエクスポート（他のコンポーネントから使用可能）
export const trackConversion = (conversionLabel, params = {}) => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${ADS_CONVERSION_ID}/${conversionLabel}`,
      ...params
    });
    console.log(`📊 Google広告コンバージョントラッキング: ${conversionLabel}`, params);
  } else {
    console.warn('Google広告タグが初期化されていません');
  }
};

// メインのTagManagerコンポーネント
const TagManager = () => {
  const location = useLocation();
  
  // 初期化（マウント時に1回のみ実行）
  useEffect(() => {
    initializeTracking();
    injectTrackingScripts();
    
    console.log('🏷️ Google Tag ManagerとGoogle広告タグが初期化されました');
  }, []);
  
  // ページビュートラッキング（URL変更時）
  useEffect(() => {
    if (window.dataLayer) {
      // GTMページビュー
      window.dataLayer.push({
        event: 'page_view',
        page: {
          path: location.pathname,
          title: document.title,
          location: window.location.href
        }
      });
      
      // Google広告ページビュー
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_location: window.location.href,
          page_path: location.pathname,
          page_title: document.title
        });
      }
      
      console.log(`📊 ページビュートラッキング: ${location.pathname}`);
    }
  }, [location]);
  
  return null; // UIは表示しない
};

export default TagManager;