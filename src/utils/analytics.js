// src/utils/analytics.js
/**
 * MediMatchアナリティクス - GTMを通じてイベントを送信するユーティリティ
 */

// GA4測定ID
const GA4_ID = 'G-NMHD56M04S';

/**
 * カスタムイベントをdataLayerに送信
 * @param {string} eventName - イベント名
 * @param {Object} eventParams - イベントパラメータ
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.dataLayer) {
    // dataLayerが存在しない場合はコンソールに出力するだけ
    console.log(`📊 Analytics Event (Not Sent): ${eventName}`, eventParams);
    return;
  }
  
  // dataLayerにイベントを送信
  window.dataLayer.push({
    event: eventName,
    ...eventParams
  });
  
  console.log(`📊 Analytics Event: ${eventName}`, eventParams);
};

/**
 * 診断開始イベントを記録
 * @param {string} source - 開始元（'welcome', 'result'など）
 */
export const trackQuizStart = (source) => {
  trackEvent('quiz_start', { source });
};

/**
 * 職種選択イベントを記録
 * @param {string} profession - 選択された職種
 */
export const trackProfessionSelect = (profession) => {
  trackEvent('profession_select', { profession });
};

/**
 * 質問回答イベントを記録
 * @param {number} questionIndex - 質問のインデックス
 * @param {number} questionId - 質問ID
 * @param {number} answerValue - 回答値
 */
export const trackQuestionAnswer = (questionIndex, questionId, answerValue) => {
  trackEvent('question_answer', {
    question_index: questionIndex,
    question_id: questionId,
    answer_value: answerValue
  });
};

/**
 * 診断完了イベントを記録
 * @param {string} resultType - 診断結果タイプ
 * @param {number} timeSpent - 回答にかかった時間（秒）
 */
export const trackQuizComplete = (resultType, timeSpent) => {
  trackEvent('quiz_complete', {
    result_type: resultType,
    time_spent: timeSpent
  });
};

/**
 * 連絡フォーム開始イベントを記録
 * @param {string} resultType - 診断結果タイプ
 * @param {string} profession - 職種
 */
export const trackContactStart = (resultType, profession) => {
  trackEvent('contact_start', {
    result_type: resultType,
    profession
  });
};

/**
 * 連絡フォーム送信イベントを記録（コンバージョン）
 * @param {string} resultType - 診断結果タイプ
 * @param {string} profession - 職種
 * @param {string} contactMethod - 連絡方法
 */
export const trackContactSubmit = (resultType, profession, contactMethod) => {
  trackEvent('contact_submit', {
    result_type: resultType,
    profession,
    contact_method: contactMethod
  });
};

/**
 * 共有イベントを記録
 * @param {string} resultType - 診断結果タイプ
 * @param {string} shareMethod - 共有方法（'twitter', 'line', 'facebook', 'copy'）
 */
export const trackShare = (resultType, shareMethod) => {
  trackEvent('result_share', {
    result_type: resultType,
    share_method: shareMethod
  });
};

/**
 * 診断やり直しイベントを記録
 * @param {string} resultType - 診断結果タイプ
 */
export const trackRestart = (resultType) => {
  trackEvent('quiz_restart', {
    result_type: resultType
  });
};