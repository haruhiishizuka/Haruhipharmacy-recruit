import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypeChart from '../charts/TypeChart';
import GlobalNavigation from '../common/GlobalNavigation';

// ヘルパー関数
const getRIASECDescription = (riasec) => {
  const descriptions = {
    Realistic: "物や道具を扱い、技術的な作業を好む",
    Investigative: "研究・分析・探究を重視する",
    Artistic: "創造性・独創性を大切にする",
    Social: "人との関わり・支援を重視する",
    Enterprising: "リーダーシップ・成果達成を好む",
    Conventional: "秩序・ルール・正確性を重視する"
  };
  return descriptions[riasec] || "";
};

const getBehaviorDescription = (behavior) => {
  const descriptions = {
    Supporting: "他者をサポートし、協調を重視",
    Controlling: "リーダーシップを発揮し、主導権を握る",
    Conserving: "安定性と継続性を重視",
    Adapting: "柔軟性と変化への対応を得意とする"
  };
  return descriptions[behavior] || "";
};

const getJapaneseRiasecLabel = (englishLabel) => {
  const labelMap = {
    'Realistic': '現実的・技術的な面',
    'Investigative': '研究・分析的な面', 
    'Artistic': '創造・表現的な面',
    'Social': '対人・支援的な面',
    'Enterprising': 'リーダーシップの面',
    'Conventional': '組織・規則性の面'
  };
  return labelMap[englishLabel] || englishLabel;
};

const getJapaneseBehaviorLabel = (englishLabel) => {
  const labelMap = {
    'Supporting': 'サポート志向',
    'Controlling': 'リーダーシップ志向',
    'Conserving': '安定・継続志向',
    'Adapting': '柔軟・適応志向'
  };
  return labelMap[englishLabel] || englishLabel;
};

const getStrengthDescription = (typeId) => {
  const strengths = {
    research_master: "深い専門知識と分析力",
    tech_craftsman: "確実な技術力と職人気質",
    safety_guardian: "安全管理と品質向上への献身",
    data_analyst: "データ分析と改善提案能力",
    team_supporter: "チーム全体への配慮とサポート",
    empathy_listener: "共感力と傾聴スキル",
    team_coordinator: "調整力とバランス感覚",
    mentor_master: "人材育成と指導力",
    field_commander: "緊急時の判断力とリーダーシップ",
    change_agent: "革新的思考と変革推進力",
    org_manager: "組織運営と戦略的思考",
    project_leader: "目標達成力と推進力",
    multi_player: "多様な場面への適応力",
    pinch_hitter: "緊急時の対応力と機動力",
    idea_generator: "創造性とアイデア創出力",
    coordinator: "異なる立場の人々をつなぐ調整力"
  };
  return strengths[typeId] || "専門性と人間性のバランス";
};

const getTeamContribution = (typeId) => {
  const contributions = {
    research_master: "エビデンスに基づいた専門的な視点",
    tech_craftsman: "確実で質の高い技術提供",
    safety_guardian: "安全性と品質保証の要",
    data_analyst: "客観的な分析と改善提案",
    team_supporter: "チーム全体の結束力向上",
    empathy_listener: "患者さんや同僚の心のケア",
    team_coordinator: "意見の調整と合意形成",
    mentor_master: "次世代育成と知識継承",
    field_commander: "緊急時の指揮統制",
    change_agent: "組織の革新と改善推進",
    org_manager: "効率的な組織運営",
    project_leader: "目標達成に向けた推進力",
    multi_player: "様々な役割への柔軟な対応",
    pinch_hitter: "困難な状況での問題解決",
    idea_generator: "創造的な解決策の提案",
    coordinator: "多職種連携の促進"
  };
  return contributions[typeId] || "バランスの取れた総合力";
};

