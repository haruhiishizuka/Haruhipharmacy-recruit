// 新質問データ - 24問構成（メイン20問+ストレス4問）

export const mainQuestions = [
  // Realistic（現実的）タイプの質問 - 3問
  {
    id: 1,
    text: "デスクワークよりも、医療機器や手技を使った作業の方が好みですか？",
    riasec: "Realistic",
    weight: 1.0,
    category: "技術志向"
  },
  {
    id: 2, 
    text: "会議や企画よりも、実際に手を動かす作業の方が得意ですか？",
    riasec: "Realistic",
    weight: 0.8,
    category: "実践志向"
  },
  {
    id: 3,
    text: "理論や概念よりも、確実な手技や技術の方が重要だと思いますか？",
    riasec: "Realistic", 
    weight: 0.9,
    category: "技術志向"
  },

  // Investigative（研究的）タイプの質問 - 3問
  {
    id: 4,
    text: "日常業務よりも、新しい医学知識や研究の方が興味深いですか？",
    riasec: "Investigative",
    weight: 1.0,
    category: "学習志向"
  },
  {
    id: 5,
    text: "直感よりも、データや統計に基づいて判断するタイプですか？",
    riasec: "Investigative",
    weight: 0.8,
    category: "分析志向"
  },
  {
    id: 6,
    text: "結果よりも、「なぜこうなるのか？」という原因を追求する方が大切ですか？",
    riasec: "Investigative",
    weight: 0.9,
    category: "探究志向"
  },

  // Artistic（芸術的）タイプの質問 - 3問
  {
    id: 7,
    text: "マニュアル通りよりも、創造性や独創的なアイデアを活かした仕事の方が好みですか？",
    riasec: "Artistic",
    weight: 1.0,
    category: "創造志向"
  },
  {
    id: 8,
    text: "マニュアルや慣例よりも、感性や直感を大切にしたアプローチの方が好みですか？",
    riasec: "Artistic",
    weight: 0.7,
    category: "感性志向"
  },
  {
    id: 9,
    text: "一般的な方法よりも、独自性や個性を活かしたアプローチを好みますか？",
    riasec: "Artistic",
    weight: 0.8,
    category: "個性志向"
  },

  // Social（社会的）タイプの質問 - 3問
  {
    id: 10,
    text: "事務作業よりも、患者さんや同僚とのコミュニケーションの方が大切ですか？",
    riasec: "Social",
    weight: 1.0,
    category: "人間関係志向"
  },
  {
    id: 11,
    text: "個人の成果よりも、人の成長や学習を支援することの方がやりがいを感じますか？",
    riasec: "Social",
    weight: 0.9,
    category: "支援志向"
  },
  {
    id: 12,
    text: "個人作業よりも、チームでの連携や協力の方が重要だと思いますか？",
    riasec: "Social",
    weight: 0.8,
    category: "協調志向"
  },

  // Enterprising（企業的）タイプの質問 - 3問
  {
    id: 13,
    text: "フォロワーよりも、リーダーシップを発揮してチームを引っ張る方が得意ですか？",
    riasec: "Enterprising",
    weight: 1.0,
    category: "リーダーシップ志向"
  },
  {
    id: 14,
    text: "プロセスよりも、目標達成や成果を出すことの方が重要だと思いますか？",
    riasec: "Enterprising",
    weight: 0.9,
    category: "達成志向"
  },
  {
    id: 15,
    text: "現状維持よりも、新しいプロジェクトや企画を推進する方がワクワクしますか？",
    riasec: "Enterprising",
    weight: 0.8,
    category: "推進志向"
  },

  // Conventional（慣習的）タイプの質問 - 3問  
  {
    id: 16,
    text: "自由さよりも、ルールや手順が明確な環境で作業する方が安心ですか？",
    riasec: "Conventional",
    weight: 1.0,
    category: "規則志向"
  },
  {
    id: 17,
    text: "大雑把な作業よりも、正確性や細かい注意が必要な作業の方が得意ですか？",
    riasec: "Conventional",
    weight: 0.9,
    category: "安全志向"
  },
  {
    id: 18,
    text: "変化の多い環境よりも、安定した環境で予測可能な仕事の方が好みですか？",
    riasec: "Conventional",
    weight: 0.8,
    category: "組織志向"
  },

  // 行動スタイル判定質問 - 2問
  {
    id: 19,
    text: "新しいチームで働く時、あなたは主にどのような役割を担いますか？",
    riasec: "Behavior",
    weight: 1.0,
    category: "行動スタイル",
    options: [
      { text: "調和を重視する", behavior: "Supporting", points: 3 },
      { text: "リーダーシップをとる", behavior: "Controlling", points: 3 },
      { text: "チーム基盤を作る", behavior: "Conserving", points: 3 },
      { text: "柔軟に役割を変える", behavior: "Adapting", points: 3 }
    ]
  },
  {
    id: 20,
    text: "問題が発生した時、あなたの最初の反応は？",
    riasec: "Behavior",
    weight: 0.9,
    category: "問題解決スタイル",
    options: [
      { text: "協力者を探し解決する", behavior: "Supporting", points: 3 },
      { text: "いち早く行動をする", behavior: "Controlling", points: 3 },
      { text: "分析して確実な対応を図る", behavior: "Conserving", points: 3 },
      { text: "状況に応じて対応を変える", behavior: "Adapting", points: 3 }
    ]
  },

  // ストレス時診断質問 - 4問
  {
    id: 21,
    text: "病院が忙しくて人手不足の時、あなたはどうなりがちですか？",
    riasec: "Stress",
    weight: 1.0,
    category: "ストレス反応",
    options: [
      { text: "いつも以上に確認作業を念入りにしてしまう", stressType: "perfectionism_excess", points: 3 },
      { text: "同僚に頼まず、自分ひとりで多くを引き受けてしまう", stressType: "control_excess", points: 3 },
      { text: "他のスタッフの負担を心配して、自分の休憩を後回しにする", stressType: "support_excess", points: 3 },
      { text: "色々な業務を同時に進めて、収拾がつかなくなる", stressType: "flexibility_excess", points: 3 }
    ]
  },
  {
    id: 22,
    text: "緊急事態や重要な判断が必要な時、あなたはどう行動しますか？",
    riasec: "Stress",
    weight: 0.9,
    category: "ストレス行動",
    options: [
      { text: "慎重になりすぎて、判断に時間をかけすぎてしまう", stressType: "perfectionism_excess", points: 2 },
      { text: "他の人の意見を聞かず、自分で決めて進めてしまう", stressType: "control_excess", points: 2 },
      { text: "みんなの気持ちを優先して、自分の意見を言えなくなる", stressType: "support_excess", points: 2 },
      { text: "色々な選択肢を考えすぎて、決断できなくなる", stressType: "flexibility_excess", points: 2 }
    ]
  },
  {
    id: 23,
    text: "連勤が続いて疲れている時、どんな変化が現れやすいですか？",
    riasec: "Stress",
    weight: 0.8,
    category: "疲労反応",
    options: [
      { text: "普段なら気にならないミスも見過ごせなくなる", stressType: "perfectionism_excess", points: 2 },
      { text: "後輩や同僚に業務を任せることができなくなる", stressType: "control_excess", points: 2 },
      { text: "自分の体調より、患者さんや同僚のことを優先してしまう", stressType: "support_excess", points: 2 },
      { text: "何から手をつけていいか分からなくなる", stressType: "flexibility_excess", points: 2 }
    ]
  },
  {
    id: 24,
    text: "同僚や上司から「ちょっと心配だよ」と言われる時、どんな理由が多いですか？",
    riasec: "Stress",
    weight: 0.7,
    category: "他者からの観察",
    options: [
      { text: "「そこまで完璧にしなくても大丈夫だよ」", stressType: "perfectionism_excess", points: 1 },
      { text: "「もっと周りに頼ってもいいんじゃない？」", stressType: "control_excess", points: 1 },
      { text: "「たまには自分のことも考えなよ」", stressType: "support_excess", points: 1 },
      { text: "「落ち着いて、ひとつずつやっていこう」", stressType: "flexibility_excess", points: 1 }
    ]
  }
];

// ストレスタイプの説明
export const stressTypeDescriptions = {
  perfectionism_excess: {
    title: "完璧主義の過剰発揮",
    description: "普段の「正確性・安全性への配慮」が過度になり、効率性や柔軟性を失いがち",
    warning: "確認作業が増えすぎて、本来の目的を見失う可能性があります",
    coping: [
      "「80点で進める」ことを意識的に心がける",
      "「完璧な状況は存在しない」と受け入れる",
      "時間的制約も重要な要素として考慮する"
    ]
  },
  control_excess: {
    title: "統制欲求の過剰発揮", 
    description: "普段の「リーダーシップ・責任感」が過度になり、他者の自主性を奪いがち",
    warning: "全てをコントロールしようとして、チームの成長を阻害する可能性があります",
    coping: [
      "「任せる」ことも重要なリーダーシップと認識する",
      "他者の意見や提案に積極的に耳を傾ける",
      "適切に責任を分散し、チーム全体で取り組む"
    ]
  },
  support_excess: {
    title: "支援欲求の過剰発揮",
    description: "普段の「他者への配慮・サポート精神」が過度になり、自己犠牲に陥りがち", 
    warning: "自分を犠牲にしすぎて、長期的にはチーム全体に悪影響を与える可能性があります",
    coping: [
      "「自分のケアも重要な責任」と認識する",
      "適切に「No」と言うスキルを身につける",
      "他者の成長機会を奪わないよう配慮する"
    ]
  },
  flexibility_excess: {
    title: "柔軟性の過剰発揮",
    description: "普段の「適応力・多様性への対応」が過度になり、一貫性や集中力を失いがち",
    warning: "あれもこれもと対応しようとして、結果的に効果的でなくなる可能性があります", 
    coping: [
      "優先順位を明確にし、重要なことから取り組む",
      "「全てに対応する必要はない」と割り切る",
      "一つのことに集中する時間を意識的に作る"
    ]
  }
};

// 職種選択（簡素化）
export const professions = [
  {
    id: 'doctor',
    label: '医師',
    description: '診断・治療の専門家として医療の中核を担う'
  },
  {
    id: 'nurse', 
    label: '看護師',
    description: '患者さんに最も近い存在として、医療チームの中核を担う'
  },
  {
    id: 'other',
    label: 'その他医療職',
    description: '薬剤師・技師・療法士など、多様な医療専門職'
  }
];