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

      {/* Hero Section */}
      <header className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">MediMatch診断ツール</div>
            <motion.h1
              className="heading_h2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#675032' }}
            >
              あなたに最適な医療キャリアを発見
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
                16タイプ診断を活用した科学的なアプローチで、あなたの性格特性と価値観に最適な医療職場を見つけましょう。
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Diagnostic Tool Features */}
      <section className="section">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">診断ツールの特徴</h2>
            <p className="subheading">科学的根拠に基づいた精密な性格分析</p>
          </div>
          
          <div className="grid_3-col gap-large">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#d5e6d3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                  <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                  <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                  <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                </svg>
              </div>
              <h3 className="heading_h4">16タイプ性格診断</h3>
              <p className="paragraph">MBTIに基づいた科学的な性格分析で、あなたの本質的な特性を明らかにします。</p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#d5e6d3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h20"/>
                  <path d="M5 20V8.2a1 1 0 0 1 .4-.8l4.2-3.4a1 1 0 0 1 1.2 0l4.2 3.4a1 1 0 0 1 .4.8V20"/>
                  <path d="M12 15v5"/>
                  <path d="M8 9h8"/>
                  <path d="M8 13h8"/>
                </svg>
              </div>
              <h3 className="heading_h4">医療機関マッチング</h3>
              <p className="paragraph">あなたの性格特性に合った医療機関の文化や働き方をレコメンドします。</p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#d5e6d3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <h3 className="heading_h4">キャリア成長支援</h3>
              <p className="paragraph">診断結果に基づいた具体的なキャリア開発プランをご提案します。</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">診断の流れ</h2>
            <p className="subheading">簡単3ステップであなたの適性を発見</p>
          </div>
          
          <div className="grid_3-col gap-large">
            <div className="header is-align-center">
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#675032',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 auto 20px'
              }}>
                1
              </div>
              <h3 className="heading_h4">職種選択</h3>
              <p className="paragraph">看護師、薬剤師、リハビリ職など、あなたの専門分野を選択します。</p>
            </div>

            <div className="header is-align-center">
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#675032',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 auto 20px'
              }}>
                2
              </div>
              <h3 className="heading_h4">質問回答</h3>
              <p className="paragraph">36の質問に答えることで、あなたの性格特性を分析します。</p>
            </div>

            <div className="header is-align-center">
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#675032',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 auto 20px'
              }}>
                3
              </div>
              <h3 className="heading_h4">結果確認</h3>
              <p className="paragraph">詳細な分析結果と最適な職場環境の提案を確認できます。</p>
            </div>
          </div>

          <div className="header is-align-center" style={{ marginTop: '40px' }}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onStartQuiz === 'function') {
                  onStartQuiz();
                }
              }}
              className="button"
              style={{ backgroundColor: '#675032', color: 'white' }}
            >
              今すぐ診断を開始する
            </button>
          </div>
        </div>
      </section>

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

export default DiagnosticToolPage;