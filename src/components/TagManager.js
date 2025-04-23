// src/components/TagManager.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GTMコンテナID
const GTM_ID = 'GTM-NHNQQ82M';

// GTMスクリプトを初期化する関数
function initializeGTM() {
  if (window.dataLayer) return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
}

// GTMスクリプトをDOMに追加する関数
function injectGTMScript() {
  if (document.getElementById('gtm-script')) return;
  
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  
  document.head.appendChild(script);
}

// GTM noScriptフレームを追加する関数
function injectGTMNoScript() {
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
  document.body.insertBefore(noscript, document.body.firstChild);
}

// メインのTagManagerコンポーネント
const TagManager = () => {
  const location = useLocation();
  
  // 初期化とスクリプト挿入（初回のみ）
  useEffect(() => {
    initializeGTM();
    injectGTMScript();
    injectGTMNoScript();
    
    console.log('🏷️ Google Tag Manager initialized');
  }, []);
  
  // ページビューのトラッキング（ルート変更時）
  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page: {
          path: location.pathname,
          title: document.title,
          location: window.location.href
        }
      });
      
      console.log(`📊 Page view tracked: ${location.pathname}`);
    }
  }, [location]);
  
  return null; // このコンポーネントはUIを表示しない
};

export default TagManager;