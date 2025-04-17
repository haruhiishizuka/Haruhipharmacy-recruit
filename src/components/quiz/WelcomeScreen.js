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
  
  // Click handler with debug logs
  const handleStartClick = (e) => {
    console.log('診断開始ボタンがクリックされました');
    e.preventDefault(); // イベントのデフォルト動作を防止
    if (typeof onStartQuiz === 'function') {
      console.log('onStartQuiz関数を実行します');
      onStartQuiz();
    } else {
      console.error('onStartQuiz関数が定義されていません');
    }
  };

  return (
    <div className="welcome-screen" style={{ 
      minHeight: '100vh',
      backgroundImage: `url('/images/patterns/medical_pattern_light.png')`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundColor: '#65A9E5',
      fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ヒーローセクション */}
      <div className="hero-section" style={{
        padding: '60px 20px 120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(26, 108, 191, 0.3), rgba(101, 169, 229, 0.1))',
        backdropFilter: 'blur(2px)',
        boxShadow: 'inset 0 -4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%'
      }}>
        {/* MediMatchロゴ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            marginBottom: '30px',
            maxWidth: '280px',
            width: '100%',
            position: 'relative'
          }}
        >
          <img 
            src="/images/icons/MediMatchlogo.png"  
            alt="MediMatch Logo" 
            style={{
              width: '100%',
              height: 'auto'
            }}
          />
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            opacity: 0.9,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '10px'
          }}>
            医療キャリア診断ツール
          </div>
        </motion.div>
        
        {/* 説明文 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ maxWidth: '800px', width: '100%' }}
        >          
          <p style={{
            fontSize: '17px',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 40px',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            あなたの価値観と強みを分析し、適性に合った職場環境や成長のヒントを提案します。
            たった5分の診断で、あなたの医療キャリアの道しるべを見つけましょう。
          </p>
        </motion.div>
        
        {/* 診断開始ボタン - モバイル向けにタッチイベント最適化 */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={handleStartClick}
          style={{
            backgroundColor: 'white',
            color: '#1A6CBF',
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
            zIndex: 5,
            position: 'relative', // タップ領域のために相対位置を設定
            touchAction: 'manipulation', // タッチ操作を最適化
            WebkitTapHighlightColor: 'transparent', // タップ時のハイライトを無効化
            outline: 'none', // アウトラインを削除
            userSelect: 'none' // テキスト選択を無効化
          }}
        >
          <span>診断をはじめる</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.button>
        
        {/* キャラクターイラスト - モバイル表示時にサイズを調整 */}
        <div className="character-container" style={{
          position: 'absolute',
          left: '5%',
          bottom: '-60px',
          width: '180px',
          zIndex: 10,
          display: 'block'
        }}>
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            src="/images/navigator_clean.png"
            alt="キャラクター"
            style={{ width: '100%', height: 'auto' }}
            className="character-image"
          />
        </div>
      </div>

      {/* 特徴紹介セクション */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="features-section"
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
          flex: 1,
          width: '90%'
        }}
      >
        {/* タイトル */}
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

        {/* 特徴カードのグリッド */}
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
            {/* 2つ目の診断開始ボタン - タップ検出向けに最適化 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartClick}
              style={{
                backgroundColor: '#1A6CBF',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(26, 108, 191, 0.2)',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                outline: 'none',
                userSelect: 'none'
              }}
            >
              診断をはじめる
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* フッター */}
      <footer className="footer" style={{
        textAlign: 'center',
        marginTop: '40px',
        color: 'white',
        padding: '20px',
        fontSize: '14px',
        backgroundColor: 'rgba(26, 108, 191, 0.1)',
        backdropFilter: 'blur(5px)',
        width: '100%'
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
            color: 'white', 
            textDecoration: 'underline',
            opacity: 0.9,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.9'}
        >
          プライバシーポリシー・利用規約・お問い合わせ
        </a>
      </footer>

      {/* モバイル対応用スタイル - 特にiOS向けの最適化を追加 */}
      <style jsx="true">{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(26, 108, 191, 0.3); }
          70% { box-shadow: 0 0 0 10px rgba(26, 108, 191, 0); }
          100% { box-shadow: 0 0 0 0 rgba(26, 108, 191, 0); }
        }
        
        /* すべての要素に適用 */
        * {
          box-sizing: border-box !important;
          -webkit-tap-highlight-color: transparent;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
        }
        
        .welcome-screen {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .hero-section {
          width: 100%;
        }
        
        .features-section {
          max-width: 90%;
        }
        
        /* フォーカス時のスタイルを調整（モバイル向け） */
        button:focus {
          outline: none;
        }
        
        /* iOS向けの特別な調整 */
        @supports (-webkit-touch-callout: none) {
          button {
            cursor: pointer;
            -webkit-touch-callout: none;
          }
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
          
          .character-container {
            width: 120px !important;
            left: 20px !important;
            bottom: -50px !important;
          }
        }
        
        /* モバイル向けスタイル - 特に重要 */
        @media (max-width: 480px) {
          .welcome-screen {
            width: 100vw;
            overflow-x: hidden;
          }
          
          .hero-section {
            padding: 40px 15px 100px !important;
          }
          
          .features-section {
            width: 92% !important;
            margin-top: -50px !important;
            padding: 30px 15px 40px !important;
          }
          
          h2 {
            font-size: 22px !important;
            margin-bottom: 25px !important;
          }
          
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            padding: 0 !important;
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
          
          /* キャラクター位置の調整 - 必ず表示されるように */
          .character-container {
            width: 90px !important;
            left: 5px !important;
            bottom: -2px !important;
            position: absolute !important;
            display: block !important;
            z-index: 20 !important;
          }
          
          .character-image {
            width: 100% !important;
            display: block !important;
          }
          
          .footer {
            font-size: 12px !important;
            padding: 15px 10px !important;
          }
          
          .footer p {
            margin-bottom: 5px !important;
          }
          
          /* iOSでのタッチ動作を最適化 */
          button {
            padding: 16px 30px !important;
            font-size: 16px !important;
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;