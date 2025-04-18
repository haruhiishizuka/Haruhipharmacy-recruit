// utils/quizUtils.js

import {
  getResultDescription,
  getMedicalInstitutions,
  getDetailedContent
} from '../data/questions';

/**
 * 回答からタイプごとのスコアを集計し、最もスコアの高いタイプを返す
 * @param {Array} answers - ユーザーの選択データ
 * @returns {Object} - 診断結果
 */
export const calculateResult = (answers) => {
  // 各軸のスコアを初期化
  const axisScores = {
    specialist: 0,   // 専門的 vs 総合的
    innovative: 0,   // 革新的 vs 継続的
    human: 0,        // 人間中心 vs 技術中心
    analytical: 0    // 分析的 vs 実践的
  };
  
  // 回答データが配列でなかった場合は空配列として扱う
  const safeAnswers = Array.isArray(answers) ? answers : [];
  
  // 各回答のスコアを集計
  safeAnswers.forEach((answer, index) => {
    // 有効な数値回答かチェック (-3〜3の範囲を想定)
    if (typeof answer !== 'number' || isNaN(answer)) {
      console.warn(`質問 ${index + 1}: 無効な回答値 "${answer}"`);
      return; // この質問をスキップ
    }
    
    // App.jsから渡されるquestionは使用せず、回答インデックスに基づいて軸を決定
    // 回答インデックスモジュロ4で基本的な軸を循環させる
    let axis;
    switch (index % 4) {
      case 0: axis = 'specialist'; break;
      case 1: axis = 'innovative'; break;
      case 2: axis = 'human'; break;
      case 3: axis = 'analytical'; break;
    }
    
    // 特定の質問についてはオーバーライド（必要に応じて調整）
    // インデックスベースのハードコードされた例外
    if (index === 9 || index === 10) axis = 'specialist'; // 総合的/専門的に関する質問
    if (index === 7 || index === 8 || index === 13) axis = 'human'; // 人間関係に関する質問
    if (index === 2 || index === 14) axis = 'analytical'; // 分析に関する質問
    if (index === 6 || index === 15) axis = 'innovative'; // 革新性に関する質問
    
    // スコア加算（回答値を-1から1の範囲にスケール）
    const normalizedValue = answer / 3;
    axisScores[axis] += normalizedValue;
  });
  
  // 各軸のスコアを正規化（-1〜1の範囲に）
  Object.keys(axisScores).forEach(axis => {
    const rawScore = axisScores[axis];
    // 質問数で割って正規化（答えがすべて最大/最小でも-1〜1の範囲に収まるように）
    // 最大で4つの質問が各軸に影響する場合、4で割る
    axisScores[axis] = Math.max(-1, Math.min(1, rawScore / 4));
  });
  
  // タイプコードを生成（S/G, I/C, H/T, A/P）
  const typeCode = 
    (axisScores.specialist > 0 ? 'S' : 'G') + 
    (axisScores.innovative > 0 ? 'I' : 'C') + 
    (axisScores.human > 0 ? 'H' : 'T') + 
    (axisScores.analytical > 0 ? 'A' : 'P');
  
  // 従来の8タイプに基づくレガシータイプも計算（必要に応じて）
  let legacyType = '';
  if (axisScores.specialist > 0.2 && axisScores.innovative > 0.2) {
    legacyType = 'イノベーター型';
  } else if (axisScores.specialist > 0.2 && axisScores.human > 0.2) {
    legacyType = '専門家型';
  } else if (axisScores.specialist > 0.2 && axisScores.analytical > 0.2) {
    legacyType = 'コンサルタント型';
  } else if (axisScores.innovative > 0.2 && axisScores.human > 0.2) {
    legacyType = 'フロンティア型';
  } else if (axisScores.human > 0.2 && axisScores.analytical < -0.2) {
    legacyType = 'ケアスペシャリスト型';
  } else if (axisScores.innovative > 0.2 && axisScores.analytical > 0.2) {
    legacyType = '改革者型';
  } else if (axisScores.specialist < -0.2 && axisScores.innovative < -0.2) {
    legacyType = '独立志向型';
  } else {
    legacyType = 'リーダー型';
  }
  
  // 診断結果を返す
  return {
    typeCode,      // 新16タイプのコード (例: "SIHA")
    legacyType,    // 従来の8タイプの名称 (例: "専門家型")
    axisScores     // 4軸それぞれのスコア値
  };
};

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
      // nullやundefinedのチェック
      if (answer === null || answer === undefined) {
        return 0; // デフォルトは中立値
      }
      
      // 文字列形式の場合を数値に変換
      if (typeof answer === 'string') {
        // 文字列として "はい"/"いいえ" の場合
        if (answer === "strong_yes") return 3;  // 強く同意
        if (answer === "yes") return 2;  // 同意
        if (answer === "somewhat_yes") return 1;  // やや同意
        if (answer === "neutral") return 0;  // 中立
        if (answer === "somewhat_no") return -1;  // やや非同意
        if (answer === "no") return -2;  // 非同意
        if (answer === "strong_no") return -3;  // 強く非同意
        
        // 数値の文字列表現の場合は数値に変換
        const num = parseFloat(answer);
        if (!isNaN(num)) {
          return num;
        }
      }
      
      // 数値の場合はそのまま返す
      if (typeof answer === 'number') {
        return answer;
      }
      
      // オブジェクト形式の場合
      if (typeof answer === 'object' && answer !== null) {
        return answer.value || 0;
      }
      
      // それ以外は中立値を返す
      return 0;
    });
  } else {
    console.warn('有効な回答データがありません');
    return {
      typeCode: null,
      legacyType: null,
      axisScores: {
        specialist: 0,
        innovative: 0,
        human: 0,
        analytical: 0
      }
    };
  }
  
  console.log('処理された回答:', processedAnswers);
  
  try {
    // calculateResult関数を使用して診断タイプを判定
    const result = calculateResult(processedAnswers);
    console.log('診断結果:', result);
    return result;
  } catch (error) {
    console.error('診断結果の計算中にエラーが発生しました:', error);
    // エラー時は最低限の情報を持ったオブジェクトを返す
    return {
      typeCode: 'SIHP', // 他のタイプに変更
      legacyType: '専門家型', // 対応するレガシータイプに変更
      axisScores: {
        specialist: 0.3,  // デフォルト値を変更
        innovative: 0.3,  // デフォルト値を変更
        human: 0.3,      // デフォルト値を変更
        analytical: -0.3  // デフォルト値を変更
      }
    };
  }
};

/**
 * 診断タイプ名から、すべての診断結果データ（表示用）をまとめて返す
 * @param {Object} resultObj - 判定された診断タイプを含むオブジェクト
 * @returns {Object} - 表示用の診断結果オブジェクト
 */
export const normalizeResultData = (resultObj) => {
  if (!resultObj || !resultObj.typeCode) {
    console.warn('結果オブジェクトが不完全またはnullです');
    // SIHPのダミーデータを返す (デフォルト値を変更)
    return {
      type: 'SIHP',
      title: '実践志向専門家型',
      axisScores: {
        specialist: 0.3,   // 専門的(S)
        innovative: 0.3,   // 革新的(I)
        human: 0.3,        // 人間中心(H)
        analytical: -0.3   // 実践的(P)
      },
      description: '特定の医療分野での専門性を活かし、革新的なアプローチで患者さんのケアに直接関わることに喜びを感じるタイプです。理論より実践を重視し、新しい手法を臨床現場で積極的に活用します。',
      characteristics: [
        "専門分野での実践的なスキルが高い",
        "新しい技術や方法の臨床応用に積極的",
        "患者さんとの関わりを大切にする",
        "理論よりも実践から学ぶことを好む"
      ],
      strengths: [
        "専門的な技術の実践力",
        "新しいアプローチの臨床への導入能力",
        "患者さんの状態に合わせた柔軟な対応力",
        "実践を通じた知識の深化能力"
      ],
      idealEnvironment: "先進的な治療を提供している専門クリニックや、新技術導入に積極的な医療機関が理想的です。自分の専門性を活かしながら新しい方法を試せる環境で、患者さんと直接関わりながら働けることが重要です。",
      recommendedHospitals: [
        {
          name: "名古屋大学医学部附属病院",
          type: "特定機能病院",
          location: "愛知県名古屋市",
          matchPercentage: 94,
          reason: "高度専門医療の提供と新しい治療法の導入に積極的な環境です。"
        },
        {
          name: "藤田医科大学病院",
          type: "特定機能病院",
          location: "愛知県豊明市",
          matchPercentage: 88,
          reason: "専門医療の提供と革新的アプローチの導入が行われています。"
        }
      ],
      inspirationalQuote: {
        text: "理論は教えることができるが、技術は経験によって身につくものである。一流の技術者は、知識と実践の橋渡しをする。",
        author: "フローレンス・ナイチンゲール（現代的解釈）"
      }
    };
  }
  
  console.log('正規化する結果オブジェクト:', resultObj);
  
  try {
    // 16タイプの場合
    if (resultObj.typeCode) {
      // 詳細情報を取得
      let typeDetails;
      try {
        typeDetails = getDetailedContent(resultObj.typeCode);
      } catch (error) {
        console.warn(`タイプコード ${resultObj.typeCode} の詳細情報取得中にエラー:`, error);
        typeDetails = null;
      }
      
      if (!typeDetails) {
        console.warn(`タイプコード ${resultObj.typeCode} に対する詳細情報が見つかりません`);
      }
      
      // 推奨医療機関を取得
      let hospitals;
      try {
        hospitals = getMedicalInstitutions(resultObj.typeCode);
      } catch (error) {
        console.warn(`タイプコード ${resultObj.typeCode} の医療機関取得中にエラー:`, error);
        hospitals = [];
      }
      
      // すべての情報を結合
      const normalizedResult = {
        type: resultObj.typeCode,
        title: typeDetails?.title || resultObj.typeCode,
        legacyType: resultObj.legacyType,
        axisScores: resultObj.axisScores || {
          specialist: 0,
          innovative: 0,
          human: 0, 
          analytical: 0
        },
        description: typeDetails?.description || '結果の詳細説明が見つかりませんでした。',
        ...(typeDetails || {}),
        recommendedHospitals: hospitals || []
      };
      
      console.log('正規化された結果:', normalizedResult);
      return normalizedResult;
    }
    
    // 8タイプの場合 (従来の互換性確保)
    const type = resultObj.legacyType || 'GCTP'; // デフォルト値を設定
    
    console.log('8タイプ分類:', type);
    
    let description, institutions, detail;
    
    // エラーハンドリングを追加
    try {
      // 基本情報を取得
      description = getResultDescription(type) || {};              
    } catch (error) {
      console.warn(`タイプ ${type} の説明取得中にエラー:`, error);
      description = {};
    }
    
    try {
      // 推奨施設情報を取得
      institutions = getMedicalInstitutions(type) || [];
    } catch (error) {
      console.warn(`タイプ ${type} の医療機関取得中にエラー:`, error);
      institutions = [];
    }
    
    try {
      // 詳細コンテンツを取得
      detail = getDetailedContent(type) || {};
    } catch (error) {
      console.warn(`タイプ ${type} の詳細情報取得中にエラー:`, error);
      detail = {};
    }
  
    // すべての情報を結合して返す
    const normalizedResult = {
      type,
      title: description?.title || type,
      ...(description || {}),
      recommendedHospitals: institutions || [],
      ...(detail || {}),
      // 16タイプとの互換性のために軸スコアを設定
      axisScores: resultObj.axisScores || {
        specialist: type.includes('専門家') ? 0.7 : -0.7,
        innovative: type.includes('イノベーター') || type.includes('フロンティア') ? 0.7 : -0.7,
        human: type.includes('ケアスペシャリスト') ? 0.7 : -0.7,
        analytical: type.includes('分析') || type.includes('コンサルタント') ? 0.7 : -0.7
      }
    };
    
    console.log('正規化された結果(8タイプ):', normalizedResult);
    return normalizedResult;
  } catch (error) {
    // 全体的なエラーハンドリング
    console.error('結果の正規化中に重大なエラーが発生しました:', error);
    
    // エラー時は最低限の情報を持ったオブジェクトを返す
    return {
      type: 'GCTP',
      title: 'オペレーション管理型総合実践者',
      axisScores: {
        specialist: -0.7,
        innovative: -0.7,
        human: -0.7,
        analytical: -0.7
      },
      description: '幅広い医療知識と実践力を持ち、確立されたシステムや技術の効率的な運用に取り組むタイプです。安定性と実用性を重視し、日々の医療オペレーションの確実な実施と管理を通じて医療の質向上に貢献します。',
      characteristics: [
        "多様な医療現場での実践知識がある",
        "確立された手順とプロトコルを重視する",
        "実用的で効率的なワークフローを追求する", 
        "安定した運用と確実な実施を大切にする"
      ],
      recommendedHospitals: []
    };
  }
};