const getStressImpactDescription = (typeId, stressSymptom) => {
  const impactDescriptions = {
    research_master: {
      "完璧な答えを求めすぎて、決断が遅れがち": "研究や分析を重視するあまり、より多くのデータを求め続け、タイムリーな判断ができなくなる可能性があります",
      "細かい部分にこだわりすぎて、全体が見えなくなる": "詳細な分析に集中しすぎて、患者さんの全体的な状態や緊急性を見失ってしまう可能性があります"
    },
    tech_craftsman: {
      "自分のやり方にこだわりすぎて、他の方法を受け入れにくくなる": "技術の正確性を追求するあまり、新しい手法や他者のアプローチを拒否してしまう可能性があります",
      "技術的な完璧さを求めすぎて、時間がかかりすぎる": "手技の完成度にこだわりすぎて、効率性や患者さんの待ち時間を考慮できなくなる可能性があります"
    },
    safety_guardian: {
      "確認作業を何度も繰り返してしまう": "安全確保を重視するあまり、同じチェックを繰り返し、業務の流れを滞らせてしまう可能性があります",
      "規則を厳しく適用しすぎて、周りが窮屈に感じる": "ルールの遵守にこだわりすぎて、柔軟な対応ができず、チームの動きを制限してしまう可能性があります"
    },
    team_coordinator: {
      "全員を満足させようとして、決断が遅れる": "バランスを重視するあまり、様々な意見に振り回され、タイムリーな意思決定ができなくなる可能性があります",
      "コンフリクトを避けすぎて、重要な議論を先送りする": "調和を保とうとするあまり、必要な議論や対立を避け、根本的な問題解決が遅れる可能性があります"
    },
    team_supporter: {
      "自分のことを後回しにしすぎて、疲弊してしまう": "他者への配慮を優先するあまり、自己ケアを忘れ、長期的にはチーム全体に悪影響を与える可能性があります",
      "断ることができず、業務量が過多になる": "サポート精神が強すぎて、キャパシティを超えた業務を引き受け、質の低下を招く可能性があります"
    },
    field_commander: {
      "全てをコントロールしようとして、他者の自主性を奪う": "リーダーシップを発揮しすぎて、チームメンバーの成長機会を奪い、依存的な組織になる可能性があります",
      "完璧を求めすぎて、チームにプレッシャーを与える": "高い基準を押し付けすぎて、チームの士気を下げ、ミスを隠す文化を作ってしまう可能性があります"
    }
  };
  
  // 該当するタイプと症状の組み合わせを探す
  if (impactDescriptions[typeId] && impactDescriptions[typeId][stressSymptom]) {
    return impactDescriptions[typeId][stressSymptom];
  }
  
  // デフォルトの説明
  return "本来の強みが過度に発揮されることで、バランスを失い、効果的でなくなる可能性があります";
};

const getCareerPhilosophy = (typeId) => {
  const philosophies = {
    research_master: "真理の探究者として、あなたは医学の未知なる領域に光を当てる使命を持っています。知識への飽くなき探求心は、患者さんの未来を変える力となるでしょう。",
    tech_craftsman: "技術の求道者として、あなたの手は命を支える確かな技となります。一つひとつの手技に込められた精神性が、医療の質を高めていきます。",
    safety_guardian: "安全の守護者として、あなたは見えない危険から人々を守る聖なる役割を担っています。細部への配慮が、大きな安心を生み出します。",
    data_analyst: "データの語り部として、あなたは数字の向こうにある真実を読み解きます。客観性と洞察力が、医療の未来を切り開く羅針盤となります。",
    team_supporter: "調和の創造者として、あなたはチームの心を一つにする力を持っています。他者への深い配慮が、癒しの空間を生み出します。",
    empathy_listener: "共感の体現者として、あなたは言葉にならない想いを受け止める器となります。心の架け橋となることで、真の医療が実現されます。",
    team_coordinator: "均衡の設計者として、あなたは多様性の中に調和を見出します。異なる価値観を統合する力が、チーム医療の可能性を最大化します。",
    mentor_master: "叡智の継承者として、あなたは次世代に医療の本質を伝える使命があります。教えることで学び、共に成長する喜びを知っています。",
    field_commander: "実践の指揮者として、あなたは混沌の中に秩序をもたらします。決断力と行動力が、危機的状況を救いへと導きます。",
    change_agent: "革新の先導者として、あなたは既存の枠組みを超えて新たな地平を開きます。変化を恐れない勇気が、医療の進化を加速させます。",
    org_manager: "組織の建築家として、あなたはシステムと人間性の調和を設計します。全体最適の視点が、持続可能な医療体制を構築します。",
    project_leader: "目標の実現者として、あなたはビジョンを現実に変える力を持っています。計画と実行の統合が、不可能を可能にします。",
    multi_player: "万能の実践者として、あなたは状況に応じて多彩な役割を演じます。柔軟性という強みが、予測不能な医療現場で輝きます。",
    pinch_hitter: "危機の救済者として、あなたは最も必要とされる時に現れます。即応性と適応力が、緊急時の希望の光となります。",
    idea_generator: "創造の泉として、あなたは既成概念を超えた発想を生み出します。イノベーションへの情熱が、医療に新たな可能性をもたらします。",
    coordinator: "架橋の構築者として、あなたは分断された世界をつなぎます。境界を越える力が、真の連携医療を実現させます。"
  };
  return philosophies[typeId] || "あなたには、医療現場で発揮される独自の価値があります。その本質を理解し、育むことがキャリア開発の第一歩です。";
};

