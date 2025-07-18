import React from 'react';
import { motion } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const DiagnosticToolPage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={onStartQuiz}
        activeRoute="/diagnostic-tool"
      />

      {/* First Hero Section - Matching reference structure */}
      <section className="section is-secondary">
        <div className="container">
          <div className="grid_2-col tablet-1-col gap-xxlarge">
            <div className="header margin-bottom_none">
              <motion.h2 
                className="heading_h1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ color: '#2d5a2a' }}
              >
                あなたが輝く医療現場へ
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onStartQuiz === 'function') {
                      onStartQuiz();
                    }
                  }}
                  className="button"
                  style={{ backgroundColor: '#2d5a2a', color: 'white' }}
                >
                  理想のキャリアを発見する
                </button>
              </motion.div>
            </div>
            <div>
              <img 
                width="576" 
                height="832" 
                alt="医療従事者と患者の画像" 
                src="/images/webflow/6876f465f095b6f8d150dbfc_9bb6461b-d72a-4369-ba36-64f5f0e1607d.avif" 
                loading="lazy" 
                className="image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Hero Section - Header structure */}
      <header className="section flex_vertical">
        <div className="container">
          <div className="header">
            <div className="grid_5-col gap-medium">
              <motion.h1 
                className="heading_h1 margin-bottom_none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ color: '#2d5a2a', gridColumn: 'span 3' }}
              >
                毎日が充実し、患者さんに感謝されるキャリアへ
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ gridColumn: 'span 2' }}
              >
                <p className="paragraph_large text-color_secondary margin-bottom_small" style={{ color: '#2d5a2a' }}>
                  16の質問であなたの本当の強みと情熱を発見。「ここでなら長く働ける」と心から思える理想の職場と出会えます。
                </p>
                <div className="button-group">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof onStartQuiz === 'function') {
                        onStartQuiz();
                      }
                    }}
                    className="button"
                    style={{ backgroundColor: '#2d5a2a', color: 'white' }}
                  >
                    あなたらしいキャリアを始める
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
                      color: '#2d5a2a',
                      border: '2px solid #2d5a2a'
                    }}
                  >
                    相談する
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          <img 
            width="1248" 
            height="832" 
            alt="診療所で求職者が話し合う様子" 
            src="/images/webflow/6876f46604125da5772a17ed_35b609e4-f188-48ab-894a-d39f39a4a6de.avif" 
            loading="lazy" 
            className="image_cover ratio_3x2"
          />
        </div>
      </header>

      {/* Features Section with icon */}
      <section className="section is-secondary">
        <div className="container">
          <div className="grid_2-col tablet-1-col gap-xxlarge is-y-center">
            <div className="header margin-bottom_none">
              <h2 style={{ color: '#2d5a2a' }}>「ここでなら長く働ける」と心から思える瞬間</h2>
              <p className="paragraph_large margin-bottom_none" style={{ color: '#2d5a2a' }}>
                あなたの性格タイプが最も力を発揮できる医療現場を科学的に特定。患者さんの笑顔があなたのやりがいになり、成長し続けられる理想的なキャリアを実現します。
              </p>
            </div>
            <div className="ratio_1x1-2">
              <img 
                width="576" 
                height="576" 
                alt="医療相談のイメージ" 
                src="/images/webflow/6876f4661880f4575f64036b_21818c26-3e5a-4f87-bbac-6e7d23371e48.avif" 
                loading="lazy" 
                className="image_cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - 6 cards with exact animation replication */}
      <section className="section">
        <div className="container">
          <div className="grid_1-col">
            <div className="grid_2-col gap-small">
              {/* Card 1 - Left rotation */}
              <motion.div 
                className="ix_card-rotate-left card card_body"
                initial={{ opacity: 0, x: "-70%", rotateZ: -30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M9.24998 18.7103C6.60958 17.6271 4.75 15.0307 4.75 12C4.75 8.96938 6.60958 6.37304 9.24997 5.28979" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                      <path d="M14.75 5.28979C17.3904 6.37303 19.25 8.96938 19.25 12.0001C19.25 15.0307 17.3904 17.6271 14.75 18.7103" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                      <path d="M4 19.2501L8.99998 19.2501C9.13805 19.2501 9.24998 19.1381 9.24998 19.0001L9.24997 14" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                      <path d="M20 4.75L15 4.75003C14.8619 4.75003 14.75 4.86196 14.75 5.00003L14.75 10.0001" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>「あなたらしさ」で選ぶ初めての職場</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>条件ではなく、あなたの本当の性格で選ぶ新しい転職。毎日が「あなたらしく」働ける理想の医療現場を、たった3分で発見できます。</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Right rotation */}
              <motion.div 
                className="ix_card-rotate-right card card_body"
                initial={{ opacity: 0, x: "70%", rotateZ: 30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>科学が証明した性格分析の革命</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>「こんなに自分を理解してくれたのは初めて」と驚く精度で、あなたの本当の強みと価値観を明らかにします。</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Left rotation */}
              <motion.div 
                className="ix_card-rotate-left card card_body"
                initial={{ opacity: 0, x: "-70%", rotateZ: -30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M5.25 6.75H18.75V17.25H5.25V6.75Z" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                      <path d="M5.25 6.75L12 12L18.75 6.75" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>その場でわかるあなたの未来</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>診断終了と同時に、あなたにピッタリの職場とキャリアプランを具体的に提案。「こんな職場を探していた！」と納得する精度です。</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Right rotation */}
              <motion.div 
                className="ix_card-rotate-right card card_body"
                initial={{ opacity: 0, x: "70%", rotateZ: 30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z" stroke="#2d5a2a" strokeWidth="1.5"></path>
                      <path d="M9 12L11 14L15.5 9.5" stroke="#2d5a2a" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>完全無料、個人情報不要</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>名前もメールも不要。今すぐ無料で始められます。誰にも知られず、自分だけのペースで理想のキャリアを探せます。</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 5 - Left rotation */}
              <motion.div 
                className="ix_card-rotate-left card card_body"
                initial={{ opacity: 0, x: "-70%", rotateZ: -30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M17.3654 5.32894C17.8831 5.54543 18.3534 5.86273 18.7495 6.26274C19.146 6.6625 19.4604 7.13723 19.675 7.65978C19.8895 8.18233 20 8.74246 20 9.30814C20 9.87384 19.8895 10.4339 19.675 10.9565C19.4604 11.4791 19.146 11.9538 18.7495 12.3535L12.0001 19L5.2496 12.3535C4.44951 11.5457 4 10.4501 4 9.3076C4 8.16516 4.44951 7.0695 5.2496 6.26166C6.04975 5.45384 7.13498 5 8.26647 5C9.39804 5 10.4833 5.45384 11.2833 6.26166L12.016 6.99843L12.7158 6.26274C13.112 5.86273 13.5823 5.54543 14.0999 5.32894C14.6176 5.11246 15.1724 5.00103 15.7327 5.00103C16.2929 5.00103 16.8478 5.11246 17.3654 5.32894Z" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>医療現場のリアルデータで精度を極めた診断</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>実際の医療機関で働く先輩たちの生の声と最新の業界データを組み合わせた、「生きた」診断結果をお届けします。</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 6 - Right rotation */}
              <motion.div 
                className="ix_card-rotate-right card card_body"
                initial={{ opacity: 0, x: "70%", rotateZ: 30 }}
                whileInView={{ opacity: 1, x: "0%", rotateZ: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="grid_1-col gap-medium ratio_16x9">
                  <div className="is-xlarge-1x1">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12C8.41828 12 12 8.41828 12 4C12 8.41828 15.5817 12 20 12C15.5817 12 12 15.5817 12 20C12 15.5817 8.41828 12 4 12Z" strokeWidth="1.5" strokeLinejoin="round" stroke="#2d5a2a"></path>
                    </svg>
                  </div>
                  <div className="max-width_xsmall">
                    <div className="paragraph_large text_all-caps" style={{ color: '#2d5a2a' }}>あなたの職種で、あなたらしい働き方を</div>
                    <p className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>医師・看護師・薬剤師・検査技師など、どんな職種でも対応。常勤・非常勤・パートなど、あなたのライフスタイルに合う働き方を提案します。</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section is-secondary">
        <div className="container">
          <div className="grid_3-col tablet-1-col gap-small">
            <div className="header margin-bottom_none">
              <h2 className="heading_h2" style={{ color: '#2d5a2a' }}>あなたの新しいスタートを応援します</h2>
              <p className="subheading" style={{ color: '#2d5a2a' }}>たった3分で、あなたが本当に求めている医療キャリアが明らかになります。</p>
              <div className="button-group">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onStartQuiz === 'function') {
                      onStartQuiz();
                    }
                  }}
                  className="button"
                  style={{ backgroundColor: '#2d5a2a', color: 'white' }}
                >
                  理想のキャリアを探す
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
                    color: '#2d5a2a',
                    border: '2px solid #2d5a2a'
                  }}
                >
                  まずは相談したい
                </button>
              </div>
            </div>
            <img 
              width="821" 
              height="616" 
              alt="診療所で求職者が話し合う様子" 
              src="/images/webflow/6876f4661da01ab9d12341c7_1f78b428-86f4-4824-bf02-9de6b489503b.avif" 
              loading="lazy" 
              className="image_cover ratio_4x3"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="grid_2-col tablet-1-col gap-large">
            <div className="header">
              <h2 style={{ color: '#2d5a2a' }}>みなさんからよくいただくご質問</h2>
              <p className="subheading" style={{ color: '#2d5a2a' }}>
                同じような悩みを持つ医療従事者の方からいただいたご質問と回答をご紹介します。安心して診断を受けていただけます。
              </p>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onNavigateToPage === 'function') {
                    onNavigateToPage('/support');
                  }
                }}
                className="button"
                style={{ backgroundColor: '#2d5a2a', color: 'white' }}
              >
                詳しく見る
              </button>
            </div>
            <div className="flex_vertical gap-small">
              <div className="divider">
                <div className="heading_h4" style={{ color: '#2d5a2a' }}>本当に3分で結果がわかるのでしょうか？</div>
                <div className="rich-text w-richtext">
                  <p style={{ color: '#2d5a2a' }}>はい。16の質問に答えるだけで、あなたの性格タイプと最適な職場環境が即座にわかります。簡単でありながら、科学的根拠に基づいた精度の高い診断です。</p>
                </div>
              </div>
              <div className="divider">
                <div className="heading_h4" style={{ color: '#2d5a2a' }}>個人情報の入力は必要ですか？</div>
                <div className="rich-text w-richtext">
                  <p style={{ color: '#2d5a2a' }}>一切不要です。名前、メールアドレス、電話番号などの個人情報は一切必要ありません。完全匿名で、安心してご利用いただけます。</p>
                </div>
              </div>
              <div className="divider">
                <div className="heading_h4" style={{ color: '#2d5a2a' }}>診断後はどんなサポートがありますか？</div>
                <div className="rich-text w-richtext">
                  <p style={{ color: '#2d5a2a' }}>診断結果をもとに、具体的な職場探しのアドバイスや、専門コンサルタントによる無料相談もご利用いただけます。あなたのキャリアを継続的にサポートします。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header">
            <h2 className="eyebrow" style={{ color: '#2d5a2a' }}>お問い合わせ</h2>
            <h2 className="heading_h2" style={{ color: '#2d5a2a' }}>お問い合わせとご質問</h2>
            <p className="subheading max-width_large" style={{ color: '#2d5a2a' }}>
              サービスに関するご質問がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
          <ul role="list" className="grid_4-col gap-small w-list-unstyled">
            <li className="margin-bottom_none">
              <div 
                className="is-large-1x1 margin-bottom_xsmall is-background"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#d5e6d3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path d="M5.25 6.75H18.75V17.25H5.25V6.75Z" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                  <path d="M5.25 6.75L12 12L18.75 6.75" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h5 className="heading_h5" style={{ color: '#2d5a2a' }}>メール</h5>
              <p className="text-color_secondary" style={{ color: '#2d5a2a' }}>24時間以内に回答いたします。</p>
              <div>
                <a href="mailto:support@medimatch.com" className="text-link is-secondary" style={{ color: '#2d5a2a' }}>
                  support@medimatch.com
                </a>
              </div>
            </li>
            <li className="margin-bottom_none">
              <div 
                className="is-large-1x1 margin-bottom_xsmall is-background"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#d5e6d3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z" stroke="#2d5a2a" strokeWidth="1.5" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h4 className="heading_h5" style={{ color: '#2d5a2a' }}>電話</h4>
              <p className="text-color_secondary" style={{ color: '#2d5a2a' }}>平日 8:00–17:00 対応</p>
              <div style={{ color: '#2d5a2a' }}>0587-50-7535</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="section is-secondary">
        <div className="container">
          <div className="flex_horizontal is-y-center">
            <div className="paragraph_small text-color_secondary" style={{ color: '#2d5a2a' }}>
              © 2025 MediMatch. All rights reserved.
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onReturnHome === 'function') {
                  onReturnHome();
                }
              }}
              className="text-link is-small"
              style={{ marginLeft: 'auto', color: '#2d5a2a' }}
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiagnosticToolPage;