
// 改善されたProfessionSelect.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfessionSelect = ({ onSelect }) => {
  const [selectedProfession, setSelectedProfession] = useState('');

  // Professions data with paths to icons
  const professions = [
    {
      id: 'nurse',
      label: '看護師',
      imagePath: '/images/icons/profession_nurse.png'
    },
    {
      id: 'pharmacist',
      label: '薬剤師',
      imagePath: '/images/icons/profession_pharmacist.png'
    },
    {
      id: 'therapist',
      label: 'リハビリ系',
      imagePath: '/images/icons/profession_therapist.png'
    },
    {
      id: 'other',
      label: 'その他医療職',
      imagePath: '/images/icons/profession_other.png'
    }
  ];

  // 職種選択時に自動的に次へ進む処理
  const handleSelect = (id) => {
    setSelectedProfession(id);
    
    // 選択後、少し遅延させてから次へ進む（選択したことが視覚的に分かるように）
    setTimeout(() => {
      if (typeof onSelect === 'function') {
        onSelect(id);
      }
    }, 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  // カードアニメーション - キラッとするエフェクトを削除
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25
      }
    }
  };

  return (
    <div className="profession-select-container" style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 0 20px',
      backgroundImage: `url('/images/patterns/medical_pattern_light.png')`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundColor: '#65A9E5',
      fontFamily: "'Inter', 'Noto Sans JP', sans-serif"
    }}>
      <div className="profession-select-content" style={{
        maxWidth: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        padding: '30px 20px',
        marginTop: '40px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
          color: '#1A6CBF',
          marginBottom: '30px'
        }}>
          あなたの職種を選択してください
        </h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="professions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '20px',
            maxWidth: '960px',
            margin: '0 auto'
          }}
        >
          {professions.map((profession) => (
            <motion.div
              key={profession.id}
              variants={itemVariants}
              whileHover={{ 
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
                borderColor: selectedProfession === profession.id ? '#1A6CBF' : '#4299E1',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(profession.id)}
              style={{
                backgroundColor: selectedProfession === profession.id 
                  ? 'rgba(26, 108, 191, 0.08)' 
                  : 'white',
                borderRadius: '16px',
                padding: '20px 15px',
                cursor: 'pointer',
                border: `2px solid ${selectedProfession === profession.id ? '#1A6CBF' : '#E5E7EB'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease, transform 0.2s ease',
                aspectRatio: '1/1',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="profession-icon-container" style={{
                width: '80px',
                height: '80px',
                marginBottom: '12px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: selectedProfession === profession.id 
                  ? 'rgba(26, 108, 191, 0.1)' 
                  : 'rgba(242, 247, 255, 0.7)',
                borderRadius: '50%',
                padding: '10px',
                transition: 'background-color 0.3s ease'
              }}>
                {/* シンプルなフェードインに変更 */}
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  src={profession.imagePath}
                  alt={profession.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '5px'
                  }}
                />
                {selectedProfession === profession.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      right: '-10px',
                      backgroundColor: '#1A6CBF',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </motion.div>
                )}
              </div>
              
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: selectedProfession === profession.id ? '#1A6CBF' : '#1F2937',
                textAlign: 'center',
                margin: 0,
                position: 'relative'
              }}>
                {profession.label}
              </h3>
              
              {/* 選択状態の視覚的フィードバック強化 */}
              {selectedProfession === profession.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: '14px',
                    color: '#1A6CBF',
                    fontWeight: '600',
                    marginTop: '8px'
                  }}
                >
                  選択中
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* PC/モバイル対応のレスポンシブスタイル改善 */}
      <style jsx="true">{`
        /* PC版のスタイル調整 - 4列グリッドに最適化 */
        @media (min-width: 768px) {
          .professions-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 20px !important;
            max-width: 860px !important; /* より適切なサイズに調整 */
            margin: 0 auto !important;
          }
          
          .profession-select-content {
            padding: 40px 30px !important;
            width: 80% !important; /* 適切な幅に調整 */
            max-width: 980px !important; /* 最適な最大幅 */
            margin: 80px auto 0 !important; /* 上部余白を増加 */
            border-radius: 32px !important;
          }
          
          /* 各職種カードのバランスを整える */
          .professions-grid > div {
            padding: 25px 15px !important;
            min-height: auto !important; /* アスペクト比で調整 */
            aspect-ratio: 1/1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
            transform: translateZ(0) !important; /* 3D効果を軽減 */
          }
          
          .profession-icon-container {
            width: 90px !important; /* アイコンサイズを若干拡大 */
            height: 90px !important;
            margin-bottom: 16px !important;
            transition: transform 0.3s ease !important;
          }
          
          .professions-grid > div:hover .profession-icon-container {
            transform: translateY(-5px) !important;
          }
          
          .professions-grid > div h3 {
            font-size: 20px !important;
            margin-top: 8px !important;
            transition: color 0.3s ease !important;
          }
          
          .professions-grid > div:hover h3 {
            color: #1A6CBF !important;
          }
        }
        
        /* タブレット表示 */
        @media (min-width: 481px) and (max-width: 767px) {
          .profession-select-content {
            margin-top: 60px !important; /* タブレットでも上部に余白 */
            width: 90% !important;
          }
          
          .professions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        
        /* スマホ表示 */
        @media (max-width: 480px) {
          .profession-select-container {
            padding-top: 20px !important; /* 上部パディングを調整 */
            align-items: flex-start !important; /* 上寄せに固定 */
          }
          
          .profession-select-content {
            margin-top: 20px !important; /* スマホでは上部余白を少なめに */
            padding: 25px 15px !important;
            border-radius: 20px !important;
            width: 92% !important;
          }
          
          .profession-icon-container {
            width: 70px !important;
            height: 70px !important;
          }
          
          h3 {
            font-size: 16px !important;
          }
          
          h2 {
            font-size: 24px !important;
            margin-bottom: 20px !important;
          }
          
          .professions-grid > div {
            padding: 15px !important;
          }
        }
        
        /* iOS向けの特別対応 */
        @supports (-webkit-touch-callout: none) {
          .profession-select-container {
            padding-top: 30px !important; /* iOSでは上部にさらに余白 */
          }
          
          .profession-select-content {
            -webkit-backdrop-filter: blur(10px) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfessionSelect;