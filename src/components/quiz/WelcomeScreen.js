import React from 'react';
import { motion } from 'framer-motion';
import { trackQuizStart } from '../../utils/analytics';
import GlobalNavigation from '../common/GlobalNavigation';

const WelcomeScreen = ({ onStartQuiz, onOpenPolicy, onReturnHome, onNavigateToPage, onConsultation }) => {
  const handleStartQuizClick = (e) => {
    e.preventDefault();
    console.log("新しい診断システムを開始します（従来ボタンから）...");
    trackQuizStart('welcome_legacy');
    if (typeof onNavigateToPage === 'function') {
      onNavigateToPage('/new-quiz');
    } else if (typeof onStartQuiz === 'function') {
      onStartQuiz();
    } else {
      console.error("onNavigateToPage is not a function");
    }
  };

  const handleNewQuizClick = (e) => {
    e.preventDefault();
    console.log("新しい診断システムを開始します...");
    trackQuizStart('new_system');
    if (typeof onNavigateToPage === 'function') {
      onNavigateToPage('/new-quiz');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={onStartQuiz}
        activeRoute="/"
      />

      {/* Hero Section */}
      <header className="section max-height_100vh_desktop overflow_hidden flex_horizontal is-y-center is-accent-primary">
        <div className="container is-max">
          <div className="grid_2-col tablet-1-col gap-xxlarge">
            <div className="grid_2-col gap-xsmall min-height_100dvh">
              <motion.img 
                width="208" 
                height="279" 
                alt="医療従事者チームミーティングの画像" 
                src="/images/webflow/6876f466df1691cc1ac0e3c9_e9f4eb22-45f5-45aa-b35a-2bdee6dec828.avif" 
                loading="lazy" 
                className="image_cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <motion.img 
                width="208" 
                height="377" 
                alt="モバイルゲームトレンドの画像" 
                src="/images/webflow/6876f466b92db3ce5a30c738_eaac4332-0cfe-4a3e-9a2a-8fe2794afddc.avif" 
                loading="lazy" 
                className="image_cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.img 
                width="208" 
                height="377" 
                alt="薬剤師による患者相談の画像" 
                src="/images/webflow/6876f4672a264c8079219a06_fdccdf55-bf28-49a1-a394-d114cad33700.avif" 
                loading="lazy" 
                className="image_cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.img 
                width="208" 
                height="279" 
                alt="教育技術向けソフトウェアインターフェースの画像" 
                src="/images/webflow/6876f465f095b6f8d150dbfc_9bb6461b-d72a-4369-ba36-64f5f0e1607d.avif" 
                loading="lazy" 
                className="image_cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </div>
            <div className="header max-width_large">
              <motion.h1 
                className="heading_h1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ position: 'relative' }}
              >
                <span style={{
                  position: 'absolute',
                  left: '-1rem',
                  top: '0.5rem',
                  width: '3px',
                  height: 'calc(100% - 1rem)',
                  backgroundColor: '#333333',
                  borderRadius: '2px',
                  display: 'block'
                }}></span>
                医療キャリアを、<br />
                <span style={{ 
                  display: 'inline-block',
                  marginLeft: '2rem'
                }}>
                  もっと自由に。
                </span>
              </motion.h1>
              <motion.p 
                className="subheading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                16タイプ診断が"あなたらしい職場"を導き出す。<br />
                RIASEC理論×行動スタイル分析で、医療キャリアの新たな可能性を発見しよう。
              </motion.p>
            </div>
          </div>
        </div>
      </header>

      {/* Diagnosis Flow Section */}
      <section className="section padding-bottom_none is-secondary">
        <div className="container">
          <div className="header max-width_large">
            <div className="eyebrow">診断フローのご案内</div>
            <h1 className="heading_h2">診断ステップはとてもシンプル</h1>
            <div className="rich-text paragraph_large w-richtext">
              <p>職種を選択し、24の質問に答えるだけで、あなたの性格や志向にぴったりの医療職場をご提案します。RIASEC理論に基づく科学的分析で、16タイプのキャラクター診断結果をお届けします。理想のキャリアへの第一歩を応援します。</p>
            </div>
            <div className="button-group" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', alignItems: 'center' }}>
              <button 
                onClick={handleNewQuizClick}
                className="button"
                style={{
                  backgroundColor: '#333333',
                  borderColor: '#333333',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                診断する
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onConsultation === 'function') {
                    onConsultation();
                  }
                }}
                className="button is-secondary"
                style={{
                  backgroundColor: 'transparent',
                  color: '#333333',
                  border: '2px solid #333333',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                相談する
              </button>
            </div>
          </div>
        </div>
        <motion.img 
          width="992" 
          height="679" 
          alt="医療チームミーティングの画像" 
          src="/images/webflow/6876f466df1691cc1ac0e3c9_e9f4eb22-45f5-45aa-b35a-2bdee6dec828.avif" 
          loading="lazy" 
          className="image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
      </section>

      {/* Professional Consultant Support Section */}
      <section className="section padding-bottom_none is-secondary">
        <div className="container">
          <div className="header max-width_large">
            <div className="eyebrow">プロフェッショナルサポート</div>
            <h1 className="heading_h2">専門性の高いプライベートエージェント</h1>
            <div className="rich-text paragraph_large w-richtext">
              <p>長年医療機関の事務長経験、人事経験を重ね、医療業界の内情を熟知した精鋭のコンサルタントが、あなたの専属エージェントとして徹底サポート。単なる転職支援ではなく、あなたのキャリア全体を見据えた最適な職場選びをお手伝いします。</p>
            </div>
          </div>
        </div>
        <motion.img 
          width="992" 
          height="679" 
          alt="医療コンサルタントによる専門相談の画像" 
          src="/images/webflow/6876f4661880f4575f64036b_21818c26-3e5a-4f87-bbac-6e7d23371e48.avif" 
          loading="lazy" 
          className="image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
      </section>

      {/* Career Hints Section */}
      <section className="section">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">キャリアのヒント</div>
            <h2 className="heading_h2">医療の未来を共に描く</h2>
            <p className="subheading">最新のキャリア情報や診断のコツ、医療現場のリアルな声をお届けします。あなたの成長を応援するヒントが満載です。</p>
          </div>
          
          {/* Tabs Content */}
          <div className="tabs_content">
            <div className="grid_3-col gap-small">
              <motion.button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onNavigateToPage === 'function') {
                    onNavigateToPage('/columns', { scrollTo: 'personality-advice' });
                  }
                }}
                className="link-content-block w-inline-block"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="ratio_3x2 margin-bottom_xsmall">
                  <img 
                    alt="デジタル学習プロジェクトの画像" 
                    src="/images/webflow/6876f4663a153d4faec8f15d_19557f28-20ff-4354-a70b-839282409da3.avif" 
                    loading="lazy" 
                    className="image_cover"
                  />
                </div>
                <div className="tag_group margin-bottom_xsmall">
                  <div className="tag">診断</div>
                </div>
                <h3 className="heading_h4">医療従事者のキャリア形成における16タイプ性格診断の活用法</h3>
                <p>医療現場で働く皆様が、自分らしいキャリアを築くために、16タイプ性格診断をどのように活用できるかを詳しく解説します。</p>
                <div className="flex_horizontal is-y-center gap-xsmall">
                  <div className="avatar">
                    <img 
                      alt="顧客のヘッドショット画像（動物愛護非営利団体向け）" 
                      src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                      loading="lazy" 
                      className="image_cover"
                    />
                  </div>
                  <div>
                    <div className="paragraph_small margin-bottom_none">Alex Takahashi</div>
                    <div className="paragraph_small margin-bottom_none">2024/06/01</div>
                  </div>
                </div>
              </motion.button>

              <motion.button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onNavigateToPage === 'function') {
                    onNavigateToPage('/columns', { scrollTo: 'positive-career' });
                  }
                }}
                className="link-content-block w-inline-block"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="ratio_3x2 margin-bottom_xsmall">
                  <img 
                    alt="事例の画像" 
                    src="/images/webflow/6876f466bdb449ceb8ef2f56_5df26a14-f845-43c1-8a6f-4d5c5bc007e4.avif" 
                    loading="lazy" 
                    className="image_cover"
                  />
                </div>
                <div className="tag_group margin-bottom_xsmall">
                  <div className="tag">転職</div>
                </div>
                <h3 className="heading_h4">ポジティブアプローチ転職のメリットと成功のポイント</h3>
                <p>従来の転職活動とは異なる「ポジティブアプローチ転職」について、そのメリットと成功させるためのポイントを詳しく解説します。</p>
                <div className="flex_horizontal is-y-center gap-xsmall">
                  <div className="avatar">
                    <img 
                      alt="顧客のヘッドショット画像" 
                      src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                      loading="lazy" 
                      className="image_cover"
                    />
                  </div>
                  <div>
                    <div className="paragraph_small margin-bottom_none">Yuki Sato</div>
                    <div className="paragraph_small margin-bottom_none">2024/05/15</div>
                  </div>
                </div>
              </motion.button>

              <motion.button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onNavigateToPage === 'function') {
                    onNavigateToPage('/columns', { scrollTo: 'workplace-voices' });
                  }
                }}
                className="link-content-block w-inline-block"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="ratio_3x2 margin-bottom_xsmall">
                  <img 
                    alt="医療現場インタビューの画像" 
                    src="/images/webflow/6876f4663a153d4faec8f158_e006255f-4c9f-4863-aa8b-82f8fa8232ee.avif" 
                    loading="lazy" 
                    className="image_cover"
                  />
                </div>
                <div className="tag_group margin-bottom_xsmall">
                  <div className="tag">現場の声</div>
                </div>
                <h3 className="heading_h4">現場で働く先輩の声</h3>
                <p>実際に転職を成功させた医療従事者の体験談や、現場のリアルな声をご紹介します。</p>
                <div className="flex_horizontal is-y-center gap-xsmall">
                  <div className="avatar">
                    <img 
                      alt="顧客のヘッドショット画像" 
                      src="/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif" 
                      loading="lazy" 
                      className="image_cover"
                    />
                  </div>
                  <div>
                    <div className="paragraph_small margin-bottom_none">Hiroshi Tanaka</div>
                    <div className="paragraph_small margin-bottom_none">2024/04/20</div>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Policy Link */}
      <footer className="section is-secondary">
        <div className="container">
          <div className="flex_horizontal is-y-center">
            <div className="paragraph_small text-color_secondary">
              © 2021 MediMatch. All rights reserved.
            </div>
            <button 
              onClick={onOpenPolicy}
              className="text-link is-small"
            >
              プライバシーポリシー
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;