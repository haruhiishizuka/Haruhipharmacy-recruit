// src/utils/analytics.js - 改善版

/**
 * MediMatchアナリティクス - GTMとGA4の連携を強化
 * 問題点：イベントが正しく発火していない
 * 解決策：初期化処理の改善とデバッグ機能の追加
 */

// GTMコンテナID - 画面で確認された値
const GTM_ID = 'GTM-NHNQQ82M';
// GA4測定ID - 必要に応じて設定
const GA4_ID = 'G-NMHD56M04S';

// デバッグモード - 開発中はtrueに設定
const DEBUG_MODE = true;

/**
 * GTMの初期化
 * 問題：初期化タイミングが遅い可能性
 * 解決：ページ読み込み直後に確実に初期化
 */
export const initializeGTM = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    if (!window.dataLayer) {
      window.dataLayer = [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      
      // GTMスクリプトのDOM挿入
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
      
      if (DEBUG_MODE) console.log('🔄 GTM初期化完了: ' + GTM_ID);
      return true;
    } else {
      if (DEBUG_MODE) console.log('✓ GTMは既に初期化されています');
      return true;
    }
  } catch (error) {
    console.error('❌ GTM初期化エラー:', error);
    return false;
  }
};

/**
 * イベントトラッキング関数 - 改善版
 * 問題：イベントが発火していない、デバッグが困難
 * 解決：エラーハンドリング強化・デバッグ出力
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  try {
    // 未初期化の場合は初期化を行う
    if (!window.dataLayer) {
      initializeGTM();
    }
    
    // イベントデータの構築
    const eventData = {
      event: eventName,
      event_time: new Date().toISOString(),
      ...eventParams
    };
    
    // イベント送信
    window.dataLayer.push(eventData);
    
    if (DEBUG_MODE) {
      console.log(`📊 アナリティクスイベント送信: ${eventName}`, eventParams);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ イベント送信エラー (${eventName}):`, error);
    return false;
  }
};

/**
 * ページビュートラッキング
 * ページ遷移時に自動的に呼び出す
 */
export const trackPageView = (path, title) => {
  const pageTitle = title || document.title;
  const pagePath = path || window.location.pathname;
  
  return trackEvent('page_view', {
    page_title: pageTitle,
    page_path: pagePath,
    page_location: window.location.href
  });
};

/**
 * 診断開始イベントの改善版
 */
export const trackQuizStart = (source) => {
  return trackEvent('quiz_start', { 
    source,
    timestamp: new Date().toISOString()
  });
};

/**
 * 職種選択イベントの改善版
 */
export const trackProfessionSelect = (profession) => {
  return trackEvent('profession_select', { 
    profession,
    timestamp: new Date().toISOString()
  });
};

/**
 * 質問回答イベントの改善版
 */
export const trackQuestionAnswer = (questionIndex, questionId, answerValue) => {
  return trackEvent('question_answer', {
    question_index: questionIndex,
    question_id: questionId,
    answer_value: answerValue,
    timestamp: new Date().toISOString()
  });
};

/**
 * 診断完了イベントの改善版
 */
export const trackQuizComplete = (resultType, timeSpent) => {
  return trackEvent('quiz_complete', {
    result_type: resultType,
    time_spent: timeSpent,
    timestamp: new Date().toISOString()
  });
};

/**
 * 連絡フォーム表示イベントの改善版
 */
export const trackContactStart = (resultType, profession) => {
  return trackEvent('contact_start', {
    result_type: resultType,
    profession,
    timestamp: new Date().toISOString()
  });
};

/**
 * 連絡フォーム送信イベントの改善版
 */
export const trackContactSubmit = (resultType, profession, contactMethod) => {
  return trackEvent('contact_submit', {
    result_type: resultType,
    profession,
    contact_method: contactMethod,
    timestamp: new Date().toISOString()
  });
};

// アプリケーション初期化時に実行すべき関数
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // GTM初期化
    initializeGTM();
    
    // 初期ページビュー送信
    trackPageView();
    
    if (DEBUG_MODE) {
      console.log('📊 アナリティクス初期化完了');
    }
  }
};

// 自動的に初期化
if (typeof window !== 'undefined') {
  initializeAnalytics();
}