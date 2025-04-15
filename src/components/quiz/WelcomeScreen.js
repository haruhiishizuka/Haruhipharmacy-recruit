import React from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStartQuiz }) => {
  const features = [
    {
      title: '自己理解を深める診断',
      desc: '15の質問で、あなたの志向や価値観を明らかにします。',
      img: 'self_analysis.png'
    },
    {
      title: '医療機関の適性マッチ',
      desc: '独自評価に基づいた病院選びをサポート。',
      img: 'hospital.png'
    },
    {
      title: 'キャリアの成長を支援',
      desc: 'あなたに合ったステージへ次の一歩を。',
      img: 'career_growth.png'
    }
  ];

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 24,
      },
    },
  };

  return (
    <div style={{ 
      fontFamily: `'Inter', 'Noto Sans JP', sans-serif`, 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/patterns/medical_pattern_light.png)`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundColor: '#65A9E5',
      minHeight: '100vh'
    }}>
      {/* Heroセクション */}
      <div style={{
        padding: '80px 20px 100px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        backgroundColor: 'rgba(101, 169, 229, 0.3)',
        backdropFilter: 'blur(2px)',
      }}>
        {/* キャラクターを左側に配置 - モバイル対応 */}
        <div className="character-container" style={{
          position: 'absolute',
          left: '5%',
          bottom: '-60px',
          width: '180px',
          zIndex: 2
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/navigator_clean.png`}
            alt="Character"
            style={{ width: '100%', height: 'auto' }}
            className="character-image"
          />
        </div>
        
        {/* テキストエリア */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.5px' }}
        >
          MediMatch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontSize: '20px', fontWeight: '500', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto 30px' }}
        >
          医療職（看護師・薬剤師・リハ職など）のための<br />性格×志向性で導くキャリア診断ツール
        </motion.p>
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            if (typeof onStartQuiz === 'function') {
              onStartQuiz();
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: '#ffffff',
            color: '#1A6CBF',
            border: 'none',
            borderRadius: '32px',
            padding: '14px 36px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          診断をはじめる
        </motion.button>
      </div>

      {/* 特徴紹介セクション */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          marginTop: '-60px',
          padding: '60px 20px 40px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '40px',
          textAlign: 'center',
          letterSpacing: '-0.3px'
        }}>
          MediMatchの特徴
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
        }}>
          {features.map((item, i) => (
            <div key={i} style={{
              padding: '32px',
              borderRadius: '20px',
              backgroundColor: '#F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/${item.img}`}
                alt={item.title}
                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
              />
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1A6CBF', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.7' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#333', fontSize: '13px', paddingBottom: '40px', lineHeight: '1.8' }}>
        <p>MediMatchは看護師・薬剤師・リハビリ系（PT/OT/ST）などのためのキャリア診断</p>
        <p>© 2025 株式会社はるひメディカルサービス. All rights reserved.</p>
        <a href="/privacy" style={{ color: '#1A6CBF', textDecoration: 'underline' }}>
          プライバシーポリシー・利用規約・お問い合わせ
        </a>
      </footer>

      {/* モバイル対応のためのCSSを追加 */}
      <style jsx="true">{`
        @media (max-width: 768px) {
          .character-container {
            width: 100px !important;
            left: 10px !important;
            top: 270px !important;
            bottom: auto !important;
            transform: none !important;
          }
          
          .character-image {
            width: 80% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;