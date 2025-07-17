import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const ColumnPage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);

  // おすすめコンテンツ（固定記事）
  const recommendedContent = [
    {
      id: 'recommended-1',
      title: '医療従事者のキャリア形成における16タイプ性格診断の活用法',
      category: '診断',
      date: '2024/12/01',
      author: 'MediMatch編集部',
      excerpt: '医療現場で働く皆様が、自分らしいキャリアを築くために、16タイプ性格診断をどのように活用できるかを詳しく解説します。',
      readTime: '10分',
      image: '/images/webflow/6876f4663a153d4faec8f15d_19557f28-20ff-4354-a70b-839282409da3.avif',
      content: `
        <h2>はじめに</h2>
        <p>医療従事者の皆様は、日々変化する医療現場において、専門性を高めながら自分らしいキャリアを築いていく必要があります。しかし、「自分らしさ」とは何でしょうか？そして、それを医療キャリアにどう活かせばよいのでしょうか？</p>

        <p>本コラムでは、16タイプ性格診断（MBTI）を活用した医療従事者のキャリア形成について、具体的な事例を交えながら詳しく解説します。</p>

        <h2>16タイプ性格診断とは</h2>
        <p>16タイプ性格診断は、心理学者カール・ユングの理論を基に開発された性格類型論です。人の性格を4つの指標で分析し、16の性格タイプに分類します。</p>

        <h3>4つの指標</h3>
        <ul>
          <li><strong>外向性（E）vs 内向性（I）</strong>：エネルギーの向かう方向</li>
          <li><strong>感覚（S）vs 直観（N）</strong>：情報の受け取り方</li>
          <li><strong>思考（T）vs 感情（F）</strong>：判断の基準</li>
          <li><strong>判断（J）vs 知覚（P）</strong>：外界への態度</li>
        </ul>

        <h2>医療現場における性格タイプの活用</h2>
        <p>医療現場では、多様な専門職が連携してチーム医療を提供します。この際、各職種の特性だけでなく、個人の性格特性を理解することで、より効果的な協働が可能になります。</p>

        <h3>看護師の場合</h3>
        <p>看護師は患者との直接的な関わりが多い職種です。感情タイプ（F）の看護師は患者の心理的ケアに長けている一方、思考タイプ（T）の看護師は客観的な観察と記録に優れています。</p>

        <p>例えば、ISFJ（保護者タイプ）の看護師は、患者一人ひとりに寄り添うケアを得意とし、病棟看護師として力を発揮します。一方、ESTJ（管理者タイプ）の看護師は、効率的な業務管理とチームリーダーシップを活かし、主任看護師や看護師長として活躍する傾向があります。</p>

        <h3>薬剤師の場合</h3>
        <p>薬剤師は正確性と専門知識が求められる職種です。思考タイプ（T）の薬剤師は薬物相互作用の分析や副作用モニタリングに優れ、感情タイプ（F）の薬剤師は患者への服薬指導や相談業務で力を発揮します。</p>

        <p>INTP（研究者タイプ）の薬剤師は、新薬の研究開発や治験業務に向いており、ESFJ（支援者タイプ）の薬剤師は、地域薬局での患者対応や在宅医療サポートで活躍します。</p>

        <h2>性格タイプ別キャリア戦略</h2>
        <p>自分の性格タイプを理解することで、以下のようなキャリア戦略を立てることができます。</p>

        <h3>外向性（E）タイプの戦略</h3>
        <p>外向性タイプの方は、人との関わりからエネルギーを得ます。チームリーダーや教育担当、患者・家族との窓口業務などが向いています。</p>

        <ul>
          <li>チームリーダーや管理職を目指す</li>
          <li>新人教育や研修企画に携わる</li>
          <li>地域医療連携の窓口を担当する</li>
          <li>学会発表や講演活動を行う</li>
        </ul>

        <h3>内向性（I）タイプの戦略</h3>
        <p>内向性タイプの方は、一人の時間や深く考えることからエネルギーを得ます。専門性を深める分野や、集中を要する業務が向いています。</p>

        <ul>
          <li>専門認定資格の取得を目指す</li>
          <li>研究活動や論文執筆に取り組む</li>
          <li>システム開発や業務改善に参加する</li>
          <li>一対一の患者ケアを極める</li>
        </ul>

        <h2>職場環境選択のポイント</h2>
        <p>性格タイプに合った職場環境を選ぶことも、キャリア形成において重要です。</p>

        <h3>急性期病院vs慢性期病院</h3>
        <p>急性期病院は変化が激しく、迅速な判断が求められる環境です。判断タイプ（J）や思考タイプ（T）の方に向いています。一方、慢性期病院はじっくりと患者と向き合う環境で、感情タイプ（F）や知覚タイプ（P）の方に適しています。</p>

        <h3>大規模病院vs小規模クリニック</h3>
        <p>大規模病院は専門性と組織性が重視され、内向性（I）や思考タイプ（T）の方が力を発揮しやすい環境です。小規模クリニックは多様な業務と患者との密接な関係が特徴で、外向性（E）や感情タイプ（F）の方に向いています。</p>

        <h2>キャリア開発の具体的ステップ</h2>
        <p>性格タイプを活かしたキャリア開発は、以下のステップで進めることができます。</p>

        <h3>ステップ1：自己理解</h3>
        <p>まず、正確な性格診断を受け、自分のタイプを理解します。その上で、自分の強みと課題を客観的に把握します。</p>

        <h3>ステップ2：環境分析</h3>
        <p>現在の職場環境が自分の性格タイプに合っているかを分析します。合わない場合は、どのような環境が適しているかを検討します。</p>

        <h3>ステップ3：目標設定</h3>
        <p>自分の性格タイプと価値観に基づいて、短期・中期・長期の目標を設定します。</p>

        <h3>ステップ4：行動計画</h3>
        <p>目標達成のための具体的な行動計画を立て、実行します。</p>

        <h3>ステップ5：評価と修正</h3>
        <p>定期的に進捗を評価し、必要に応じて計画を修正します。</p>

        <h2>成功事例</h2>
        <p>実際に16タイプ性格診断を活用してキャリアアップを果たした事例をご紹介します。</p>

        <h3>事例1：看護師Aさん（INFP）</h3>
        <p>Aさんは内向的で理想主義的な性格の看護師でした。当初は忙しい急性期病棟で働いていましたが、自分の価値観と合わない環境にストレスを感じていました。</p>

        <p>性格診断の結果、INFP（理想主義者タイプ）であることが分かり、患者一人ひとりと深く関わることのできる緩和ケア病棟に転職しました。現在は緩和ケア認定看護師として、患者と家族の心のケアに専念し、充実したキャリアを送っています。</p>

        <h3>事例2：薬剤師Bさん（ESTJ）</h3>
        <p>Bさんは外向的で組織運営が得意な薬剤師でした。調剤業務だけでなく、チーム医療における薬剤師の役割拡大に関心がありました。</p>

        <p>性格診断でESTJ（管理者タイプ）であることが確認され、病院薬剤師として薬剤部の管理業務に携わることになりました。現在は薬剤部長として、部門運営と若手薬剤師の育成に力を入れています。</p>

        <h2>注意点と限界</h2>
        <p>16タイプ性格診断は有用なツールですが、以下の点に注意が必要です。</p>

        <h3>タイプの固定化を避ける</h3>
        <p>性格タイプは傾向を示すものであり、絶対的なものではありません。状況や経験によって変化することもあります。</p>

        <h3>多面的な評価</h3>
        <p>性格タイプだけでなく、スキル、経験、価値観なども総合的に考慮してキャリア判断を行うことが重要です。</p>

        <h3>偏見の回避</h3>
        <p>特定のタイプが優れているという偏見を持たず、それぞれのタイプの価値を認めることが大切です。</p>

        <h2>まとめ</h2>
        <p>16タイプ性格診断は、医療従事者のキャリア形成において強力なツールとなり得ます。自分の性格特性を理解し、それに合った職場環境や職務内容を選択することで、より充実したキャリアを築くことができます。</p>

        <p>重要なのは、診断結果を絶対視するのではなく、自己理解を深めるための一つの手段として活用することです。また、定期的に自分の価値観や目標を見直し、必要に応じてキャリア戦略を調整していくことも大切です。</p>

        <p>医療業界では、患者中心の医療を提供するために、多様な専門職が協働しています。一人ひとりが自分らしさを発揮できる環境を見つけることで、より質の高い医療の提供と、医療従事者自身の満足度向上の両方を実現できるでしょう。</p>

        <p>MediMatchでは、16タイプ性格診断を活用したキャリア支援を行っています。自分らしいキャリアを見つけたい方は、ぜひお気軽にご相談ください。</p>
      `
    },
    {
      id: 'recommended-2',
      title: 'ポジティブアプローチ転職のメリットと成功のポイント',
      category: '転職',
      date: '2024/11/20',
      author: '平島 禎之',
      excerpt: '従来の転職活動とは異なる「ポジティブアプローチ転職」について、そのメリットと成功させるためのポイントを詳しく解説します。',
      readTime: '8分',
      image: '/images/webflow/6876f466bdb449ceb8ef2f56_5df26a14-f845-43c1-8a6f-4d5c5bc007e4.avif',
      content: `
        <h2>ポジティブアプローチ転職とは</h2>
        <p>ポジティブアプローチ転職とは、求職者が「働きたい」と思う特定の医療機関に積極的にアプローチし、自分の価値をアピールして転職の可能性を探る手法です。従来の「求人ありき」の転職活動とは根本的に異なり、求職者の主体性と情熱を最優先にした前向きな転職アプローチです。</p>

        <h2>従来の転職活動との違い</h2>
        <p>一般的な転職活動では、求人情報から条件に合う職場を探しますが、ポジティブアプローチ転職では以下のような特徴があります...</p>
        
        <p>この手法により、本当に働きたい職場での転職が実現できる可能性が高まります。</p>

        <h2>ポジティブアプローチ転職のメリット</h2>
        <h3>1. 理想の職場への転職挑戦</h3>
        <p>求人が出ていない理想的な職場にも転職のチャンスがあります。特に、働きやすい環境の医療機関は離職率が低く、求人が出にくい傾向があります。</p>

        <h3>2. 主体的なキャリア選択</h3>
        <p>自分の価値観や希望を最優先に職場を選択できます。これにより、長期的なキャリア満足度が向上します。</p>

        <h3>3. 競争が少ない</h3>
        <p>公開求人と異なり、応募者が限定されるため、競争が激しくありません。</p>

        <h2>成功のポイント</h2>
        <p>ポジティブアプローチ転職を成功させるためには、以下のポイントが重要です...</p>

        <h3>徹底的な企業研究</h3>
        <p>指名する医療機関について、経営状況、組織文化、将来性など詳細な情報を収集します。</p>

        <h3>自己分析の深化</h3>
        <p>なぜその機関で働きたいのか、自分がどのような価値を提供できるのかを明確にします。</p>

        <h3>適切なアプローチ</h3>
        <p>専門的な転職エージェントを通じて、適切なタイミングと方法でアプローチします。</p>

        <h2>注意点</h2>
        <p>ポジティブアプローチ転職には以下のような注意点もあります...</p>

        <p>これらの点を理解した上で、戦略的にアプローチすることが重要です。</p>

        <h2>まとめ</h2>
        <p>ポジティブアプローチ転職は、自分らしいキャリアを実現するための有効な手段です。適切な準備と積極的なアプローチにより、理想の職場での転職が可能になります。</p>
      `
    }
  ];

  // 最新コラム
  const latestColumns = [
    {
      id: 1,
      title: '医療経営者のための三大幸福論活用法～バーンアウト対策と業績向上の両立～',
      category: '経営',
      date: '2025/06/16',
      author: 'シマキ',
      excerpt: '100年前の三つの幸福論が、現代医療経営における人材不足とバーンアウトの課題を解決する鍵となります。ラッセル、アラン、ヒルティの古典的英知で現代医療DXを乗り切る方法を詳しく解説します。',
      readTime: '30分',
      image: '/images/webflow/6876f4663a153d4faec8f15d_19557f28-20ff-4354-a70b-839282409da3.avif',
      content: `
        <h2>はじめに：なぜ今、100年前の哲学者の言葉が医療経営者の心に響くのか？</h2>
        <p>私たちは実に奇妙な時代に生きています。</p>
        
        <p>医療DXだ、働き方改革だ、地域包括ケアだと、毎日のように新しい制度やシステムが導入される一方で、現場では深刻な人材不足とバーンアウトが蔓延している。AIが医師の診断精度を上回るというニュースを見ながら、「では人間の医療従事者は何のために存在するのか？」という根本的な疑問に直面する。</p>
        
        <p>そんな混沌とした現代だからこそ、100年以上前に書かれた三つの幸福論が、驚くほど現代的な輝きを放っているのです。</p>

        <h2>現代医療現場の深刻な現実：データが語る「不幸の構造」</h2>
        <p>まず、現在の医療現場がどのような状況にあるかを正確に把握しましょう。</p>

        <h3>コロナ禍が浮き彫りにした医療従事者のメンタルヘルス危機：</h3>
        <p>46%の医療従事者がバーンアウトを経験し、日本赤十字社医療センターの調査では、医療従事者の27.9%がうつ病を発症という深刻な状況が明らかになりました。さらに、1年以内退職予定の看護師は「やりがい」「成長できる環境」の満足度が特に低いという調査結果も出ています。</p>

        <h3>2024年医師働き方改革の複合的影響：</h3>
        <p>医師の時間外労働に年960時間の上限が設定され、連続勤務時間や勤務間インターバルの規制も導入されました。この制度は医師の健康を守る重要な改革ですが、現場では人手不足による業務の集約化、効率性重視による患者との関係性希薄化という新たな課題が生まれています。</p>

        <h2>ラッセルの革命的洞察：幸福は「獲得」されるもの</h2>
        <p>バートランド・ラッセルは数学者・哲学者・社会評論家として、論理的思考を武器に人間の幸福を分析しました。彼の幸福論は、自身の「自殺的青年期から満足した成人期」への変化を一般化した実体験に基づいている点で、単なる机上の空論ではない説得力を持っています。</p>

        <h3>ラッセルの核心的洞察：</h3>
        <p>「幸福は熟した果実のように自然に落ちてこない。それは獲得されなければならないものであり、その手段は外界への関心を広げることである」</p>

        <p>この「外界への関心」という概念こそが、現代医療経営における多くの問題を解決する鍵となります。ラッセルは人間の不幸の原因を精密に分析し、その多くが「過度の自己中心性」から生まれることを解明しました。</p>

        <h2>医療現場における「外界への関心」が生み出す組織変革の科学</h2>
        <p>ラッセルの理論の正しさは、現代の科学的研究によって実証されています。</p>

        <h3>金沢医科大学病院の画期的調査「FitnES+」が示す驚異的な発見：</h3>
        <p>この調査は371の医療機関、10万人の回答を分析し、医療従事者の満足度を決定する要因を特定しました。その結果、満足度の高い職場に共通していたのは以下の「外向き要素」でした：</p>
        
        <ul>
          <li><strong>働く幸せ：</strong>患者さんの役に立っているという実感</li>
          <li><strong>承認感：</strong>同僚や上司から認められているという感覚</li>
          <li><strong>多職種連携：</strong>チーム全体で患者さんを支えているという一体感</li>
          <li><strong>患者志向性：</strong>患者さんの立場に立って考える姿勢</li>
        </ul>

        <p>興味深いことに、給与や労働時間といった「自分の内側」の条件よりも、これらの「外向きの関心」の方が満足度に大きく影響していたのです。これはラッセルの「外界への関心」理論の科学的実証といえるでしょう。</p>

        <h2>アランの意志的楽観主義：「上機嫌」という組織改革の核心</h2>
        <h3>アランの革命的発見：感情は「選択」できる</h3>
        <p>フランスの哲学者アラン（本名エミール・シャルティエ）は、40年間にわたって教育現場に立ち続けながら、実践的な幸福論を構築しました。彼の最も革命的な洞察は「悲観主義は気分に属し、楽観主義は意志に属する」という発見です。</p>

        <p>これは現代の認知行動療法や神経科学の研究が裏付ける、科学的に正しい洞察でもあります。アランは100年前に、現代心理学の核心的発見を先取りしていたのです。</p>

        <h3>アランの幸福論の3つの柱：</h3>
        <ul>
          <li><strong>意志性：</strong>幸福は外的条件ではなく、内的な選択によって決まる</li>
          <li><strong>習慣性：</strong>幸福は継続的な実践によって身につく技術</li>
          <li><strong>社会性：</strong>上機嫌は周囲に伝染し、組織全体を変革する</li>
        </ul>

        <h2>現代科学による「意志的楽観主義」の実証</h2>
        <p>アランの理論は、現代の医療現場での実証研究によってその有効性が証明されています。</p>

        <h3>慶應義塾大学のMHALOプログラム：</h3>
        <p>マインドフルネスと意志的楽観主義を組み合わせた医療従事者向けの研修で、参加者の92%が満足し、バーンアウトが有意に改善という結果を得ました。</p>

        <h3>MOPRプログラムの驚異的成果：</h3>
        <p>73名の医療従事者を対象とした6週間のMindfulness-Oriented Professional Resilience訓練で、コンパッション満足度向上（p<0.001）、バーンアウト軽減（p=0.003）、二次性トラウマストレス軽減（p<0.001）という統計的に有意な改善が確認されました。</p>

        <p>これらの結果は、アランが提唱した「意志による幸福創造」が単なる理想論ではなく、実際に効果のある科学的手法であることを実証しています。</p>

        <h2>ヒルティの独創的貢献：労働の神聖化という概念</h2>
        <p>カール・ヒルティはスイスの法学者・政治家・哲学者として、実際の社会活動に従事しながら幸福論を構築した実践的思想家でした。彼の最も独創的な貢献は「労働の神聖化」という概念です。</p>

        <h3>ヒルティの労働観の核心：</h3>
        <p>「人間の幸福の最大部分は、絶えず続けられる仕事と、そこから生まれる喜びややりがいである」</p>

        <p>これは単なる「勤勉は美徳」という道徳論ではありません。ヒルティが説くのは、仕事そのものを人格形成と社会貢献の手段として捉える、より深遠な労働哲学です。</p>

        <p>私たちが目指すのは、単なる「成功する医療機関」ではありません。患者さんも、スタッフも、そして経営者自身も幸福を感じられる「美しい医療」の実現なのです。</p>
      `
    },
    {
      id: 2,
      title: '情報化社会を生き抜く哲学的思考法～日常に潜む「なぜ？」から始める知性の鍛え方～',
      category: '思考法',
      date: '2025/07/17',
      author: 'シマキ',
      excerpt: '情報過多の現代社会で本質的な判断力を失わないために。日常の何気ない疑問から始める哲学的思考の実践法と、デジタル時代に必要な知性の磨き方を詳しく解説します。',
      readTime: '25分',
      image: '/images/webflow/6876f4663a153d4faec8f158_e006255f-4c9f-4863-aa8b-82f8fa8232ee.avif',
      content: `
        <h2>1. 情報過多時代の知性の迷子たち</h2>
        <p>私たちは、かつてないほど多くの情報に囲まれて生きています。スマートフォンをちょっと触れば、世界中のニュースが瞬時に手に入り、SNSには無数の意見や感情が飛び交い、YouTube、Netflix、TikTokなどのプラットフォームは私たちの注意を奪い合っています。</p>
        
        <p>──これらすべてが私たちの思考を分散させ、本質的な判断力を「ぽろり」と奪っているのではないでしょうか。</p>
        
        <p>「情報化社会って便利ですね」と言いながら、実は私たちは情報に支配されているのかもしれません。まるで美味しそうなケーキを前にしたダイエット中の人のように、「これも必要、あれも重要」と情報を詰め込んでは消化不良を起こしているのです。</p>
        
        <p>こうした時代だからこそ、哲学という「知性の剣」が必要なのです。剣と聞くと物騒に思えるかもしれませんが、これは暴力的な武器ではありません。混沌とした現実をすっぱりと切り分け、本質を見極める美しい道具なのです。</p>

        <p>きっと、その歩みの先に、今まで見たことのない美しい景色が待っているはずです。</p>
      `
    },
    {
      id: 3,
      title: '医療現場のDX推進と看護師の役割変化',
      category: '現場の声',
      date: '2024/11/10',
      author: '田中 美里',
      excerpt: 'デジタル化が進む医療現場で、看護師の役割がどのように変化しているか、実際の現場の声をお届けします。',
      readTime: '12分',
      image: '/images/webflow/6876f4663a153d4faec8f158_e006255f-4c9f-4863-aa8b-82f8fa8232ee.avif',
      content: `
        <h2>医療DXの現状</h2>
        <p>近年、医療業界においてもデジタルトランスフォーメーション（DX）が急速に進んでいます。電子カルテの普及から始まり、AI診断支援、遠隔医療、IoTデバイスの活用など、様々な技術が医療現場に導入されています。</p>

        <h2>看護師の業務変化</h2>
        <p>DXの進展により、看護師の業務も大きく変化しています...</p>

        <h3>記録業務の効率化</h3>
        <p>音声認識技術やタブレット端末の活用により、記録業務の時間が大幅に短縮されました。これにより、患者ケアにより多くの時間を割けるようになっています。</p>

        <h3>データ分析能力の重要性</h3>
        <p>バイタルデータや行動パターンの分析など、データを読み解く能力がますます重要になっています。</p>

        <h2>現場の実例</h2>
        <p>実際の医療現場でのDX活用事例をご紹介します...</p>

        <h3>A病院での取り組み</h3>
        <p>ICUでのAI監視システム導入により、重篤な状態変化の早期発見が可能になりました。看護師は従来の定期巡回に加え、AI分析結果を活用した予防的ケアに重点を置いています。</p>

        <h2>必要なスキルの変化</h2>
        <p>DX時代の看護師に求められるスキルについて解説します...</p>

        <h3>デジタルリテラシー</h3>
        <p>基本的なIT知識から、医療機器の操作、データ管理まで、幅広いデジタルスキルが必要です。</p>

        <h3>コミュニケーション能力</h3>
        <p>技術が発達しても、患者との人間的な関わりはより重要になっています。</p>

        <h2>今後の展望</h2>
        <p>医療DXのさらなる進展と、看護師の役割の未来について考察します...</p>

        <p>技術と人間性のバランスを取りながら、より質の高い医療の提供を目指していく必要があります。</p>

        <h2>まとめ</h2>
        <p>医療DXは看護師の働き方を大きく変える一方で、患者ケアの本質的な価値はより重要になっています。変化に適応しながら、専門性を高めていくことが求められています。</p>
      `
    }
  ];

  // 全記事を統合
  const allColumns = [...recommendedContent, ...latestColumns];

  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedColumn(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={onStartQuiz}
        activeRoute="/columns"
      />

      <AnimatePresence mode="wait">
        {!selectedColumn ? (
          // Column List View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <header className="section is-secondary">
              <div className="container">
                <div className="header is-align-center">
                  <div className="eyebrow">MediMatchコラム</div>
                  <motion.h1
                    className="heading_h2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ color: '#675032' }}
                  >
                    医療キャリアの最新情報
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <p className="subheading" style={{ 
                      fontSize: '18px', 
                      fontWeight: '400', 
                      lineHeight: '1.6', 
                      maxWidth: '900px', 
                      margin: '0 auto 30px',
                      color: '#675032',
                      padding: '0 20px'
                    }}>
                      医療業界の最新トレンドから、キャリア形成のヒントまで、役立つ情報をお届けします。
                    </p>
                  </motion.div>
                </div>
              </div>
            </header>

            {/* おすすめコンテンツ */}
            <section className="section">
              <div className="container">
                <div className="header is-align-center" style={{ marginBottom: '40px' }}>
                  <h2 className="heading_h3" style={{ color: '#675032' }}>おすすめコンテンツ</h2>
                  <p className="paragraph" style={{ color: '#675032', marginBottom: '0' }}>
                    多くの方に読まれている人気記事をご紹介します
                  </p>
                </div>
                <div className="grid_3-col gap-large">
                  {recommendedContent.map((column, index) => (
                    <motion.article 
                      key={column.id}
                      className="link-content-block"
                      onClick={() => handleColumnSelect(column)}
                      style={{ cursor: 'pointer' }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="ratio_3x2 margin-bottom_xsmall">
                        <img 
                          alt={column.title} 
                          src={column.image} 
                          loading="lazy" 
                          className="image_cover"
                        />
                      </div>
                      <div className="tag_group margin-bottom_xsmall">
                        <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                          {column.category}
                        </div>
                      </div>
                      <h3 className="heading_h4">{column.title}</h3>
                      <p className="paragraph">{column.excerpt}</p>
                      <div className="flex_horizontal is-y-center gap-xsmall">
                        <div className="avatar">
                          <img 
                            alt="著者画像" 
                            src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                            loading="lazy" 
                            className="image_cover"
                          />
                        </div>
                        <div>
                          <div className="paragraph_small margin-bottom_none">{column.author}</div>
                          <div className="paragraph_small margin-bottom_none">{column.date} • {column.readTime}</div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            {/* 最新コラム */}
            <section className="section is-secondary">
              <div className="container">
                <div className="header is-align-center" style={{ marginBottom: '40px' }}>
                  <h2 className="heading_h3" style={{ color: '#675032' }}>最新コラム</h2>
                  <p className="paragraph" style={{ color: '#675032', marginBottom: '0' }}>
                    最新の医療業界情報と専門的な知見をお届けします
                  </p>
                </div>
                <div className="grid_3-col gap-large">
                  {latestColumns.map((column, index) => (
                    <motion.article 
                      key={column.id}
                      className="link-content-block"
                      onClick={() => handleColumnSelect(column)}
                      style={{ cursor: 'pointer' }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index + recommendedContent.length) * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="ratio_3x2 margin-bottom_xsmall">
                        <img 
                          alt={column.title} 
                          src={column.image} 
                          loading="lazy" 
                          className="image_cover"
                        />
                      </div>
                      <div className="tag_group margin-bottom_xsmall">
                        <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                          {column.category}
                        </div>
                      </div>
                      <h3 className="heading_h4">{column.title}</h3>
                      <p className="paragraph">{column.excerpt}</p>
                      <div className="flex_horizontal is-y-center gap-xsmall">
                        <div className="avatar">
                          <img 
                            alt="著者画像" 
                            src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                            loading="lazy" 
                            className="image_cover"
                          />
                        </div>
                        <div>
                          <div className="paragraph_small margin-bottom_none">{column.author}</div>
                          <div className="paragraph_small margin-bottom_none">{column.date} • {column.readTime}</div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          // Individual Column View
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Article Header */}
            <header className="section is-secondary">
              <div className="container">
                <div className="header" style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <button 
                    onClick={handleBackToList}
                    className="button is-secondary"
                    style={{ marginBottom: '20px' }}
                  >
                    ← コラム一覧に戻る
                  </button>
                  
                  <div className="tag_group margin-bottom_xsmall">
                    <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                      {selectedColumn.category}
                    </div>
                  </div>
                  
                  <h1 className="heading_h1" style={{ color: '#675032' }}>
                    {selectedColumn.title}
                  </h1>
                  
                  <div className="flex_horizontal is-y-center gap-xsmall" style={{ marginTop: '20px' }}>
                    <div className="avatar">
                      <img 
                        alt="著者画像" 
                        src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                        loading="lazy" 
                        className="image_cover"
                      />
                    </div>
                    <div>
                      <div className="paragraph_small margin-bottom_none">{selectedColumn.author}</div>
                      <div className="paragraph_small margin-bottom_none">{selectedColumn.date} • {selectedColumn.readTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <section className="section">
              <div className="container">
                <article 
                  className="rich-text"
                  style={{ 
                    maxWidth: '800px', 
                    margin: '0 auto',
                    lineHeight: '1.8',
                    fontSize: '16px'
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedColumn.content }}
                />
              </div>
            </section>

            {/* Related Articles */}
            <section className="section is-secondary">
              <div className="container">
                <div className="header is-align-center">
                  <h2 className="heading_h2">関連記事</h2>
                </div>
                <div className="grid_3-col gap-large">
                  {allColumns.filter(col => col.id !== selectedColumn.id).slice(0, 3).map((column) => (
                    <motion.article 
                      key={column.id}
                      className="link-content-block"
                      onClick={() => handleColumnSelect(column)}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="ratio_3x2 margin-bottom_xsmall">
                        <img 
                          alt={column.title} 
                          src={column.image} 
                          loading="lazy" 
                          className="image_cover"
                        />
                      </div>
                      <div className="tag_group margin-bottom_xsmall">
                        <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                          {column.category}
                        </div>
                      </div>
                      <h3 className="heading_h4">{column.title}</h3>
                      <p className="paragraph">{column.excerpt}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="section is-secondary">
        <div className="container">
          <div className="flex_horizontal is-y-center">
            <div className="paragraph_small text-color_secondary">
              © 2021 MediMatch. All rights reserved.
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onReturnHome === 'function') {
                  onReturnHome();
                }
              }}
              className="text-link is-small"
              style={{ marginLeft: 'auto' }}
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ColumnPage;