import React from 'react';
import { motion } from 'framer-motion';

// アイコンコンポーネント (変更なし)
const Icon = ({ type }) => {
  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    color: '#675032',
    marginRight: '16px'
  };

  // アイコンタイプに基づいて適切なSVGを返す
  switch (type) {
    case 'user':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      );
    case 'lightbulb':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
          </svg>
        </div>
      );
    case 'heart':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </div>
      );
    case 'chart':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21H3"></path>
            <path d="M3 7h4v14H3z"></path>
            <path d="M10 11h4v10h-4z"></path>
            <path d="M17 3h4v18h-4z"></path>
          </svg>
        </div>
      );
    case 'users':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
      );
    case 'building':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
            <path d="M9 22v-4h6v4"></path>
            <path d="M8 6h.01"></path>
            <path d="M16 6h.01"></path>
            <path d="M12 6h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 10h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M8 14h.01"></path>
          </svg>
        </div>
      );
    case 'star':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      );
    case 'quote':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
      );
    case 'hospital':
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v2"></path>
            <path d="M16 3v2"></path>
            <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"></path>
            <path d="M16 16h6"></path>
            <path d="M19 13v6"></path>
          </svg>
        </div>
      );
    default:
      return (
        <div style={iconStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      );
  }
};

// セクションコンポーネント - Webflowテイスト
const Section = ({ title, icon, children, color = '#675032' }) => (
  <div 
    className="card"
    style={{
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      padding: 'var(--spacing-xl)',
      marginBottom: 'var(--spacing-lg)',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--neutral-200)',
      wordBreak: 'break-word'
    }}
  >
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: 'var(--spacing-md)',
      borderBottom: `2px solid ${color}`,
      paddingBottom: 'var(--spacing-sm)',
      flexWrap: 'wrap'
    }}>
      <Icon type={icon} />
      <h3 
        className="heading_h4"
        style={{ 
          margin: 0,
          color: '#675032',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'calc(100% - 40px)'
        }}
      >
        {title}
      </h3>
    </div>
    <div style={{ 
      color: '#675032', 
      lineHeight: '1.6',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  </div>
);

// アイテムリストコンポーネント - モバイル対応改善版
const ItemList = ({ items, isPositive = true }) => {
  if (!items || !Array.isArray(items) || items.length === 0) return null;
  
  return (
    <div className="item-list-grid" style={{ 
      marginTop: '16px',
      marginBottom: '16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '12px'
    }}>
      {items.map((item, i) => (
        <div 
          key={i} 
          style={{ 
            padding: '14px 16px',
            backgroundColor: isPositive ? 'rgba(239, 246, 255, 0.7)' : 'rgba(254, 242, 242, 0.7)',
            borderRadius: '10px',
            borderLeft: `4px solid ${isPositive ? '#1A6CBF' : '#DC2626'}`,
            marginBottom: '4px',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <div style={{
              color: isPositive ? '#1A6CBF' : '#DC2626',
              marginTop: '2px',
              flexShrink: 0
            }}>
              {isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </div>
            <p style={{ 
              margin: 0,
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#374151',
              flex: 1,
              wordBreak: 'break-word'
            }}>
              {typeof item === 'string' ? item : item.description || item.title || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// アクションアイテムのリスト - モバイル対応改善版
const ActionList = ({ actions }) => {
  if (!actions || !Array.isArray(actions) || actions.length === 0) return null;
  
  return (
    <div className="action-grid" style={{ 
      marginTop: '16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px'
    }}>
      {actions.map((action, i) => (
        <div 
          key={i} 
          style={{ 
            marginBottom: '16px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB',
            display: 'flex',
            gap: '16px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#1A6CBF',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '16px',
            flexShrink: 0
          }}>
            {i + 1}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <h4 style={{ 
              margin: '0 0 8px 0',
              fontSize: '17px',
              fontWeight: '600',
              color: '#1E3A8A',
              wordBreak: 'break-word'
            }}>
              {action.title || `アクション ${i+1}`}
            </h4>
            <p style={{ 
              margin: 0,
              fontSize: '15px',
              color: '#675032',
              lineHeight: '1.6',
              wordBreak: 'break-word'
            }}>
              {action.description || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// リソースのリスト - モバイル対応改善版
const ResourceList = ({ resources }) => {
  if (!resources || !Array.isArray(resources) || resources.length === 0) return null;
  
  return (
    <div className="resource-grid" style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
      marginTop: '16px'
    }}>
      {resources.map((resource, i) => (
        <div 
          key={i} 
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #E5E7EB',
            borderLeft: '4px solid #1A6CBF',
            wordBreak: 'break-word'
          }}
        >
          <h4 style={{ 
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1E3A8A'
          }}>
            {resource.title || `リソース ${i+1}`}
          </h4>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            color: '#675032',
            lineHeight: '1.6'
          }}>
            {resource.description || ''}
          </p>
        </div>
      ))}
    </div>
  );
};

// 補完的タイプのリスト - モバイル対応改善版
const ComplementaryTypesList = ({ types }) => {
  if (!types || !Array.isArray(types) || types.length === 0) return null;
  
  return (
    <div className="complementary-types-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '16px',
      marginTop: '16px' 
    }}>
      {types.map((type, i) => (
        <div 
          key={i} 
          style={{ 
            backgroundColor: '#F9FAFB', 
            borderRadius: '12px', 
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB',
            wordBreak: 'break-word'
          }}
        >
          <h5 style={{ 
            color: '#1E3A8A', 
            fontWeight: '600', 
            fontSize: '16px',
            marginBottom: '8px',
            marginTop: 0
          }}>
            {type.title || `タイプ ${i+1}`}
          </h5>
          <p style={{ 
            fontSize: '14px', 
            color: '#675032',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {type.description || ''}
          </p>
        </div>
      ))}
    </div>
  );
};

// 引用コンポーネント - モバイル対応改善版
const Quote = ({ quote }) => {
  if (!quote) return null;
  
  return (
    <div style={{
      backgroundColor: '#F7FAFC',
      padding: '24px',
      borderRadius: '12px',
      textAlign: 'center',
      margin: '16px 0',
      border: '1px solid #E2E8F0',
      overflowWrap: 'break-word'
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.6 }}>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
      <p style={{
        fontSize: '18px',
        fontStyle: 'italic',
        color: '#675032',
        marginBottom: '12px',
        lineHeight: '1.6',
        wordBreak: 'break-word'
      }}>{quote.text || '引用がありません'}</p>
      <p style={{
        fontSize: '15px',
        color: '#4A5568',
        fontWeight: '600',
        margin: 0
      }}>— {quote.author || '著者不明'}</p>
    </div>
  );
};

// メイン結果サマリーコンポーネント - モバイル対応改善版
const ResultSummary = ({ result, tab = 'summary', profession = '' }) => {
  // 結果がnullの場合のフォールバック処理を追加
  if (!result) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>
        <p>診断結果が見つかりませんでした。診断を再度行ってください。</p>
      </div>
    );
  }

  // 職種ごとの表示をカスタマイズするためのデータ
  const getProfessionInfo = () => {
    switch (profession) {
      case '看護師':
        return {
          label: '看護師',
          suffix: '向け',
          icon: 'nurse',
          color: '#3182CE'
        };
      case '薬剤師':
        return {
          label: '薬剤師',
          suffix: '向け',
          icon: 'pharmacist',
          color: '#38A169'
        };
      case 'リハビリ系':
        return {
          label: 'リハビリ職',
          suffix: '向け',
          icon: 'therapist',
          color: '#DD6B20'
        };
      case 'その他医療職':
        return {
          label: '医療職',
          suffix: '向け',
          icon: 'medical',
          color: '#805AD5'
        };
      default:
        return {
          label: '医療職',
          suffix: '向け',
          icon: 'medical',
          color: '#1A6CBF'
        };
    }
  };

  const professionInfo = getProfessionInfo();
  
  // カードアニメーション設定
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // 安全なプロパティアクセスのためのヘルパー関数
  const safeGetArray = (obj, path) => {
    if (!obj) return [];
    if (!path) return [];
    
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
      if (value === null || value === undefined) return [];
      value = value[key];
    }
    
    return Array.isArray(value) ? value : [];
  };
  
  const safeGetString = (obj, path, defaultValue = '') => {
    if (!obj) return defaultValue;
    if (!path) return defaultValue;
    
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
      if (value === null || value === undefined) return defaultValue;
      value = value[key];
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };

  const safeGetObject = (obj, path) => {
    if (!obj) return null;
    if (!path) return null;
    
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
      if (value === null || value === undefined) return null;
      value = value[key];
    }
    
    return value;
  };

  switch (tab) {
    case 'summary':
      return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Section title={`あなたの特性（${professionInfo.label}${professionInfo.suffix}）`} icon="user" color={professionInfo.color}>
            <p style={{ 
              fontSize: '16px', 
              marginBottom: '20px',
              lineHeight: '1.7',
              wordBreak: 'break-word'
            }}>{safeGetString(result, 'description', '診断の説明が見つかりませんでした。')}</p>
            <ItemList items={safeGetArray(result, 'characteristics')} />
          </Section>
          
          {result.strengths && (
            <Section title="あなたの強み" icon="lightbulb" color={professionInfo.color}>
              <ItemList items={safeGetArray(result, 'strengths')} />
            </Section>
          )}
          
          {result.coreNursingView && (
            <Section title={`医療観（${professionInfo.label}視点）`} icon="quote" color={professionInfo.color}>
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '20px',
                borderRadius: '12px',
                fontStyle: 'italic',
                color: '#675032',
                position: 'relative',
                marginTop: '12px',
                wordBreak: 'break-word'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '20px',
                  fontSize: '40px',
                  color: '#675032',
                  opacity: 0.3,
                  fontFamily: 'Georgia, serif'
                }}>"</div>
                <p style={{ position: 'relative', zIndex: 1 }}>{safeGetString(result, 'coreNursingView')}</p>
              </div>
            </Section>
          )}
          
          {(result.practicalScenes || result.challengingScenes) && (
            <Section title="実践シーン分析" icon="hospital" color={professionInfo.color}>
              {result.practicalScenes && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#15803D', 
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                    </svg>
                    輝くシーン
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(240, 253, 244, 0.8)',
                    borderRadius: '10px',
                    padding: '16px',
                    borderLeft: '4px solid #15803D',
                    wordBreak: 'break-word'
                  }}>
                    <p style={{ margin: 0, color: '#374151' }}>{safeGetString(result, 'practicalScenes')}</p>
                  </div>
                </div>
              )}
              
              {result.challengingScenes && (
                <div>
                  <h4 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#B91C1C', 
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-9 11-9 11s-9-5-9-11a6.5 6.5 0 0 1 5-6.33"></path>
                      <path d="M12 7v1"></path>
                      <path d="M12 11v2"></path>
                    </svg>
                    注意が必要なシーン
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(254, 242, 242, 0.8)',
                    borderRadius: '10px',
                    padding: '16px',
                    borderLeft: '4px solid #B91C1C',
                    wordBreak: 'break-word'
                  }}>
                    <p style={{ margin: 0, color: '#374151' }}>{safeGetString(result, 'challengingScenes')}</p>
                  </div>
                </div>
              )}
            </Section>
          )}
        </motion.div>
      );

    case 'growth':
      return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          {result.careerPath && (
            <Section title={`キャリアパス（${professionInfo.label}${professionInfo.suffix}）`} icon="chart" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'careerPath')}</p>
            </Section>
          )}
          
          {result.growthHints && (
            <Section title="成長のヒント" icon="lightbulb" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'growthHints')}</p>
            </Section>
          )}
          
          {result.actions && (
            <Section title="具体的なアクション" icon="chart" color={professionInfo.color}>
              <p style={{ 
                marginBottom: '16px',
                lineHeight: '1.7'
              }}>あなたの強みを活かし、成長していくための具体的なステップです。</p>
              <ActionList actions={safeGetArray(result, 'actions')} />
            </Section>
          )}
          
          {result.resources && (
            <Section title="おすすめリソース" icon="lightbulb" color={professionInfo.color}>
              <p style={{ marginBottom: '16px' }}>あなたの成長をサポートする参考資料や機会です。</p>
              <ResourceList resources={safeGetArray(result, 'resources')} />
            </Section>
          )}
          
          {result.careerTrends && (
            <Section title="キャリアの最新動向" icon="chart" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'careerTrends')}</p>
            </Section>
          )}
        </motion.div>
      );
      
    case 'interpersonal':
      return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          {result.teamRole && (
            <Section title="チームでの役割" icon="users" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'teamRole')}</p>
            </Section>
          )}
          
          {result.complementaryTypes && (
            <Section title="相互補完的なタイプ" icon="users" color={professionInfo.color}>
              <p style={{ marginBottom: '16px' }}>あなたとの協働で相乗効果が期待できるタイプです。</p>
              <ComplementaryTypesList types={safeGetArray(result, 'complementaryTypes')} />
            </Section>
          )}
          
          {result.communicationTips && (
            <Section title="コミュニケーションのヒント" icon="users" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'communicationTips')}</p>
            </Section>
          )}
        </motion.div>
      );

    case 'environment':
      return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          {result.idealEnvironment && (
            <Section title="理想の職場環境" icon="building" color={professionInfo.color}>
              <div style={{
                backgroundColor: 'rgba(239, 246, 255, 0.8)',
                padding: '20px',
                borderRadius: '12px',
                marginTop: '10px',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                borderLeft: `4px solid ${professionInfo.color}`,
                wordBreak: 'break-word'
              }}>
                <p style={{ 
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#374151',
                  margin: 0
                }}>{safeGetString(result, 'idealEnvironment')}</p>
              </div>
            </Section>
          )}
          
          {result.idealTraits && (
            <Section title="あなたに合う職場の特徴" icon="lightbulb" color={professionInfo.color}>
              <p style={{ marginBottom: '16px' }}>あなたが活躍しやすい環境の特徴です。転職先を検討する際の参考にしてください。</p>
              <ItemList items={safeGetArray(result, 'idealTraits')} />
            </Section>
          )}
          
          {result.avoidTraits && (
            <Section title="避けた方が良い職場の特徴" icon="lightbulb" color={professionInfo.color}>
              <p style={{ marginBottom: '16px' }}>あなたにとって不向きな可能性がある環境の特徴です。転職先を検討する際に注意しましょう。</p>
              <ItemList items={safeGetArray(result, 'avoidTraits')} isPositive={false} />
            </Section>
          )}
        </motion.div>
      );
      
    case 'inspiration':
      return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          {result.nursingBeauty && (
            <Section title={`医療の美しさ（${safeGetString(result, 'type')}型視点）`} icon="heart" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.8',
                fontStyle: 'italic',
                color: '#675032',
                marginTop: '12px',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'nursingBeauty')}</p>
            </Section>
          )}
          
          {result.inspirationalQuote && (
            <Section title="インスピレーションの言葉" icon="star" color={professionInfo.color}>
              <Quote quote={safeGetObject(result, 'inspirationalQuote')} />
            </Section>
          )}
          
          {result.famousPerson && (
            <Section title="あなたのタイプに近い著名人" icon="user" color={professionInfo.color}>
              <p style={{ 
                fontSize: '16px', 
                padding: '16px',
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                margin: '12px 0',
                wordBreak: 'break-word'
              }}>{safeGetString(result, 'famousPerson')}</p>
            </Section>
          )}
        </motion.div>
      );

    default:
      return <p style={{ textAlign: 'center', color: '#6B7280' }}>このタブの内容は見つかりませんでした。</p>;
  }
};

// レスポンシブデザイン用のスタイル
const styles = `
  /* モバイル表示（480px以下）用のスタイル */
  @media (max-width: 480px) {
    .section-title {
      font-size: 18px !important;
      width: calc(100% - 40px) !important;
      white-space: normal !important;
    }
    
    .item-list-grid,
    .action-grid,
    .resource-grid,
    .complementary-types-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 8px !important;
    }
    
    .item-list-grid > div,
    .resource-grid > div,
    .complementary-types-grid > div {
      padding: 12px !important;
      font-size: 13px !important;
    }
    
    .item-list-grid p,
    .resource-grid p,
    .complementary-types-grid p {
      font-size: 13px !important;
      line-height: 1.4 !important;
    }
    
    .action-grid > div {
      flex-direction: column !important;
      align-items: flex-start !important;
      padding: 12px !important;
    }
    
    .action-grid h4 {
      font-size: 15px !important;
      margin-bottom: 6px !important;
    }
    
    .action-grid p {
      font-size: 13px !important;
      line-height: 1.4 !important;
    }
  }
  
  /* タブレット表示（481px〜768px）用のスタイル */
  @media (min-width: 481px) and (max-width: 768px) {
    .item-list-grid,
    .action-grid,
    .resource-grid,
    .complementary-types-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }
    
    .section-title {
      font-size: 19px !important;
    }
  }
`;

export default ResultSummary;

// スタイルをドキュメントに追加
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);