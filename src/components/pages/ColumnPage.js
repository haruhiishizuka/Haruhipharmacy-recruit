import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const ColumnPage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);

  const columns = [
    {
      id: 1,
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
      id: 2,
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
        <h3>1. 理想の職場への転職が可能</h3>
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

            {/* Column List */}
            <section className="section">
              <div className="container">
                <div className="grid_3-col gap-large">
                  {columns.map((column, index) => (
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
                  {columns.filter(col => col.id !== selectedColumn.id).slice(0, 3).map((column) => (
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