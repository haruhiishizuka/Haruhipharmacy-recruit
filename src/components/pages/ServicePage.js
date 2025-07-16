import React from 'react';
import { motion } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const ServicePage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const services = [
    {
      title: '有料職業紹介事業',
      description: '医療従事者の転職を専門的にサポート。ポジティブアプローチによる転職システムで、あなたの「行きたい」を実現します。',
      features: [
        '厚生労働大臣許可 23-ユ-302928',
        'ポジティブアプローチ転職システム',
        '医療機関の質的評価',
        '1対1の専任サポート'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="m22 21-3-3m0 0-3-3m3 3 3-3m-3 3-3 3"/>
        </svg>
      )
    },
    {
      title: 'キャリアコンサルティング事業',
      description: '医療従事者のキャリア形成を長期的視点でサポート。個人の価値観と成長を重視したコンサルティングを提供します。',
      features: [
        '国家資格キャリアコンサルタント在籍',
        '16タイプ診断活用',
        '中長期キャリアプラン作成',
        'ライフバランス設計'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      title: '経営コンサルタント',
      description: '医療機関の経営改善から組織運営まで、豊富な経験に基づいた実践的なコンサルティングサービスを提供します。',
      features: [
        '医療経営コンサルタント',
        '組織体制構築支援',
        '業務効率化提案',
        'DX推進サポート'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>
      )
    },
    {
      title: 'M&A支援',
      description: '医療機関のM&Aにおける戦略立案から実行まで、専門的な知識と経験でスムーズな事業承継をサポートします。',
      features: [
        'M&A戦略立案',
        'デューデリジェンス',
        '企業価値評価',
        '統合後支援（PMI）'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/>
          <path d="M5 20V8.2a1 1 0 0 1 .4-.8l4.2-3.4a1 1 0 0 1 1.2 0l4.2 3.4a1 1 0 0 1 .4.8V20"/>
          <path d="M12 15v5"/>
          <path d="M8 9h8"/>
          <path d="M8 13h8"/>
        </svg>
      )
    },
    {
      title: '資産承継サポート',
      description: '医療機関経営者の事業承継・資産承継を包括的にサポート。次世代への円滑な承継を実現します。',
      features: [
        '事業承継計画策定',
        '後継者育成支援',
        '税務・法務連携',
        '承継後フォロー'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
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
        activeRoute="/services"
      />

      {/* Hero Section */}
      <header className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">MediMatchサービス</div>
            <motion.h1
              className="heading_h2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#675032' }}
            >
              医療業界を支える総合サービス
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
                医療従事者のキャリア支援から医療機関の経営改善まで、医療業界の発展を多角的にサポートします。
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">提供サービス</h2>
            <p className="subheading">医療業界に特化した専門サービス</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '30px',
                  alignItems: 'flex-start',
                  padding: '40px'
                }}
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
                  flexShrink: 0
                }}>
                  {service.icon}
                </div>
                
                <div>
                  <h3 className="heading_h3" style={{ marginBottom: '16px' }}>
                    {service.title}
                  </h3>
                  <p className="paragraph" style={{ marginBottom: '24px' }}>
                    {service.description}
                  </p>
                  
                  <div className="tag_group">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <h2 className="heading_h2">サービスに関するお問い合わせ</h2>
            <p className="subheading">専門スタッフがご相談を承ります</p>
            
            <div className="button-group" style={{ marginTop: '40px' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onConsultation === 'function') {
                    onConsultation();
                  }
                }}
                className="button"
                style={{ backgroundColor: '#675032', color: 'white' }}
              >
                無料相談を予約する
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

export default ServicePage;