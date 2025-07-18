import React, { useState } from 'react';
import GlobalNavigation from '../common/GlobalNavigation';

const ServicePage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const [activeTab, setActiveTab] = useState('professionals');

  const professionalServices = [
    {
      title: 'キャリアコンサルティング',
      description: '国家資格キャリアコンサルタント、性格診断、キャリアプラン作成、ワークライフバランス支援。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: '有料職業紹介',
      description: 'ポジティブ採用、定性評価、1対1サポート、許可サービス。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: '資産承継サポート',
      description: '承継計画、後継者育成、法務連携、承継後継続支援。',
      icon: (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M4 12C8.41828 12 12 8.41828 12 4C12 8.41828 15.5817 12 20 12C15.5817 12 12 15.5817 12 20C12 15.5817 8.41828 12 4 12Z" strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"/>
        </svg>
      )
    },
    {
      title: 'M&A支援',
      description: '戦略、デューデリジェンス、評価、統合後サポート。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M6.75 18.25V4.75H13.5L17.25 8.5V18.25H6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const institutionServices = [
    {
      title: '経営コンサルティング',
      description: '組織構造、プロセス最適化、デジタル変革支援。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M12.5 18.25C16.2279 18.25 19.25 15.2279 19.25 11.5C19.25 7.77208 16.2279 4.75 12.5 4.75C8.77208 4.75 5.75 7.77208 5.75 11.5C5.75 12.6007 6.01345 13.6398 6.48072 14.5578L5 19L9.71819 17.6519C10.5664 18.0361 11.5082 18.25 12.5 18.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'キャリア診断',
      description: '性格診断、長期計画によるキャリア成長。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: '承継支援',
      description: '包括的計画、法務連携、継続的ガイダンス。',
      icon: (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M4 12C8.41828 12 12 8.41828 12 4C12 8.41828 15.5817 12 20 12C15.5817 12 12 15.5817 12 20C12 15.5817 8.41828 12 4 12Z" strokeWidth="1.5" strokeLinejoin="round" stroke="currentColor"/>
        </svg>
      )
    },
    {
      title: '採用支援',
      description: '効率的な採用、定性評価、個別採用サポート。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M6.75 18.25V4.75H13.5L17.25 8.5V18.25H6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
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

      {/* Hero Section - 参考HTMLの正確な構造 */}
      <header className="section is-inverse">
        <div className="container">
          <div className="grid_5-col tablet-1-col gap-small">
            <div className="position_relative">
              <img 
                width="736" 
                height="526" 
                alt="医療現場におけるサービスのイメージ" 
                src="/images/webflow/68799ba99e6bfee7c8b6b6d7_70399482-d4c9-4614-b982-c35684b953ab.avif" 
                loading="lazy" 
                className="image_cover mask_left"
              />
            </div>
            <div className="header margin-bottom_none">
              <h1 className="heading_h1">医療業界の包括的ソリューション</h1>
              <p className="subheading">医療従事者と医療機関の成長を、あらゆる段階でサポートします。</p>
              <div className="button-group">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onStartQuiz === 'function') {
                      onStartQuiz();
                    }
                  }}
                  className="button on-inverse"
                >
                  今すぐ始める
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onConsultation === 'function') {
                      onConsultation();
                    }
                  }}
                  className="button is-secondary on-inverse"
                >
                  詳しく見る
                </button>
              </div>
            </div>
            <div className="grid_4-col gap-small">
              <div>
                <h3>2.5K+</h3>
                <div className="paragraph_small">支援した専門職</div>
                <div className="paragraph_small text-color_secondary">新しい職場にマッチした専門家</div>
              </div>
              <div>
                <h3>1.2K+</h3>
                <div className="paragraph_small">支援した医療機関</div>
                <div className="paragraph_small text-color_secondary">パートナー病院・クリニック</div>
              </div>
              <div>
                <h3>98%</h3>
                <div className="paragraph_small">顧客満足度</div>
                <div className="paragraph_small text-color_secondary">ポジティブなサービス評価</div>
              </div>
              <div>
                <h3>15+</h3>
                <div className="paragraph_small">年の実績</div>
                <div className="paragraph_small text-color_secondary">実証済みの医療専門知識</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Our Offerings Section - Webflowタブシステムの正確な再現 */}
      <section className="section">
        <div className="container">
          <div className="header is-2-col">
            <h2>私たちのサービス</h2>
            <p>医療領域に特化した専門サービス。</p>
          </div>
          
          <div className="margin-top_large w-tabs" data-easing="ease" data-current={activeTab === 'professionals' ? 'Tab 1' : 'Tab 2'} data-duration-out="100" data-duration-in="300">
            <div className="flex_horizontal is-y-center gap-xxsmall margin-bottom_xsmall w-tab-menu" role="tablist">
              <a 
                className={`tab_menu-button w-tab-link ${activeTab === 'professionals' ? 'w--current' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('professionals');
                }}
                href="#"
                role="tab"
                aria-selected={activeTab === 'professionals'}
              >
                <div>医療従事者向け</div>
              </a>
              <a 
                className={`tab_menu-button w-tab-link ${activeTab === 'institutions' ? 'w--current' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('institutions');
                }}
                href="#"
                role="tab"
                aria-selected={activeTab === 'institutions'}
              >
                <div>医療機関向け</div>
              </a>
            </div>
            
            <div className="tabs_content w-tab-content">
              <div className={`w-tab-pane ${activeTab === 'professionals' ? 'w--tab-active' : ''}`} role="tabpanel">
                <div className="grid_4-col">
                  {professionalServices.map((service, index) => (
                    <a key={index} href="#" className="card-link w-inline-block">
                      <div className="card_body_small">
                        <div className="icon margin-bottom_xsmall">
                          {service.icon}
                        </div>
                        <h3 className="heading_h4">{service.title}</h3>
                        <p className="paragraph_small margin-bottom_none">{service.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className={`w-tab-pane ${activeTab === 'institutions' ? 'w--tab-active' : ''}`} role="tabpanel">
                <div className="grid_4-col">
                  {institutionServices.map((service, index) => (
                    <a key={index} href="#" className="card-link w-inline-block">
                      <div className="card_body_small">
                        <div className="icon margin-bottom_xsmall">
                          {service.icon}
                        </div>
                        <h3 className="heading_h4">{service.title}</h3>
                        <p className="paragraph_small margin-bottom_none">{service.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - 参考HTMLの正確な構造 */}
      <section className="section is-secondary">
        <div className="container">
          <div className="grid_3-col tablet-1-col gap-small">
            <h2 className="heading_huge margin-bottom_none">これらのサービスについてお問い合わせください</h2>
            <div>
              <p className="subheading">専門チームと直接お話しください。</p>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onConsultation === 'function') {
                    onConsultation();
                  }
                }}
                className="button"
              >
                相談を予約する
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 参考HTMLの正確な構造 */}
      <footer className="footer">
        <div className="container">
          <div className="footer_bottom-3-col">
            <div className="flex_horizontal tablet-vertical">
              <a href="#" className="logo w-inline-block">
                <div className="nav_logo-icon">
                  <svg width="100%" height="100%" viewBox="0 0 33 33" preserveAspectRatio="xMidYMid meet">
                    <path d="M28,0H5C2.24,0,0,2.24,0,5v23c0,2.76,2.24,5,5,5h23c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5ZM29,17c-6.63,0-12,5.37-12,12h-1c0-6.63-5.37-12-12-12v-1c6.63,0,12-5.37,12-12h1c0,6.63,5.37,12,12,12v1Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="paragraph_xlarge margin-bottom_none text_all-caps">MediMatch</div>
              </a>
            </div>
            <ul role="list" className="button-group margin_none text-align_center gap-small w-list-unstyled">
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>ホーム</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>サービス</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>事例</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>サポート</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>お問い合わせ</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>コラム</div></a></li>
              <li className="margin-bottom_none"><a href="#" className="footer_link w-inline-block"><div>概要</div></a></li>
            </ul>
            <ul aria-label="Social media links" role="list" className="footer_icon-group w-list-unstyled">
              <li className="margin-bottom_none">
                <a href="#" className="footer_icon-link w-inline-block">
                  <div className="icon_small-1x1 text-color_inherit">
                    <svg width="100%" height="100%" viewBox="0 0 16 16">
                      <path d="M16,8.048a8,8,0,1,0-9.25,7.9V10.36H4.719V8.048H6.75V6.285A2.822,2.822,0,0,1,9.771,3.173a12.2,12.2,0,0,1,1.791.156V5.3H10.554a1.155,1.155,0,0,0-1.3,1.25v1.5h2.219l-.355,2.312H9.25v5.591A8,8,0,0,0,16,8.048Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="screen-reader">Facebook</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;