/**
 * 病院機能報告CSVからデータベースを構築するスクリプト
 * 
 * 使用方法:
 * 1. CSVファイルを同じディレクトリに配置
 * 2. このスクリプトをNode.jsで実行
 * 3. hospital-database.jsonが生成される
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse'); // npm install papaparse

// CSVのファイルパス
const csvFilePath = path.join(__dirname, 'データベース用集計用.csv');

// CSVファイルを読み込む
const csvData = fs.readFileSync(csvFilePath, 'utf8');

// 専門性スコア算出関数
function calculateSpecialistScore(hospital) {
  let score = 5; // デフォルト値
  
  // 診療科目数によるスコア調整（科目が少ないほど専門的とみなす）
  const departments = hospital.departments ? hospital.departments.length : 0;
  if (departments <= 3) score += 2;
  else if (departments <= 6) score += 1;
  else if (departments >= 10) score -= 2;
  
  // 特定機能（高度急性期など）の有無によるスコア調整
  if (hospital.functions && hospital.functions.highAcute) score += 1;
  
  // 専門的な処置の実施状況
  if (hospital.treatments && hospital.treatments.centralVenousInjection > 10) score += 1;
  if (hospital.treatments && hospital.treatments.artificialRespiration > 5) score += 1;
  
  // 病床規模が小さく特化している場合
  if (hospital.beds && hospital.beds.total < 100) score += 1;
  
  // スコアの範囲を0-10に制限
  return Math.min(Math.max(score, 0), 10);
}

// 革新性スコア算出関数
function calculateInnovativeScore(hospital) {
  let score = 5; // デフォルト値
  
  // 高度急性期機能
  if (hospital.functions && hospital.functions.highAcute) score += 2;
  
  // 先進的医療処置の実施状況
  if (hospital.treatments && hospital.treatments.centralVenousInjection > 20) score += 1;
  if (hospital.treatments && hospital.treatments.artificialRespiration > 10) score += 1;
  if (hospital.treatments && hospital.treatments.arterialPressureMeasurement > 5) score += 1;
  
  // 手術室スタッフ比率
  if (hospital.staff && hospital.staff.surgeryStaff > 10) score += 1;
  
  // 救急医療の状況
  if (hospital.emergency && hospital.emergency.ambulance > 50) score += 2;
  
  // スコアの範囲を0-10に制限
  return Math.min(Math.max(score, 0), 10);
}

// 人間志向スコア算出関数
function calculateHumanFocusedScore(hospital) {
  let score = 5; // デフォルト値
  
  // リハビリ職員の比率
  const hasPT = hospital.staff && hospital.staff.physicalTherapists && 
               (hospital.staff.physicalTherapists.fulltime > 0 || 
                hospital.staff.physicalTherapists.parttime > 0);
  const hasOT = hospital.staff && hospital.staff.occupationalTherapists && 
               (hospital.staff.occupationalTherapists.fulltime > 0 || 
                hospital.staff.occupationalTherapists.parttime > 0);
  const hasST = hospital.staff && hospital.staff.speechTherapists && 
               (hospital.staff.speechTherapists.fulltime > 0 || 
                hospital.staff.speechTherapists.parttime > 0);
  
  if (hasPT) score += 1;
  if (hasOT) score += 1;
  if (hasST) score += 1;
  
  // 回復期・慢性期機能
  if (hospital.functions && hospital.functions.recovery) score += 1;
  if (hospital.functions && hospital.functions.chronic) score += 1;
  
  // 看護師比率が高い
  if (hospital.staff && hospital.staff.nurses && 
      hospital.staff.total > 0 && 
      (hospital.staff.nurses.fulltime / hospital.staff.total) > 0.5) {
    score += 1;
  }
  
  // リハビリテーション料
  if (hospital.treatments && hospital.treatments.rehabilitation > 100) score += 1;
  
  // スコアの範囲を0-10に制限
  return Math.min(Math.max(score, 0), 10);
}

// 分析志向スコア算出関数
function calculateAnalyticalScore(hospital) {
  let score = 5; // デフォルト値
  
  // 医師比率
  if (hospital.staff && hospital.staff.doctors && 
      hospital.staff.total > 0 && 
      (hospital.staff.doctors.fulltime / hospital.staff.total) > 0.2) {
    score += 2;
  }
  
  // 高度急性期・急性期機能
  if (hospital.functions && hospital.functions.highAcute) score += 2;
  if (hospital.functions && hospital.functions.acute) score += 1;
  
  // 専門的な検査・処置
  if (hospital.treatments && hospital.treatments.centralVenousInjection > 0) score += 1;
  if (hospital.treatments && hospital.treatments.arterialPressureMeasurement > 0) score += 1;
  
  // スコアの範囲を0-10に制限
  return Math.min(Math.max(score, 0), 10);
}

// 16タイプへのマッピング
function mapToSixteenTypes(specialistScore, innovativeScore, humanFocusedScore, analyticalScore) {
  // 各軸のバイナリ判定（5を閾値とする）
  const isS = specialistScore > 5; // 専門性軸: S(高) or G(低)
  const isI = innovativeScore > 5; // 革新性軸: I(高) or C(低)
  const isH = humanFocusedScore > 5; // 人間志向軸: H(高) or T(低)
  const isA = analyticalScore > 5; // 分析志向軸: A(高) or P(低)
  
  // タイプコード生成
  const typeCode = `${isS ? 'S' : 'G'}${isI ? 'I' : 'C'}${isH ? 'H' : 'T'}${isA ? 'A' : 'P'}`;
  
  // タイプ名のマッピング
  const typeNames = {
    'SIHA': '研究型専門医療機関',
    'SIHP': '先端専門診療機関',
    'SITA': '精密医療研究機関',
    'SITP': '技術革新型医療機関',
    'SCHA': '学術専門医療機関',
    'SCHP': '伝統型専門診療機関',
    'SCTA': '分析特化型医療機関',
    'SCTP': '技術集約型医療機関',
    'GIHA': '総合研究病院',
    'GIHP': '革新型総合病院',
    'GITA': '先進総合医療センター',
    'GITP': '先進医療実践機関',
    'GCHA': '教育型総合病院',
    'GCHP': '地域基幹病院',
    'GCTA': '地域医療研究機関',
    'GCTP': '地域総合診療機関'
  };
  
  return {
    typeCode,
    typeName: typeNames[typeCode] || '総合医療機関',
    scores: {
      specialist: specialistScore,
      innovative: innovativeScore,
      humanFocused: humanFocusedScore,
      analytical: analyticalScore
    }
  };
}

// 適したキャリアタイプの取得
function getSuitableCareerTypes(hospitalTypeCode) {
  // 病院タイプと適したキャリアタイプのマッピング
  const suitabilityMap = {
    'SIHA': ['SIHA', 'SITA', 'GIHA'],
    'SIHP': ['SIHP', 'SITP', 'GIHP'],
    'SITA': ['SITA', 'SIHA', 'GITA'],
    'SITP': ['SITP', 'SIHP', 'GITP'],
    'SCHA': ['SCHA', 'SCTA', 'GCHA'],
    'SCHP': ['SCHP', 'SCTP', 'GCHP'],
    'SCTA': ['SCTA', 'SCHA', 'GCTA'],
    'SCTP': ['SCTP', 'SCHP', 'GCTP'],
    'GIHA': ['GIHA', 'GITA', 'SIHA'],
    'GIHP': ['GIHP', 'GITP', 'SIHP'],
    'GITA': ['GITA', 'GIHA', 'SITA'],
    'GITP': ['GITP', 'GIHP', 'SITP'],
    'GCHA': ['GCHA', 'GCTA', 'SCHA'],
    'GCHP': ['GCHP', 'GCTP', 'SCHP'],
    'GCTA': ['GCTA', 'GCHA', 'SCTA'],
    'GCTP': ['GCTP', 'GCHP', 'SCTP']
  };
  
  return suitabilityMap[hospitalTypeCode] || ['GCHP', 'GIHP', 'SCHP'];
}

// CSVをパースしてデータベースを構築
Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log(`CSVの解析完了: ${results.data.length}件の医療機関データを処理します`);
    
    const hospitals = results.data.map(row => {
      // CSVの列名と値をマッピング
      try {
        // 科目を配列に変換
        const departmentsStr = row['科目'] || '';
        const departments = departmentsStr.split(',').map(d => d.trim()).filter(d => d);
        
        // 病床数を解析
        const generalBeds = {
          permitted: parseInt(row['一般病床_許可病床数'] || 0, 10) || 0,
          active: parseInt(row['一般病床_稼働病床数'] || 0, 10) || 0
        };
        
        const recoveryBeds = {
          permitted: parseInt(row['療養病床_許可病床数'] || 0, 10) || 0,
          active: parseInt(row['療養病床_稼働病床数'] || 0, 10) || 0
        };
        
        // 職員数を解析
        const doctors = {
          fulltime: parseInt(row['医師_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['医師_非常勤'] || 0) || 0
        };
        
        const nurses = {
          fulltime: parseInt(row['看護師_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['看護師_非常勤'] || 0) || 0
        };
        
        const assistantNurses = {
          fulltime: parseInt(row['准看護師_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['准看護師_非常勤'] || 0) || 0
        };
        
        const careAssistants = {
          fulltime: parseInt(row['看護補助者_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['看護補助者_非常勤'] || 0) || 0
        };
        
        const physicalTherapists = {
          fulltime: parseInt(row['理学療法士_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['理学療法士_非常勤'] || 0) || 0
        };
        
        const occupationalTherapists = {
          fulltime: parseInt(row['作業療法士_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['作業療法士_非常勤'] || 0) || 0
        };
        
        const speechTherapists = {
          fulltime: parseInt(row['言語聴覚士_常勤'] || 0, 10) || 0,
          parttime: parseFloat(row['言語聴覚士_非常勤'] || 0) || 0
        };
        
        // 全身管理状況を解析
        const treatments = {
          centralVenousInjection: parseInt(row['中心静脈注射'] || 0, 10) || 0,
          respiratoryMonitoring: parseInt(row['呼吸心拍監視'] || 0, 10) || 0,
          oxygenInhalation: parseInt(row['酸素吸入'] || 0, 10) || 0,
          arterialPressureMeasurement: parseInt(row['観血的動脈圧測定（１時間を超えた場合）'] || 0, 10) || 0,
          drainage: parseInt(row['ドレーン法、胸腔若しくは腹腔洗浄'] || 0, 10) || 0,
          artificialRespiration: parseInt(row['人工呼吸（５時間を超えた場合）'] || 0, 10) || 0,
          artificialKidney: parseInt(row['人工腎臓、腹膜灌流'] || 0, 10) || 0,
          tubeFeedingCatheter: parseInt(row['経管栄養カテーテル交換法'] || 0, 10) || 0,
          rehabilitation: parseInt(row['疾患別リハビリテーション料'] || 0, 10) || 0,
          pressureUlcerEvaluation: parseInt(row['褥瘡評価実施加算（療養病棟入院基本料、有床診療所療養病床入院基本料）'] || 0, 10) || 0
        };
        
        // 救急医療の状況を解析
        const emergency = {
          holidayPatients: parseInt(row['休日に受診した患者延べ数'] || 0, 10) || 0,
          nightPatients: parseInt(row['夜間・時間外に受診した患者延べ数'] || 0, 10) || 0,
          ambulance: parseInt(row['救急車の受入件数'] || 0, 10) || 0,
          immediateAdmission: parseInt(row['うち、診察後直ちに入院となった患者延べ数'] || 0, 10) || 0
        };
        
        // 総人数を計算
        const totalStaff = parseInt(row['施設全体の職員数'] || 0, 10) || 0;
        const surgeryStaff = parseInt(row['手術室の職員数'] || 0, 10) || 0;
        const outpatientStaff = parseInt(row['外来部門の職員数'] || 0, 10) || 0;
        
        // 基本情報の構造化
        const hospital = {
          id: row['医療機関コード'],
          name: row['医療機関名'],
          type: row['病診区分'],
          prefecture: {
            code: row['都道府県コード'],
            name: row['住所'] ? row['住所'].split('道府県')[0] + '道府県' : null
          },
          postalCode: row['郵便番号'] ? row['郵便番号'].replace('〒', '') : null,
          address: row['住所'],
          region: {
            code: row['構想区域コード'],
            name: row['構想区域名']
          },
          municipality: {
            code: row['市町村コード'],
            name: row['市町村名称']
          },
          functions: {
            highAcute: row['高度急性期機能の有無'] === '〇',
            acute: row['急性期機能の有無'] === '〇',
            recovery: row['回復期機能の有無'] === '〇',
            chronic: row['慢性期機能の有無'] === '〇'
          },
          departments,
          beds: {
            general: generalBeds,
            recovery: recoveryBeds,
            total: generalBeds.permitted + recoveryBeds.permitted
          },
          staff: {
            doctors,
            nurses,
            assistantNurses,
            careAssistants,
            physicalTherapists,
            occupationalTherapists,
            speechTherapists,
            total: totalStaff,
            surgeryStaff,
            outpatientStaff
          },
          emergency,
          treatments,
          admissions: {
            newPatients: parseInt(row['新規入棟患者数(年間)'] || 0, 10) || 0,
          }
        };
        
        // 各種スコアを計算
        const specialistScore = calculateSpecialistScore(hospital);
        const innovativeScore = calculateInnovativeScore(hospital);
        const humanFocusedScore = calculateHumanFocusedScore(hospital);
        const analyticalScore = calculateAnalyticalScore(hospital);
        
        // 16タイプへマッピング
        const typeInfo = mapToSixteenTypes(
          specialistScore, 
          innovativeScore, 
          humanFocusedScore, 
          analyticalScore
        );
        
        // 最適なキャリアタイプを取得
        const suitableCareerTypes = getSuitableCareerTypes(typeInfo.typeCode);
        
        // 病院データに分類情報を追加
        return {
          ...hospital,
          classification: {
            ...typeInfo,
            suitableCareerTypes
          }
        };
      } catch (error) {
        console.error(`医療機関データの処理中にエラー: ${row['医療機関名']}`, error);
        return null;
      }
    }).filter(Boolean); // nullを除外
    
    console.log(`処理完了: ${hospitals.length}件の医療機関データをデータベース化しました`);
    
    // JSONファイルとして保存
    const outputPath = path.join(__dirname, 'hospital-database.json');
    fs.writeFileSync(outputPath, JSON.stringify(hospitals, null, 2), 'utf8');
    console.log(`データベースファイルを保存しました: ${outputPath}`);
    
    // 統計情報の生成
    const typeStats = {};
    hospitals.forEach(hospital => {
      const type = hospital.classification.typeCode;
      if (!typeStats[type]) {
        typeStats[type] = {
          count: 0,
          typeName: hospital.classification.typeName
        };
      }
      typeStats[type].count++;
    });
    
    console.log('医療機関タイプの分布:');
    Object.entries(typeStats).forEach(([type, stats]) => {
      console.log(`${type} (${stats.typeName}): ${stats.count}件 (${(stats.count / hospitals.length * 100).toFixed(1)}%)`);
    });
  },
  error: function(error) {
    console.error('CSVの解析中にエラーが発生しました:', error);
  }
});

// この処理結果をコマンドラインに出力する簡易的なユーティリティ関数
function summarizeHospitalType(hospital) {
  return `
${hospital.name} (${hospital.prefecture.name}${hospital.municipality.name})
分類: ${hospital.classification.typeName} (${hospital.classification.typeCode})
機能: ${Object.entries(hospital.functions)
  .filter(([_, v]) => v)
  .map(([k, _]) => k === 'highAcute' ? '高度急性期' : 
                  k === 'acute' ? '急性期' : 
                  k === 'recovery' ? '回復期' : '慢性期')
  .join(', ')}
診療科: ${hospital.departments.join(', ')}
病床数: 一般${hospital.beds.general.active}床, 療養${hospital.beds.recovery.active}床
スコア: 専門性=${hospital.classification.scores.specialist.toFixed(1)}, 
      革新性=${hospital.classification.scores.innovative.toFixed(1)}, 
      人間志向=${hospital.classification.scores.humanFocused.toFixed(1)}, 
      分析志向=${hospital.classification.scores.analytical.toFixed(1)}
適合キャリアタイプ: ${hospital.classification.suitableCareerTypes.join(', ')}
`;
}