import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLightbulb,
  FaHospitalSymbol,
  FaChartLine,
  FaQuoteLeft,
  FaUser,
  FaUsers,
  FaBuilding,
  FaHeart,
  FaStar
} from 'react-icons/fa';

const ResultSummary = ({ result, tab = 'summary', userInfo = {} }) => {
  if (!result) return <p className="text-center text-gray-600">診断結果が見つかりませんでした。</p>;

  const Section = ({ title, icon, children }) => (
    <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-6 mb-8 border border-blue-100">
      <div className="flex items-center mb-4 text-blue-700">
        <span className="mr-3 text-xl">{icon}</span>
        <h3 className="text-xl font-semibold border-l-4 border-blue-300 pl-3">{title}</h3>
      </div>
      <div className="text-gray-800 leading-relaxed space-y-4 text-sm">{children}</div>
    </div>
  );
  
  const renderList = (items, isPositive = true) => {
    if (!items || !Array.isArray(items)) return null;
    return (
      <div style={{ 
        marginTop: '16px',
        marginBottom: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px'
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ 
            padding: '14px 16px',
            backgroundColor: isPositive ? 'rgba(237, 246, 255, 0.7)' : 'rgba(254, 242, 242, 0.7)',
            borderRadius: '10px',
            borderLeft: `4px solid ${isPositive ? '#1A6CBF' : '#DC2626'}`,
            marginBottom: '4px',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            <p style={{ 
              margin: 0,
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#374151',
              position: 'relative',
              paddingLeft: isPositive ? '0' : '0'
            }}>
              {typeof item === 'string' ? item : item.description || item.title}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  const renderHospitals = (hospitals) => {
    if (!hospitals || !Array.isArray(hospitals)) return null;
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        marginTop: '20px' 
      }}>
        {hospitals.map((h, i) => (
          <div key={i} style={{ 
            backgroundColor: 'white', 
            borderRadius: '14px', 
            padding: '0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            <div style={{
              borderBottom: '1px solid #E5E7EB',
              padding: '16px 20px',
              backgroundColor: '#F9FAFB',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: h.matchPercentage >= 90 ? '#059669' : '#1A6CBF',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '20px',
              }}>
                適合度 {h.matchPercentage}%
              </div>
              
              <h4 style={{ 
                color: '#111827', 
                fontWeight: '700', 
                fontSize: '18px',
                marginBottom: '6px',
                paddingRight: '80px' // 適合度表示のスペース確保
              }}>
                {h.name}
              </h4>
              
              <div style={{ 
                color: '#6B7280', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  backgroundColor: '#EFF6FF',
                  color: '#1E40AF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>{h.type}</span>
                <span>{h.location}</span>
              </div>
            </div>
            
            {h.reason && (
              <div style={{ padding: '16px 20px' }}>
                <p style={{ 
                  fontSize: '15px', 
                  color: '#4B5563',
                  margin: 0,
                  lineHeight: '1.6'
                }}>{h.reason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderActions = (actions) => {
    if (!actions || !Array.isArray(actions)) return null;
    return (
      <ol className="space-y-4">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold mr-3">
              {i + 1}
            </div>
            <div>
              <h5 className="font-semibold text-gray-800">{action.title}</h5>
              <p className="text-sm text-gray-700">{action.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  const renderResources = (resources) => {
    if (!resources || !Array.isArray(resources)) return null;
    return (
      <ul className="space-y-2">
        {resources.map((r, i) => (
          <li key={i}>
            <p className="font-medium text-gray-800">{r.title}</p>
            <p className="text-sm text-gray-700">{r.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  const renderComplementaryTypes = (types) => {
    if (!types || !Array.isArray(types)) return null;
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        marginTop: '16px' 
      }}>
        {types.map((type, i) => (
          <div key={i} style={{ 
            backgroundColor: '#F9FAFB', 
            borderRadius: '12px', 
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <h5 style={{ 
              color: '#1E3A8A', 
              fontWeight: '600', 
              fontSize: '16px',
              marginBottom: '8px'
            }}>
              {type.title}
            </h5>
            <p style={{ 
              fontSize: '14px', 
              color: '#4B5563',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {type.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  switch (tab) {
    case 'summary':
      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Section title="あなたの特性" icon={<FaUser />}>
            <p>{result.description}</p>
            {renderList(result.characteristics)}
          </Section>
          {result.strengths && (
            <Section title="あなたの強み" icon={<FaLightbulb />}>
              {renderList(result.strengths)}
            </Section>
          )}
          {result.coreNursingView && (
            <Section title="あなたの看護観" icon={<FaQuoteLeft />}>
              <p className="italic text-sm text-gray-600">{result.coreNursingView}</p>
            </Section>
          )}
          {result.practicalScenes && (
            <Section title="実践で輝くシーン" icon={<FaLightbulb />}>
              <p>{result.practicalScenes}</p>
            </Section>
          )}
          {result.challengingScenes && (
            <Section title="挑戦となりうるシーン" icon={<FaLightbulb />}>
              <p>{result.challengingScenes}</p>
            </Section>
          )}
        </motion.div>
      );

    case 'growth':
      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {result.careerPath && (
            <Section title="キャリアパス" icon={<FaChartLine />}>
              <p>{result.careerPath}</p>
            </Section>
          )}
          {result.growthHints && (
            <Section title="成長のヒント" icon={<FaLightbulb />}>
              <p>{result.growthHints}</p>
            </Section>
          )}
          {result.actions && (
            <Section title="具体的なアクション" icon={<FaChartLine />}>
              {renderActions(result.actions)}
            </Section>
          )}
          {result.resources && (
            <Section title="おすすめリソース" icon={<FaLightbulb />}>
              {renderResources(result.resources)}
            </Section>
          )}
          {result.careerTrends && (
            <Section title="キャリアの最新動向" icon={<FaChartLine />}>
              <p>{result.careerTrends}</p>
            </Section>
          )}
        </motion.div>
      );
      
    case 'interpersonal':
      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {result.teamRole && (
            <Section title="チームでの役割" icon={<FaUsers />}>
              <p>{result.teamRole}</p>
            </Section>
          )}
          {result.complementaryTypes && (
            <Section title="相互補完的なタイプ" icon={<FaUsers />}>
              <p>あなたとの協働で相乗効果が期待できるタイプです。</p>
              {renderComplementaryTypes(result.complementaryTypes)}
            </Section>
          )}
          {result.communicationTips && (
            <Section title="コミュニケーションのヒント" icon={<FaUsers />}>
              <p>{result.communicationTips}</p>
            </Section>
          )}
        </motion.div>
      );

    case 'environment':
      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {result.idealEnvironment && (
            <Section title="理想の職場環境" icon={<FaBuilding />}>
              <div style={{
                backgroundColor: 'rgba(237, 246, 255, 0.7)',
                padding: '20px 24px',
                borderRadius: '12px',
                marginTop: '10px',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                borderLeft: '4px solid #1A6CBF'
              }}>
                <p style={{ 
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#374151',
                  margin: 0
                }}>{result.idealEnvironment}</p>
              </div>
            </Section>
          )}
          {result.idealTraits && (
            <Section title="あなたに合う職場の特徴" icon={<FaLightbulb />}>
              {renderList(result.idealTraits)}
            </Section>
          )}
          {result.avoidTraits && (
            <Section title="避けた方が良い職場の特徴" icon={<FaLightbulb />}>
              {renderList(result.avoidTraits, false)}
            </Section>
          )}
          {/* 医療機関おすすめを一時的に非表示
          {result.recommendedHospitals && (
            <Section title="おすすめの医療機関" icon={<FaHospitalSymbol />}>
              {renderHospitals(result.recommendedHospitals)}
            </Section>
          )} */}
        </motion.div>
      );
      
    case 'inspiration':
      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {result.nursingBeauty && (
            <Section title="看護の美しさ" icon={<FaHeart />}>
              <p className="text-base italic leading-relaxed text-gray-700">{result.nursingBeauty}</p>
            </Section>
          )}
          {result.inspirationalQuote && (
            <Section title="インスピレーションの言葉" icon={<FaStar />}>
              <div style={{
                backgroundColor: '#F7FAFC',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center',
                margin: '12px 0'
              }}>
                <p style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: '#1A6CBF',
                  marginBottom: '12px',
                  lineHeight: '1.6'
                }}>"{result.inspirationalQuote.text}"</p>
                <p style={{
                  fontSize: '14px',
                  color: '#4A5568',
                  fontWeight: '600'
                }}>— {result.inspirationalQuote.author}</p>
              </div>
            </Section>
          )}
        </motion.div>
      );

    default:
      return <p className="text-center text-gray-600">このタブの内容は見つかりませんでした。</p>;
  }
};

export default ResultSummary;