const getGrowthPotential = (typeId) => {
  const potentials = {
    research_master: "あなたの分析力は、更に深い洞察力へと進化し、医学の新たなパラダイムを切り開く可能性を秘めています。",
    tech_craftsman: "あなたの技術は、更なる精緻化を経て、次世代の医療技術の礎となる可能性を秘めています。",
    safety_guardian: "あなたの慎重さは、組織全体の安全文化を醸成し、医療事故ゼロの理想へと導く可能性を秘めています。",
    data_analyst: "あなたの分析眼は、ビッグデータ時代の医療を牽引し、予測医療の実現に貢献する可能性を秘めています。",
    team_supporter: "あなたの支援力は、チーム全体のレジリエンスを高め、持続可能な医療体制を構築する可能性を秘めています。",
    empathy_listener: "あなたの傾聴力は、患者中心医療の真髄を体現し、医療の人間性を回復させる可能性を秘めています。",
    team_coordinator: "あなたの調整力は、多職種連携の新たなモデルを創造し、統合医療を実現する可能性を秘めています。",
    mentor_master: "あなたの育成力は、医療人材の質的向上を促し、組織の持続的発展を支える可能性を秘めています。",
    field_commander: "あなたのリーダーシップは、危機管理体制の強化を通じて、地域医療の要となる可能性を秘めています。",
    change_agent: "あなたの革新力は、医療のデジタルトランスフォーメーションを推進し、新時代を切り開く可能性を秘めています。",
    org_manager: "あなたの経営力は、医療の質と効率の両立を実現し、理想的な組織モデルを構築する可能性を秘めています。",
    project_leader: "あなたの推進力は、困難なプロジェクトを成功に導き、組織変革の起点となる可能性を秘めています。",
    multi_player: "あなたの多様性は、専門分化した医療を統合し、全人的医療を実現する可能性を秘めています。",
    pinch_hitter: "あなたの機動力は、医療の緊急対応力を強化し、災害医療のエキスパートとなる可能性を秘めています。",
    idea_generator: "あなたの創造力は、医療サービスの革新を生み出し、患者体験を変革する可能性を秘めています。",
    coordinator: "あなたの連携力は、地域包括ケアの実現を推進し、シームレスな医療を構築する可能性を秘めています。"
  };
  return potentials[typeId] || "あなたには、まだ開花していない大きな可能性があります。";
};

const getCareerQuestions = (typeId) => {
  const questions = {
    research_master: [
      "あなたが追求したい医学の真理とは何ですか？",
      "知識を深めることで、どのような患者さんの未来を変えたいですか？",
      "10年後、どんな専門領域のエキスパートになっていたいですか？"
    ],
    tech_craftsman: [
      "あなたの技術で救いたい命の姿が見えていますか？",
      "極めたい技術の先に、どんな医療の理想がありますか？",
      "職人としての誇りを、次世代にどう伝えていきたいですか？"
    ],
    safety_guardian: [
      "守りたい安全とは、誰のための、どんな安全ですか？",
      "ルールの向こうにある、本当の価値は何だと思いますか？",
      "安全文化を根付かせるために、あなたができることは何ですか？"
    ],
    team_coordinator: [
      "異なる価値観を調和させる時、あなたが大切にしている軸は何ですか？",
      "理想的なチーム医療とは、どのような姿だと思いますか？",
      "調整役としての成長が、患者さんにどんな価値をもたらしますか？"
    ]
  };
  
  // デフォルトの質問
  const defaultQuestions = [
    "医療者として、あなたが実現したい理想の姿は何ですか？",
    "今の強みを活かして、どんな価値を創造していきたいですか？",
    "5年後、どんな医療professional(医療専門職)になっていたいですか？"
  ];
  
  return questions[typeId] || defaultQuestions;
};

const getCareerAdvice = (typeId) => {
  const advice = {
    research_master: [
      "学会発表や研究活動への積極的な参加",
      "専門資格の取得と知識の深化",
      "他分野の専門家との連携強化",
      "後進への知識継承活動"
    ],
    safety_guardian: [
      "医療安全管理者資格の取得",
      "他部署の安全対策見学と学習",
      "ヒヤリハット分析の専門性向上",
      "安全文化醸成のリーダーシップ発揮"
    ]
  };
  return advice[typeId] || [
    "自分の強みを活かせる分野での専門性向上",
    "多職種との連携スキル強化",
    "継続的な学習と成長",
    "後輩指導やメンタリング経験"
  ];
};

const getCompatibleTypes = (typeId) => {
  const compatibility = {
    safety_guardian: "「アイデア提案者」- あなたが安全性をチェックし、相手のアイデアを実現可能にする。「現場指揮官」- あなたが安定した基盤を作り、相手がスピーディに判断する。",
    research_master: "「チームサポーター」- あなたの専門知識と相手の人間力で患者さんに最適なケアを提供。「現場指揮官」- あなたの分析力と相手の実行力で効果的な医療を実現。"
  };
  return compatibility[typeId] || "多様なタイプとの連携により、それぞれの強みを活かしたチーム医療を実現できます。";
};

const NewResultDisplay = ({ result, onRetryQuiz, onConsultation, onReturnHome, onNavigateToPage }) => {
  if (!result || !result.personalityType) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>結果データの読み込み中...</p>
      </div>
    );
  }

  const { personalityType, stressPattern, chartData } = result;
  const typeData = personalityType.typeData;

  // メインヘッダー部分
  const ResultHeader = () => (
    <div className="card" style={{
      textAlign: 'center',
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)',
      '@media (max-width: 767px)': {
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }
    }}>
      <div style={{ 
        fontSize: '48px', 
        marginBottom: '10px',
        '@media (max-width: 767px)': {
          fontSize: '36px'
        }
      }}>
        {typeData.emoji}
      </div>
      
      <h1 className="heading_h2" style={{
        marginBottom: 'var(--spacing-md)',
        color: '#333333',
        '@media (max-width: 767px)': {
          fontSize: '20px'
        }
      }}>
        あなたのタイプ：「{typeData.label}」
      </h1>
      
      <p className="paragraph" style={{
        color: '#333333',
        fontWeight: '500',
        lineHeight: '1.6',
        whiteSpace: 'pre-line',
        marginBottom: 'var(--spacing-lg)'
      }}>
        {typeData.catchphrase}
      </p>

      <div className="card" style={{
        backgroundColor: '#f8f9fa',
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-medium)',
        border: '1px solid var(--neutral-200)',
        marginTop: 'var(--spacing-lg)',
        '@media (max-width: 767px)': {
          padding: 'var(--spacing-md)'
        }
      }}>
        <h3 className="heading_h4" style={{
          marginBottom: 'var(--spacing-md)',
          color: '#333333',
          '@media (max-width: 767px)': {
            fontSize: '16px'
          }
        }}>
          このタイプの歴史人物
        </h3>
        
        <p className="paragraph" style={{
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: 'var(--spacing-sm)'
        }}>
          {typeData.historicalFigure.name}
        </p>
        
        <blockquote style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#495057',
          borderLeft: '3px solid #333333',
          paddingLeft: 'var(--spacing-md)',
          margin: 'var(--spacing-md) 0',
          lineHeight: '1.6'
        }}>
          "{typeData.historicalFigure.quote}"
        </blockquote>
        
        <p className="paragraph_small" style={{
          color: '#6c757d',
          lineHeight: '1.5'
        }}>
          {typeData.historicalFigure.description}
        </p>
      </div>
    </div>
  );

  // 分析結果セクション（チャート + 数値）
  const AnalysisSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)',
      '@media (max-width: 767px)': {
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#333333',
        '@media (max-width: 767px)': {
          fontSize: '18px',
          marginBottom: 'var(--spacing-md)'
        }
      }}>
        科学的分析結果
      </h2>
      
      <TypeChart chartData={chartData} personalityType={personalityType} />
      
      <div className="card" style={{
        marginTop: 'var(--spacing-xl)',
        padding: 'var(--spacing-lg)',
        backgroundColor: '#f8f9fa',
        borderRadius: 'var(--radius-medium)',
        border: '1px solid var(--neutral-200)',
        '@media (max-width: 767px)': {
          marginTop: 'var(--spacing-lg)',
          padding: 'var(--spacing-md)'
        }
      }}>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333',
          '@media (max-width: 767px)': {
            fontSize: '16px'
          }
        }}>
          あなたの特性サマリー
        </h3>
        
        <div className="grid_2-col gap-medium" style={{
          '@media (max-width: 767px)': {
            gridTemplateColumns: '1fr',
            gap: 'var(--spacing-sm)'
          }
        }}>
          <div>
            <h4 className="paragraph" style={{ 
              fontWeight: 'bold', 
              color: '#333333', 
              marginBottom: 'var(--spacing-xs)' 
            }}>
              主要特性分類
            </h4>
            <p className="heading_h4" style={{ 
              color: '#333333',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {getRIASECDescription(personalityType.riasec)} 
            </p>
          </div>
          
          <div>
            <h4 className="paragraph" style={{ 
              fontWeight: 'bold', 
              color: '#333333', 
              marginBottom: 'var(--spacing-xs)' 
            }}>
              行動スタイル
            </h4>
            <p className="heading_h4" style={{ 
              color: '#333333',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {getBehaviorDescription(personalityType.behavior)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 統合パーソナリティセクション
  const UnifiedPersonalitySection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      border: '1px solid #e1e8f0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: 'var(--spacing-xl)',
      '@media (max-width: 767px)': {
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#333333',
        textAlign: 'center',
        '@media (max-width: 767px)': {
          fontSize: '18px',
          marginBottom: 'var(--spacing-md)'
        }
      }}>
        あなたの特性分析
      </h2>
    
      {/* 通常時の特徴 */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333',
          fontWeight: '600',
          '@media (max-width: 767px)': {
            fontSize: '16px'
          }
        }}>
          通常時のあなたの特徴
        </h3>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid var(--neutral-200)',
          marginBottom: 'var(--spacing-lg)',
          '@media (max-width: 767px)': {
            padding: 'var(--spacing-md)'
          }
        }}>
          <div style={{
            lineHeight: '1.8',
            fontSize: '16px',
            color: '#333333',
            '@media (max-width: 767px)': {
              fontSize: '14px'
            }
          }}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '15px'
              }}>
                コアストレングス
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                このタイプの方は{typeData.normalTraits[0]}という特性を持っており、
                医療現場では{getStrengthDescription(typeData.id)}として力を発揮します。
                {chartData && (() => {
                  const highTraits = chartData.riasec.filter(item => (item.deviation || item.value) >= 60);
                  const lowTraits = chartData.riasec.filter(item => (item.deviation || item.value) <= 40);
                  let description = '';
                  if (highTraits.length > 0) {
                    description += `特に${highTraits.map(t => getJapaneseRiasecLabel(t.label)).join('、')}の面で強い傾向を示しており、`;
                  }
                  if (lowTraits.length > 0) {
                    description += `${lowTraits.map(t => getJapaneseRiasecLabel(t.label)).join('、')}よりもバランス型のアプローチを好む傾向があります。`;
                  } else {
                    description += 'バランスの取れた特性を持っています。';
                  }
                  return description;
                })()}
                患者さんや同僚からの信頼を得やすく、医療チームにおいて重要な役割を担っています。
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '15px'
              }}>
                チームでの役割
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                チーム医療では{typeData.normalTraits[2]}存在として周囲から信頼され、
                {typeData.normalTraits[3]}という姿勢が職場の良い雰囲気作りに貢献しています。
                {chartData && (() => {
                  const behaviorStyle = chartData.behavior && chartData.behavior.find(item => (item.deviation || item.value) >= 55);
                  return behaviorStyle ? 
                    `${getJapaneseBehaviorLabel(behaviorStyle.label)}の行動スタイルを活かし、` : '';
                })()}
                こうした特性は、チーム全体のモチベーション向上につながっています。
              </p>
            </div>

            <div>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '15px'
              }}>
                患者さんへの影響
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                特に{typeData.normalTraits[4]}場面では、本来の能力が十分に発揮されます。
                専門性と人間性を兼ね備えたアプローチで、
                患者さんに安心感と信頼感を与え、治療への前向きな気持ちを促進しています。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ストレス時の注意ポイント */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333',
          fontWeight: '600'
        }}>
          ストレス時の注意ポイント
        </h3>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid var(--neutral-200)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{
            lineHeight: '1.8',
            fontSize: '16px',
            color: '#333333'
          }}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '15px'
              }}>
                ストレス時の特徴
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                ストレスが高い時には、{typeData.stressTraits.symptoms[0]}傾向が現れることがあります。
                この傾向は、平常時には「{typeData.normalTraits[0]}」として良く働きますが、
                ストレス下では過度に発揮されることで、
                {(() => {
                  // タイプに応じた具体的な説明を生成
                  const stressImpact = getStressImpactDescription(typeData.id, typeData.stressTraits.symptoms[0]);
                  return stressImpact;
                })()}
              </p>
            </div>

            <div>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '15px'
              }}>
                効果的な対処法
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                このような状況では、{typeData.stressTraits.coping[0]}ことが効果的です。
                普段の{typeData.normalTraits[1]}という強みを活かしながらも、
                適切なバランスを保つことで、持続可能で安全な医療提供が可能になります。
                自分自身のケアも重要な職務の一部として捉え、チーム全体で支え合うことが大切です。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* あなたに合う職場環境 */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333',
          fontWeight: '600'
        }}>
          適性のある職場環境
        </h3>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid var(--neutral-200)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{
            lineHeight: '1.7',
            fontSize: '14px',
            color: '#333333'
          }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-xs)',
                fontSize: '15px'
              }}>
                最適な環境
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.6', fontSize: '14px' }}>
                <strong style={{ color: '#333333' }}>{typeData.workplacePreferences.ideal.slice(0, 2).join('、')}</strong>で最大のパフォーマンスを発揮できます
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-xs)',
                fontSize: '15px'
              }}>
                成長可能な領域
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.6', fontSize: '14px' }}>
                {typeData.workplacePreferences.suitable.slice(0, 2).join('、')}でスキルを拡張し、新たな可能性を開くことができます
              </p>
            </div>

            <div>
              <h4 className="paragraph" style={{ 
                fontWeight: '700',
                color: '#333333',
                marginBottom: 'var(--spacing-xs)',
                fontSize: '15px'
              }}>
                慎重な検討が必要
              </h4>
              <p className="paragraph" style={{ lineHeight: '1.6', fontSize: '14px' }}>
                {typeData.workplacePreferences.challenging.slice(0, 1).join('')}は総合的な判断が重要で、十分な検討をおすすめします
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 成長とキャリア開発 */}
      <div>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333',
          fontWeight: '600'
        }}>
          成長とキャリア開発への視座
        </h3>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid var(--neutral-200)'
        }}>
          {/* キャリア哲学的序章 */}
          <div style={{
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-lg)',
            backgroundColor: 'var(--neutral-primary)',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid var(--neutral-200)'
          }}>
            <p className="paragraph" style={{ 
              lineHeight: '1.8', 
              fontSize: '15px',
              fontStyle: 'italic',
              textAlign: 'center',
              color: '#495057'
            }}>
              「人は自らの本質に従って努力し、存在し続けようとする」- スピノザ
            </p>
            <p className="paragraph" style={{ 
              lineHeight: '1.8', 
              fontSize: '14px',
              marginTop: 'var(--spacing-md)',
              textAlign: 'center'
            }}>
              あなたの{typeData.label}としての本質は、単なる職業的特性ではなく、
              医療という聖域で発揮される、かけがえのない存在価値そのものです。
            </p>
          </div>

          {/* キャリア開発の本質的理解 */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 className="paragraph" style={{ 
              fontWeight: '700',
              color: '#333333',
              marginBottom: 'var(--spacing-md)',
              fontSize: '16px'
            }}>
              あなたのコナトゥス（生きようとする力）を呼び覚ます
            </h4>
            <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px', marginBottom: 'var(--spacing-md)' }}>
              {getCareerPhilosophy(typeData.id)}
            </p>
            <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
              キャリアとは、単に経歴を積むことではありません。
              それは、あなたという存在が医療現場で開花し、
              患者さんと同僚、そして自分自身に対して、
              どのような意味と価値を創造していくかという壮大な物語なのです。
            </p>
          </div>

          {/* 現在地の確認 */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 className="paragraph" style={{ 
              fontWeight: '700',
              color: '#333333',
              marginBottom: 'var(--spacing-md)',
              fontSize: '16px'
            }}>
              今、ここにいるあなたの価値
            </h4>
            <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px' }}>
              あなたは既に、{getTeamContribution(typeData.id)}という形で、
              医療チームに欠かせない存在となっています。
              しかし、これは到達点ではなく、更なる成長への出発点です。
              {getGrowthPotential(typeData.id)}
            </p>
          </div>

          {/* 発展的統合 */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 className="paragraph" style={{ 
              fontWeight: '700',
              color: '#333333',
              marginBottom: 'var(--spacing-md)',
              fontSize: '16px'
            }}>
              統合と超越 - より高次の自己実現へ
            </h4>
            <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px', marginBottom: 'var(--spacing-md)' }}>
              エリクソンの発達理論が示すように、
              キャリアの成熟とは「統合性」の獲得です。
              あなたの{getRIASECDescription(personalityType.riasec)}という特性と、
              {getBehaviorDescription(personalityType.behavior)}という行動様式を統合し、
              より高次の専門性へと昇華させていく過程こそが、真のキャリア開発なのです。
            </p>
            <div style={{
              backgroundColor: '#e7f3ff',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid #bee5eb'
            }}>
              <h5 className="paragraph" style={{ 
                fontWeight: '600',
                color: '#0c5460',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '14px'
              }}>
                具体的な成長戦略
              </h5>
              <ul style={{ 
                fontSize: '14px', 
                lineHeight: '1.8',
                color: '#0c5460',
                marginLeft: 'var(--spacing-md)'
              }}>
                {getCareerAdvice(typeData.id).map((advice, index) => (
                  <li key={index} style={{ marginBottom: 'var(--spacing-xs)' }}>
                    {advice}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 問いかけ */}
          <div style={{ 
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-lg)',
            backgroundColor: '#f8f9fa',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid #e9ecef'
          }}>
            <h4 className="paragraph" style={{ 
              fontWeight: '700',
              color: '#333333',
              marginBottom: 'var(--spacing-md)',
              fontSize: '16px',
              textAlign: 'center'
            }}>
              内なる声に耳を傾ける
            </h4>
            <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#333333' }}>
              {getCareerQuestions(typeData.id).map((question, index) => (
                <p key={index} style={{ marginBottom: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                  • {question}
                </p>
              ))}
            </div>
          </div>

          {/* 行動への架橋 */}
          <div style={{
            backgroundColor: 'var(--neutral-primary)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-medium)',
            border: '2px solid #333333'
          }}>
            <h4 className="paragraph" style={{ 
              fontWeight: '700',
              color: '#333333',
              marginBottom: 'var(--spacing-md)',
              fontSize: '16px',
              textAlign: 'center'
            }}>
              次なる一歩へ
            </h4>
            <p className="paragraph" style={{ lineHeight: '1.8', fontSize: '15px', marginBottom: 'var(--spacing-md)' }}>
              キャリアは計画するものではなく、創造するものです。
              専門アドバイザーとの対話を通じて、
              あなたの内なる可能性を言語化し、具体的な行動へと変換していきませんか？
            </p>
            <p className="paragraph" style={{ 
              lineHeight: '1.6', 
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              <strong style={{ color: '#333333' }}>無料個別相談</strong>で、
              あなただけのキャリアストーリーを共に紡ぎましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // アクションボタン
  const ActionButtons = () => (
    <div className="card" style={{
      marginTop: 'var(--spacing-xl)',
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      textAlign: 'center',
      border: '1px solid var(--neutral-200)',
      '@media (max-width: 767px)': {
        marginTop: 'var(--spacing-lg)',
        padding: 'var(--spacing-lg)'
      }
    }}>
      <h3 className="heading_h3" style={{
        marginBottom: 'var(--spacing-lg)',
        color: '#333333',
        '@media (max-width: 767px)': {
          fontSize: '18px',
          marginBottom: 'var(--spacing-md)'
        }
      }}>
        次のステップ
      </h3>
      
      <div className="flex_horizontal" style={{
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap',
        '@media (max-width: 767px)': {
          flexDirection: 'column',
          gap: 'var(--spacing-sm)'
        }
      }}>
        <motion.button
          onClick={onConsultation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button"
          style={{
            backgroundColor: '#333333',
            color: '#ffffff',
            border: 'none',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold',
            '@media (max-width: 767px)': {
              width: '100%',
              fontSize: '14px',
              padding: 'var(--spacing-sm) var(--spacing-md)'
            }
          }}
        >
          無料キャリア相談
        </motion.button>
        
        <motion.button
          onClick={onRetryQuiz}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button is-secondary"
          style={{
            backgroundColor: 'transparent',
            color: '#333333',
            border: '2px solid #333333',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold',
            '@media (max-width: 767px)': {
              width: '100%',
              fontSize: '14px',
              padding: 'var(--spacing-sm) var(--spacing-md)'
            }
          }}
        >
          もう一度診断
        </motion.button>
        
        <motion.button
          onClick={onReturnHome}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button is-secondary"
          style={{
            backgroundColor: 'transparent',
            color: '#333333',
            border: '2px solid #333333',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold',
            '@media (max-width: 767px)': {
              width: '100%',
              fontSize: '14px',
              padding: 'var(--spacing-sm) var(--spacing-md)'
            }
          }}
        >
          ホームに戻る
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="page_container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={() => {}}
        activeRoute="/new-quiz"
      />

      {/* Header */}
      <header className="section" style={{ padding: 'var(--spacing-md) 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">新16タイプ診断 - 結果</div>
            <h1 className="heading_h2">診断結果</h1>
            <p className="paragraph" style={{ color: '#333333' }}>
              あなたの性格タイプと適性をご確認ください
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <ResultHeader />
          <AnalysisSection />
          <UnifiedPersonalitySection />
          <ActionButtons />
        </div>
      </section>
    </div>
  );
};

export default NewResultDisplay;