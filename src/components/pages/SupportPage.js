import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const SupportPage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqData = [
    {
      question: '診断ツールの精度について教えてください',
      answer: '当診断ツールは、心理学的に検証されたMBTI（16タイプ性格診断）理論に基づいて設計されています。医療従事者向けに特化した質問項目を通じて、あなたの職業適性を高い精度で分析します。'
    },
    {
      question: '診断結果はどのように活用できますか？',
      answer: '診断結果は、転職活動、キャリア開発、職場選択の参考として活用できます。また、自己理解を深めることで、現在の職場でのパフォーマンス向上にも役立ちます。'
    },
    {
      question: '個人情報の取り扱いについて',
      answer: '個人情報は厳重に管理し、プライバシーポリシーに従って適切に取り扱います。診断結果は暗号化されて保存され、第三者に提供されることはありません。'
    },
    {
      question: 'サービス利用料金について',
      answer: '診断ツールの利用は完全無料です。転職支援サービスやキャリアコンサルティングをご希望の場合は、別途ご相談ください。'
    }
  ];

  const supportOptions = [
    {
      title: 'よくある質問',
      description: '診断ツールやサービスに関する一般的なご質問にお答えします。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      )
    },
    {
      title: 'キャリア相談',
      description: '専門のキャリアコンサルタントが、あなたのキャリアに関する悩みをサポートします。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: 'お問い合わせ',
      description: 'その他のご質問やご要望については、お気軽にお問い合わせください。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={onStartQuiz}
        activeRoute="/support"
      />

      {/* Hero Section */}
      <header className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">MediMatchサポート</div>
            <motion.h1
              className="heading_h2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#675032' }}
            >
              安心してご利用いただけるよう、<br />
              充実したサポート体制をご用意
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
                診断ツールの使い方からキャリア相談まで、専門スタッフがあなたをサポートします。
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Support Options */}
      <section className="section">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">サポートメニュー</h2>
            <p className="subheading">お困りの内容に応じてお選びください</p>
          </div>
          
          <div className="grid_3-col gap-large">
            {supportOptions.map((option, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ padding: '40px', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#d5e6d3',
                  color: '#675032',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {option.icon}
                </div>
                <h3 className="heading_h3" style={{ marginBottom: '16px' }}>
                  {option.title}
                </h3>
                <p className="paragraph" style={{ marginBottom: '24px' }}>
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">よくある質問</h2>
            <p className="subheading">お客様からよくいただくご質問をまとめました</p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ marginBottom: '20px' }}
              >
                <button
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  className="card"
                  style={{ 
                    width: '100%',
                    padding: '20px',
                    textAlign: 'left',
                    background: 'white',
                    border: '1px solid #e5e5e5',
                    cursor: 'pointer',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="heading_h4" style={{ margin: 0 }}>
                      {faq.question}
                    </h4>
                    <div style={{ 
                      transform: selectedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </button>
                {selectedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '0 0 8px 8px',
                      marginTop: '-1px'
                    }}
                  >
                    <p className="paragraph" style={{ margin: 0 }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">お問い合わせ</h2>
            <p className="subheading">その他のご質問やご相談は、お気軽にお問い合わせください</p>
            
            <div className="button-group" style={{ marginTop: '40px' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onConsultation === 'function') {
                    onConsultation();
                  }
                }}
                className="button"
                style={{ backgroundColor: '#675032', color: 'white', marginRight: '20px' }}
              >
                キャリア相談を予約
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onConsultation === 'function') {
                    onConsultation();
                  }
                }}
                className="button is-secondary"
                style={{ borderColor: '#675032', color: '#675032' }}
              >
                お問い合わせフォーム
              </button>
            </div>
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

export default SupportPage;