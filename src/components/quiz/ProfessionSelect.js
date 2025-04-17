import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfessionSelect = ({ onSelect }) => {
  const [selectedProfession, setSelectedProfession] = useState('');

  // Professions data with paths to new 3D icons
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
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="profession-select-container" style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start', // 中央寄せから上寄せに変更
      justifyContent: 'center',
      padding: '40px 0 20px', // 上部に余白を追加
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
        marginTop: '40px' // 上部に追加余白
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
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' // 拡大効果を削除し、影を控えめに
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(profession.id)}
              style={{
                backgroundColor: selectedProfession === profession.id 
                  ? 'rgba(26, 108, 191, 0.05)' 
                  : 'white',
                borderRadius: '16px',
                padding: '20px 15px',
                cursor: 'pointer',
                border: `2px solid ${selectedProfession === profession.id ? '#1A6CBF' : '#E5E7EB'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                aspectRatio: '1/1',
                justifyContent: 'center'
              }}
            >
              <div className="profession-icon-container" style={{
                width: '80px',
                height: '80px',
                marginBottom: '12px',
                position: 'relative'
              }}>
                {/* アイコン表示は単純なフェードインのみ - キラッとエフェクトを完全削除 */}
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={profession.imagePath}
                  alt={profession.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                    // 拡大・変形効果を完全に削除
                  }}
                />
                {selectedProfession === profession.id && (
                  <div style={{
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
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: selectedProfession === profession.id ? '#1A6CBF' : '#1F2937',
                textAlign: 'center',
                margin: 0
              }}>
                {profession.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* モバイル対応のレスポンシブスタイル */}
      <style jsx="true">{`
        /* PC版のスタイル調整 */
        @media (min-width: 768px) {
          .professions-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 680px; /* より適切なサイズに調整 */
            margin: 0 auto;
          }
          
          .profession-select-content {
            padding: 40px 30px;
            width: 55%; /* 適切な幅に調整 */
            max-width: 720px; /* 最適な最大幅 */
            margin: 80px auto 0; /* 上部余白を増加 */
            border-radius: 32px;
          }
          
          /* 各職種カードのバランスを整える */
          .professions-grid > div {
            padding: 20px 15px;
            min-height: 180px; /* 適切な高さ */
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .profession-icon-container {
            width: 80px !important; /* アイコンサイズ維持 */
            height: 80px !important;
            margin-bottom: 16px !important;
          }
          
          .professions-grid > div h3 {
            font-size: 18px !important;
            margin-top: 8px !important;
          }
        }
        
        /* タブレット表示 */
        @media (min-width: 481px) and (max-width: 767px) {
          .profession-select-content {
            margin-top: 60px; /* タブレットでも上部に余白 */
            width: 90%;
          }
        }
        
        /* スマホ表示 */
        @media (max-width: 480px) {
          .profession-select-container {
            padding-top: 20px; /* 上部パディングを調整 */
            align-items: flex-start; /* 上寄せに固定 */
          }
          
          .profession-select-content {
            margin-top: 20px; /* スマホでは上部余白を少なめに */
            padding: 25px 15px;
            border-radius: 20px;
            width: 92%;
          }
          
          .profession-icon-container {
            width: 60px !important;
            height: 60px !important;
          }
          
          h3 {
            font-size: 16px !important;
          }
          
          h2 {
            font-size: 24px !important;
            margin-bottom: 20px !important;
          }
        }
        
        /* iOS向けの特別対応 */
        @supports (-webkit-touch-callout: none) {
          .profession-select-container {
            padding-top: 30px; /* iOSでは上部にさらに余白 */
          }
          
          .profession-select-content {
            -webkit-backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfessionSelect;