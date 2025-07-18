// 新診断ロジック - ホランドRIASEC + 行動スタイル対応

import { newTypeDescriptions } from '../data/newTypeDescriptions.js';
import { mainQuestions, stressTypeDescriptions } from '../data/newQuestions.js';

// RIASECスコア計算
export const calculateRIASECScores = (answers) => {
  const riasecScores = {
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0
  };

  // メイン質問からRIASECスコアを計算（RIASEC質問のみ）
  mainQuestions.forEach(question => {
    if (question.riasec !== 'Behavior' && question.riasec !== 'Stress' && answers[question.id] !== undefined) {
      const answerValue = parseInt(answers[question.id]);
      // 7段階評価（-3から+3）を直接使用
      const normalizedScore = answerValue * question.weight;
      riasecScores[question.riasec] += normalizedScore;
    }
  });

  return riasecScores;
};

// 行動スタイルスコア計算
export const calculateBehaviorScores = (answers) => {
  const behaviorScores = {
    Supporting: 0,
    Controlling: 0,
    Conserving: 0,
    Adapting: 0
  };

  // 行動スタイル質問からスコアを計算
  mainQuestions.forEach(question => {
    if (question.riasec === 'Behavior' && answers[question.id] !== undefined) {
      const selectedOption = question.options.find(opt => opt.behavior === answers[question.id]);
      if (selectedOption) {
        behaviorScores[selectedOption.behavior] += selectedOption.points * question.weight;
      }
    }
  });

  return behaviorScores;
};

// ストレス時のパターン分析
export const analyzeStressPattern = (stressAnswers) => {
  const stressScores = {
    perfectionism_excess: 0,
    control_excess: 0,
    support_excess: 0,
    flexibility_excess: 0
  };

  // ストレス質問からパターンを分析
  const stressQuestions = mainQuestions.filter(q => q.riasec === 'Stress');
  stressQuestions.forEach(question => {
    if (stressAnswers[question.id] !== undefined) {
      const selectedOption = question.options.find(opt => opt.stressType === stressAnswers[question.id]);
      if (selectedOption) {
        stressScores[selectedOption.stressType] += selectedOption.points;
      }
    }
  });

  // 最も強いストレスパターンを特定
  const dominantStressType = Object.keys(stressScores).reduce((a, b) => 
    stressScores[a] > stressScores[b] ? a : b
  );

  return {
    scores: stressScores,
    dominantType: dominantStressType,
    description: stressTypeDescriptions[dominantStressType]
  };
};

// 最終タイプ決定
export const determinePersonalityType = (riasecScores, behaviorScores) => {
  // 最も高いRIASECタイプを特定
  const dominantRIASEC = Object.keys(riasecScores).reduce((a, b) => 
    riasecScores[a] > riasecScores[b] ? a : b
  );

  // 最も高い行動スタイルを特定  
  const dominantBehavior = Object.keys(behaviorScores).reduce((a, b) =>
    behaviorScores[a] > behaviorScores[b] ? a : b
  );

  // RIASEC + 行動スタイルの組み合わせからタイプを決定
  const typeMapping = {
    // Realistic系
    'Realistic_Conserving': 'tech_craftsman',
    'Realistic_Controlling': 'project_leader', 
    'Realistic_Supporting': 'multi_player',
    'Realistic_Adapting': 'pinch_hitter',
    
    // Investigative系
    'Investigative_Conserving': 'research_master',
    'Investigative_Controlling': 'data_analyst',
    'Investigative_Supporting': 'research_master', // 代替
    'Investigative_Adapting': 'research_master', // 代替
    
    // Artistic系
    'Artistic_Conserving': 'idea_generator', // 代替
    'Artistic_Controlling': 'idea_generator', // 代替
    'Artistic_Supporting': 'idea_generator',
    'Artistic_Adapting': 'multi_player',
    
    // Social系
    'Social_Conserving': 'empathy_listener',
    'Social_Controlling': 'team_coordinator',
    'Social_Supporting': 'team_supporter',
    'Social_Adapting': 'coordinator',
    
    // Enterprising系
    'Enterprising_Conserving': 'org_manager',
    'Enterprising_Controlling': 'field_commander',
    'Enterprising_Supporting': 'change_agent', // 代替
    'Enterprising_Adapting': 'change_agent',
    
    // Conventional系
    'Conventional_Conserving': 'safety_guardian',
    'Conventional_Controlling': 'data_analyst', // 代替
    'Conventional_Supporting': 'safety_guardian', // 代替
    'Conventional_Adapting': 'coordinator' // 代替
  };

  const combinationKey = `${dominantRIASEC}_${dominantBehavior}`;
  const personalityType = typeMapping[combinationKey] || 'team_supporter'; // デフォルト

  return {
    type: personalityType,
    riasec: dominantRIASEC,
    behavior: dominantBehavior,
    typeData: newTypeDescriptions[personalityType]
  };
};

// 総合診断結果計算
export const calculateCompleteResult = (answers, stressAnswers, profession = 'other') => {
  console.log('診断計算開始:', { answers, stressAnswers, profession });
  
  // RIASECスコア計算
  const riasecScores = calculateRIASECScores(answers);
  console.log('RIASECスコア:', riasecScores);
  
  // 行動スタイルスコア計算
  const behaviorScores = calculateBehaviorScores(answers);
  console.log('行動スタイルスコア:', behaviorScores);
  
  // ストレスパターン分析
  const stressPattern = analyzeStressPattern(stressAnswers);
  console.log('ストレスパターン:', stressPattern);
  
  // 最終タイプ決定
  const personalityResult = determinePersonalityType(riasecScores, behaviorScores);
  console.log('決定されたタイプ:', personalityResult);

  // チャート用データ生成
  const chartData = generateChartData(riasecScores, behaviorScores);
  console.log('チャートデータ:', chartData);

  const finalResult = {
    personalityType: personalityResult,
    riasecScores,
    behaviorScores,
    stressPattern,
    chartData,
    profession,
    timestamp: new Date().toISOString()
  };
  
  console.log('最終結果:', finalResult);
  return finalResult;
};

// チャート表示用データ生成（偏差値ベース）
export const generateChartData = (riasecScores, behaviorScores) => {
  // RIASECスコアを偏差値に変換
  const riasecValues = Object.values(riasecScores);
  const riasecMean = riasecValues.reduce((sum, val) => sum + val, 0) / riasecValues.length;
  const riasecStdDev = Math.sqrt(riasecValues.reduce((sum, val) => sum + Math.pow(val - riasecMean, 2), 0) / riasecValues.length) || 1;

  const deviationRIASEC = Object.keys(riasecScores).map(key => {
    const deviation = Math.round(50 + ((riasecScores[key] - riasecMean) / riasecStdDev) * 10);
    return {
      label: key,
      value: Math.max(20, Math.min(80, deviation)), // 20-80の範囲に制限
      rawScore: riasecScores[key],
      deviation: deviation
    };
  });

  // 行動スタイルスコアを偏差値に変換
  const behaviorValues = Object.values(behaviorScores);
  const behaviorMean = behaviorValues.reduce((sum, val) => sum + val, 0) / behaviorValues.length;
  const behaviorStdDev = Math.sqrt(behaviorValues.reduce((sum, val) => sum + Math.pow(val - behaviorMean, 2), 0) / behaviorValues.length) || 1;

  const deviationBehavior = Object.keys(behaviorScores).map(key => {
    const deviation = Math.round(50 + ((behaviorScores[key] - behaviorMean) / behaviorStdDev) * 10);
    return {
      label: key,
      value: Math.max(20, Math.min(80, deviation)), // 20-80の範囲に制限
      rawScore: behaviorScores[key],
      deviation: deviation
    };
  });

  return {
    riasec: deviationRIASEC,
    behavior: deviationBehavior,
    combined: [
      ...deviationRIASEC.map(item => ({ ...item, category: 'RIASEC' })),
      ...deviationBehavior.map(item => ({ ...item, category: 'Behavior' }))
    ]
  };
};

// タイプチャート画像生成用データ
export const generateChartImageData = (chartData, personalityType) => {
  return {
    type: 'radar',
    data: {
      labels: chartData.riasec.map(item => item.label),
      datasets: [
        {
          label: 'あなたのプロフィール',
          data: chartData.riasec.map(item => item.value),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${personalityType.typeData.label} - あなたの特性チャート`
        },
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      }
    }
  };
};

// 結果の妥当性チェック
export const validateResult = (result) => {
  const checks = {
    hasPersonalityType: !!result.personalityType,
    hasRIASECScores: Object.keys(result.riasecScores).length === 6,
    hasBehaviorScores: Object.keys(result.behaviorScores).length === 4,
    hasStressPattern: !!result.stressPattern,
    hasChartData: !!result.chartData
  };

  const isValid = Object.values(checks).every(check => check);
  
  return {
    isValid,
    checks,
    errors: isValid ? [] : Object.keys(checks).filter(key => !checks[key])
  };
};