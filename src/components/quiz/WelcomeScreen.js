import React from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStartQuiz, onOpenPolicy }) => {
  // 特徴セクションのデータ
  const features = [
    {
      title: '自己理解を深める診断',
      desc: '15〜18の質問であなたの医療職としての志向性を分析します。',
      imagePath: '/images/icons/self_analysis.png'
    },
    {
      title: '16タイプの性格診断',
      desc: '専門性・革新性・対象・思考の4軸で分析し、あなたの強みを発見します。',
      imagePath: '/images/icons/analytics.png'
    },
    {
      title: 'キャリアの成長を支援',
      desc: 'あなたのタイプに合った職場環境や成長のヒントを提案します。',
      imagePath: '/images/icons/career_growth.png'
    }
  ];

  // アニメーションバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: '0 10px 25px rgba(26, 108, 191, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // 診断開始ボタンクリック時の処理
  const handleStartQuizClick = (e) => {
    e.preventDefault();
    if (typeof onStartQuiz === 'function') {
      console.log("診断を開始します...");
      trackQuizStart('welcome');
      onStartQuiz();
    } else {
      console.error("onStartQuiz is not a function");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundImage: `url('/images/patterns/medical_pattern_light.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#EDF8FF', // より淡い青を基調に
      fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* ヒーローセクション */}
      <div style={{
        padding: '60px 20px 120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: '#2D3748',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(245, 250, 255, 0.8), rgba(245, 250, 255, 0.5))',
        backdropFilter: 'blur(1px)',
        boxShadow: 'inset 0 -4px 6px rgba(0, 0, 0, 0.03)'
      }}>
        {/* MediMatchロゴ - 新しいロゴを使用 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            marginBottom: '30px',
            maxWidth: '360px',
            width: '100%',
            position: 'relative'
          }}
        >
          <img 
            src="/images/icons/MediMatchlogo.png"  
            alt="MediMatch Logo" 
            style={{
              width: '100%',
              maxWidth: '280px',
              height: 'auto'
            }}
          />
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            opacity: 0.9,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '10px',
            color: '#2D3748'
          }}>
            医療キャリア診断ツール
          </div>
        </motion.div>
        
        {/* サブタイトルを削除し、説明文のみに */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ maxWidth: '800px' }}
        >          
          <p style={{
            fontSize: '17px',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 40px',
            color: '#2D3748'
          }}>
            あなたの価値観と強みを分析し、適性に合った職場環境や成長のヒントを提案します。
            たった5分の診断で、あなたの医療キャリアの道しるべを見つけましょう。
          </p>
        </motion.div>
        
        {/* 診断開始ボタン */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={handleStartQuizClick}
          style={{
            backgroundColor: '#1A6CBF',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '18px 36px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 5
          }}
        >
          <span>診断をはじめる</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.button>
      </div>

      {/* 特徴紹介セクション - モバイルでの2列表示に最適化 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          marginTop: '-60px',
          padding: '40px 20px 60px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 2,
          flex: 1
        }}
      >
        {/* タイトルを「MediMatchの特徴」のみに */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1A6CBF',
          marginBottom: '40px',
          textAlign: 'center',
          letterSpacing: '-0.3px'
        }}>
          MediMatchの特徴
        </h2>

        {/* 特徴カードのグリッド - モバイル対応を強化 */}
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          padding: '0 10px'
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="feature-card"
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src={feature.imagePath}
                  alt={feature.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1A6CBF',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0
              }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* 補足情報 */}
        <div style={{
          backgroundColor: '#F0F7FF',
          borderRadius: '12px',
          padding: '24px',
          margin: '40px 20px 0',
          border: '1px solid #BFDBFE'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1E40AF',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            診断について
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#2D3748',
            lineHeight: 1.7,
            marginBottom: '16px'
          }}>
            MediMatchの診断は、専門性(S/G)、革新性(I/C)、対象(H/T)、思考(A/P)の4軸16タイプで、
            あなたの医療職としての適性を分析します。診断結果は無料でご利用いただけます。
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginTop: '24px' 
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartQuizClick}
              style={{
                backgroundColor: '#1A6CBF',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(26, 108, 191, 0.2)'
              }}
            >
              診断をはじめる
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* フッター */}
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        color: '#4A5568',
        padding: '20px',
        fontSize: '14px',
        backgroundColor: 'rgba(245, 250, 255, 0.4)',
        backdropFilter: 'blur(5px)'
      }}>
        <p style={{ marginBottom: '8px' }}>
          MediMatchは看護師・薬剤師・リハビリ系（PT/OT/ST）などのためのキャリア診断
        </p>
        <p style={{ marginBottom: '8px' }}>
          © 2025 株式会社はるひメディカルサービス. All rights reserved.
        </p>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (typeof onOpenPolicy === 'function') {
              onOpenPolicy();
            }
          }}
          style={{ 
            color: '#3182CE', 
            textDecoration: 'underline',
            opacity: 0.8,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.8'}
        >
          プライバシーポリシー・利用規約・お問い合わせ
        </a>
      </footer>

      {/* モバイル対応用スタイル */}
      <style jsx="true">{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(26, 108, 191, 0.3); }
          70% { box-shadow: 0 0 0 10px rgba(26, 108, 191, 0); }
          100% { box-shadow: 0 0 0 0 rgba(26, 108, 191, 0); }
        }
        
        /* デスクトップ向けスタイル */
        @media (min-width: 769px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          
          .feature-card {
            padding: 32px !important;
          }
          
          .feature-card img {
            width: 120px !important;
            height: 120px !important;
          }
          
          .feature-card h3 {
            font-size: 20px !important;
          }
          
          .feature-card p {
            font-size: 16px !important;
          }
        }
        
        /* タブレット向けスタイル */
        @media (min-width: 481px) and (max-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          
          .feature-card {
            padding: 24px !important;
          }
        }
        
        /* モバイル向けスタイル */
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          
          .feature-card {
            padding: 16px !important;
          }
          
          .feature-card img {
            width: 70px !important;
            height: 70px !important;
            margin-bottom: 10px !important;
          }
          
          .feature-card h3 {
            font-size: 16px !important;
            margin-bottom: 8px !important;
          }
          
          .feature-card p {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;