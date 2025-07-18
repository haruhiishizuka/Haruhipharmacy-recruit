import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { trackProfessionSelect } from '../../utils/analytics';
import GlobalNavigation from '../common/GlobalNavigation';

const ProfessionSelect = ({ onSelect, onReturnHome, onNavigateToPage, onConsultation }) => {
  const [selectedProfession, setSelectedProfession] = useState('');

  // Professions data with paths to icons
  const professions = [
    {
      id: 'nurse',
      label: '看護師',
      imagePath: '/images/icons/profession_nurse.png',
      description: '患者さんに最も近い存在として、\n医療チームの中核を担う'
    },
    {
      id: 'pharmacist',
      label: '薬剤師',
      imagePath: '/images/icons/profession_pharmacist.png',
      description: '薬物療法の専門家として、\n安全で効果的な医療を支える'
    },
    {
      id: 'therapist',
      label: 'リハビリ系',
      imagePath: '/images/icons/profession_therapist.png',
      description: 'PT・OT・ST等、\n患者さんの回復と自立を支援'
    },
    {
      id: 'other',
      label: 'その他医療職',
      imagePath: '/images/icons/profession_other.png',
      description: '臨床検査技師・放射線技師等、\n多様な医療専門職'
    }
  ];

  // 職種選択時に自動的に次へ進む処理
  const handleSelect = (id) => {
    setSelectedProfession(id);
    trackProfessionSelect(id);
    
    // 選択後、少し遅延させてから次へ進む
    setTimeout(() => {
      if (typeof onSelect === 'function') {
        onSelect(id);
      }
    }, 300);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={() => {}}
        activeRoute="/profession"
      />

      {/* Main Content */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">診断ステップ 1</div>
            <h1 className="heading_h2">あなたの職種を教えてください</h1>
            <p className="subheading">職種に応じた診断を行い、より精度の高い結果をお届けします</p>
          </div>

          <motion.div 
            className="grid_2-col gap-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {professions.map((profession, index) => (
              <motion.button
                key={profession.id}
                onClick={() => handleSelect(profession.id)}
                className={`card profession-card ${selectedProfession === profession.id ? 'selected' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: selectedProfession === profession.id 
                    ? '2px solid #2d5a2a' 
                    : '2px solid var(--neutral-300)',
                  backgroundColor: selectedProfession === profession.id 
                    ? '#2d5a2a' 
                    : 'var(--neutral-primary)',
                  color: selectedProfession === profession.id 
                    ? '#ffffff' 
                    : '#2d5a2a',
                  transition: 'all var(--transition-base)',
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-large)'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgb(0 0 0 / 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-large)',
                  backgroundColor: selectedProfession === profession.id 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : '#d5e6d3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  <img
                    src={profession.imagePath}
                    alt={profession.label}
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      filter: selectedProfession === profession.id 
                        ? 'brightness(0) invert(1)' 
                        : 'brightness(0.4)'
                    }}
                  />
                </div>
                
                <div>
                  <h3 className="heading_h4" style={{
                    marginBottom: 'var(--spacing-xs)',
                    color: selectedProfession === profession.id 
                      ? '#ffffff' 
                      : '#2d5a2a'
                  }}>
                    {profession.label}
                  </h3>
                  <p className="paragraph_small" style={{
                    color: selectedProfession === profession.id 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : '#2d5a2a',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.4',
                    opacity: selectedProfession === profession.id ? 0.9 : 0.7
                  }}>
                    {profession.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="flex_horizontal gap-small is-align-center"
            style={{ 
              justifyContent: 'center', 
              marginTop: 'var(--spacing-xl)' 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: '#2d5a2a'
            }}></div>
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'var(--neutral-300)'
            }}></div>
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'var(--neutral-300)'
            }}></div>
          </motion.div>

          <motion.div
            className="text-align_center"
            style={{ marginTop: 'var(--spacing-md)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="paragraph_small" style={{ color: '#2d5a2a' }}>
              ステップ 1 / 3
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionSelect;