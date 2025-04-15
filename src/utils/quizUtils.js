// utils/quizUtils.js

import {
  calculateResult,
  getResultDescription,
  getMedicalInstitutions,
  getDetailedContent
} from '../data/questions';

/**
 * 回答からタイプごとのスコアを集計し、最もスコアの高いタイプを返す
 * @param {Array} answers - ユーザーの選択データ
 * @returns {Object} - 診断結果
 */
export const processQuizResults = (answers) => {
  console.log('回答データを処理します:', answers);
  
  // 回答形式をチェックして適切に変換
  let processedAnswers;
  
  if (Array.isArray(answers) && answers.length > 0) {
    // 回答形式を適切に処理
    processedAnswers = answers.map(answer => {
      // オブジェクト形式の場合
      if (typeof answer === 'object' && answer !== null) {
        return answer.selectedOption || 0;
      }
      
      // 文字列として "はい"/"いいえ" の場合
      if (answer === "はい") return 3;  // 強く同意
      if (answer === "どちらかといえばはい") return 1;  // やや同意
      if (answer === "どちらでもない") return 0;  // 中立
      if (answer === "どちらかといえばいいえ") return -1;  // やや非同意
      if (answer === "いいえ") return -3;  // 強く非同意
      
      // 数値の場合はそのまま返す
      if (typeof answer === 'number') {
        return answer;
      }
      
      // それ以外は中立値を返す
      return 0;
    });
  } else {
    console.warn('有効な回答データがありません');
    // バラエティのあるダミーデータを生成
    processedAnswers = [3, 1, -2, 2, -1, 3, 0, -3, 1, 2, -1, 0, 2, -2, 1];
  }
  
  console.log('処理された回答:', processedAnswers);
  
  // questions.jsのcalculateResult関数を使用して診断タイプを判定
  const result = calculateResult(processedAnswers);
  
  console.log('診断結果:', result);
  
  return result;
};

/**
 * 診断タイプ名から、すべての診断結果データ（表示用）をまとめて返す
 * @param {Object} resultObj - 判定された診断タイプを含むオブジェクト
 * @returns {Object} - 表示用の診断結果オブジェクト
 */
export const normalizeResultData = (resultObj) => {
  if (!resultObj) {
    console.warn('結果オブジェクトがnullまたはundefinedです');
    // GCTPのダミーデータを返す
    return {
      type: 'GCTP',
      title: 'オペレーション管理型総合実践者',
      axisScores: {
        specialist: -0.7,   // 総合的(G)
        innovative: -0.7,   // 継続的(C)
        human: -0.7,        // 技術中心(T)
        analytical: -0.7    // 実践的(P)
      },
      description: '幅広い医療知識と実践力を持ち、確立されたシステムや技術の効率的な運用に取り組むタイプです。安定性と実用性を重視し、日々の医療オペレーションの確実な実施と管理を通じて医療の質向上に貢献します。',
      // 他の必要なデータも含める
    };
  }
  
  console.log('正規化する結果オブジェクト:', resultObj);
  
  // 16タイプの場合
  if (resultObj.typeCode) {
    // 詳細情報を取得
    const typeDetails = getDetailedContent(resultObj.typeCode);
    
    if (!typeDetails) {
      console.warn(`タイプコード ${resultObj.typeCode} に対する詳細情報が見つかりません`);
    }
    
    // 推奨医療機関を取得
    const hospitals = getMedicalInstitutions(resultObj.typeCode);
    
    // すべての情報を結合
    const normalizedResult = {
      type: resultObj.typeCode,
      legacyType: resultObj.legacyType,
      axisScores: resultObj.axisScores,
      ...typeDetails,
      recommendedHospitals: hospitals
    };
    
    console.log('正規化された結果:', normalizedResult);
    return normalizedResult;
  }
  
  // 8タイプの場合 (従来の互換性確保)
  const type = resultObj.legacyType || 'GCTP'; // デフォルト値を設定
  
  console.log('8タイプ分類:', type);
  
  // 基本情報を取得
  const description = getResultDescription(type);              
  // 推奨施設情報を取得
  const institutions = getMedicalInstitutions(type);           
  // 詳細コンテンツを取得
  const detail = getDetailedContent(type);                     

  // すべての情報を結合して返す
  const normalizedResult = {
    type,
    ...description,
    recommendedHospitals: institutions,
    ...detail,
    // 16タイプとの互換性のために軸スコアを設定
    axisScores: {
      specialist: type.includes('専門家') ? 0.7 : -0.7,
      innovative: type.includes('イノベーター') || type.includes('フロンティア') ? 0.7 : -0.7,
      human: type.includes('ケアスペシャリスト') ? 0.7 : -0.7,
      analytical: type.includes('分析') || type.includes('コンサルタント') ? 0.7 : -0.7
    }
  };
  
  console.log('正規化された結果(8タイプ):', normalizedResult);
  return normalizedResult;
};