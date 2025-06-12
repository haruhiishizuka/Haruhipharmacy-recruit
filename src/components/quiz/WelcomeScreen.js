import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { trackQuizStart } from '../../utils/analytics';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import '../../styles/Enhanced3D.css';

// 3D背景を遅延読み込み
const EnhancedNeonBackground = lazy(() => import('../EnhancedNeonBackground'));

const WelcomeScreen = ({ onStartQuiz, onOpenPolicy }) => {
  // デバイス性能検出
  const { canHandle3D, isMobile } = useDeviceCapability();

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
      position: 'relative',
      minHeight: '100vh',
      minHeight: '100dvh', // Dynamic viewport height（携帯対応）
      backgroundColor: '#EDF8FF',
      backgroundImage: `url('/images/patterns/medical_pattern_light.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }}>
      {/* 条件付き3D背景 */}
      {canHandle3D && !isMobile && (
        <Suspense fallback={<div className="fallback-gradient" />}>
          <EnhancedNeonBackground />
        </Suspense>
      )}
      
      {/* 携帯用フォールバック背景 */}
      {isMobile && (
        <div className="mobile-gradient-background" />
      )}

      {/* メインコンテンツ */}
      <div style={{
        position: 'relative',
        zIndex: 10, // 3D背景より前面に
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ヒーローセクション */}
        <div style={{
          textAlign: 'center',
          padding: '120px 20px 80px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* メインタイトル */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.2 
            }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: '800',
              color: isMobile ? 'white' : '#1A6CBF',
              marginBottom: '20px',
              letterSpacing: '-2px',
              textShadow: isMobile ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
              background: isMobile ? 'none' : 'linear-gradient(135deg, #1A6CBF 0%, #3182CE 100%)',
              WebkitBackgroundClip: isMobile ? 'unset' : 'text',
              WebkitTextFillColor: isMobile ? 'white' : 'transparent',
              backgroundClip: isMobile ? 'unset' : 'text'
            }}
          >
            医療転職診断
          </motion.h1>

          {/* サブタイトル */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.5 
            }}
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
              color: isMobile ? 'rgba(255, 255, 255, 0.9)' : '#4A5568',
              marginBottom: '40px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 40px',
              fontWeight: '400'
            }}
          >
            あなたに最適な医療機関を見つけるための<br />
            パーソナライズド診断ツール
          </motion.p>
        
          {/* 診断開始ボタン */}
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={handleStartQuizClick}
            style={{
              backgroundColor: isMobile ? 'white' : '#1A6CBF',
              color: isMobile ? '#1A6CBF' : 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '18px 36px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: isMobile ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 5,
              margin: '0 auto',
              transition: 'all 0.3s ease'
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
            gap: '24px',
            alignItems: 'start'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card"
                style={{
                  backgroundColor: 'white',
                  padding: '28px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                whileHover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                <img 
                  src={feature.imagePath} 
                  alt={feature.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '20px',
                    objectFit: 'contain'
                  }}
                />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#2D3748',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#718096',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* フッター */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderTop: '1px solid #E2E8F0',
          position: 'relative',
          zIndex: 2
        }}>
          <p style={{
            fontSize: '12px',
            color: '#718096',
            marginBottom: '8px'
          }}>
            © 2024 MediMatch. All rights reserved.
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
    </div>
  );
};

export default WelcomeScreen;