import React from 'react';

const GlobalNavigation = ({ 
  onReturnHome, 
  onNavigateToPage, 
  onConsultation, 
  onStartQuiz, 
  activeRoute = '' 
}) => {
  return (
    <div className="nav is-accent-primary">
      <div className="nav_container w-nav">
        <div className="nav_left">
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (typeof onReturnHome === 'function') {
                onReturnHome();
              }
            }}
            className="nav_logo w-inline-block"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div className="nav_logo-icon">
              <svg width="100%" height="100%" viewBox="0 0 33 33" preserveAspectRatio="xMidYMid meet">
                <path d="M28,0H5C2.24,0,0,2.24,0,5v23c0,2.76,2.24,5,5,5h23c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5ZM29,17c-6.63,0-12,5.37-12,12h-1c0-6.63-5.37-12-12-12v-1c6.63,0,12-5.37,12-12h1c0,6.63,5.37,12,12,12v1Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="paragraph_large margin-bottom_none">MediMatch</div>
          </button>
        </div>
        <div className="nav_center">
          <nav role="navigation" className="nav_menu w-nav-menu">
            <ul role="list" className="nav_menu-list w-list-unstyled">
              <li className="nav_menu-list-item">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onNavigateToPage === 'function') {
                      onNavigateToPage('/diagnostic-tool');
                    }
                  }}
                  className="nav_link on-accent-primary w-inline-block"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    opacity: 1,
                    fontWeight: activeRoute === '/diagnostic-tool' ? '600' : '400'
                  }}
                >
                  <div>診断ツール</div>
                </button>
              </li>
              <li className="nav_menu-list-item">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onNavigateToPage === 'function') {
                      onNavigateToPage('/services');
                    }
                  }}
                  className="nav_link on-accent-primary w-inline-block"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    opacity: 1,
                    fontWeight: activeRoute === '/services' ? '600' : '400'
                  }}
                >
                  <div>サービス</div>
                </button>
              </li>
              <li className="nav_menu-list-item">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onNavigateToPage === 'function') {
                      onNavigateToPage('/columns');
                    }
                  }}
                  className="nav_link on-accent-primary w-inline-block"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    opacity: 1,
                    fontWeight: activeRoute === '/columns' ? '600' : '400'
                  }}
                >
                  <div>コラム</div>
                </button>
              </li>
              <li className="nav_menu-list-item">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onNavigateToPage === 'function') {
                      onNavigateToPage('/voices');
                    }
                  }}
                  className="nav_link on-accent-primary w-inline-block"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    opacity: 1,
                    fontWeight: activeRoute === '/voices' ? '600' : '400'
                  }}
                >
                  <div>先輩の声</div>
                </button>
              </li>
              <li className="nav_menu-list-item">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onNavigateToPage === 'function') {
                      onNavigateToPage('/support');
                    }
                  }}
                  className="nav_link on-accent-primary w-inline-block"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    opacity: 1,
                    fontWeight: activeRoute === '/support' ? '600' : '400'
                  }}
                >
                  <div>サポート</div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="nav_right">
          <div className="button-group margin-top_none">
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
                border: '2px solid #2d5a2a',
                marginRight: '10px'
              }}
            >
              <div className="button_label">相談する</div>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onStartQuiz === 'function') {
                  onStartQuiz();
                }
              }}
              className="button on-accent-primary"
            >
              <div className="button_label">無料診断</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavigation;