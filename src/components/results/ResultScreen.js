import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultSummary from './ResultSummary';
import QuickConsultationForm from './QuickConsultationForm';

// 4軸プロファイル表示コンポーネント - モバイル対応改善版
const AxisProfile = ({ axisScores }) => {
  // スコアのデフォルト値
  const defaultScores = {
    specialist: -0.7,   // 総合的(G)寄り
    innovative: -0.7,   // 継続的(C)寄り
    human: -0.7,        // 技術中心(T)寄り
    analytical: -0.7    // 実践的(P)寄り
  };

  // 安全なスコア値を取得（nullやundefinedの場合はデフォルト値を使用）
  const safeScores = axisScores || defaultScores;

  // 各軸の値を取得（異常値の場合は0）
  const getAxisValue = (key) => {
    const value = safeScores[key];
    if (value === undefined || value === null || isNaN(value)) {
      return 0;
    }
    // -1から1の範囲に収める
    return Math.max(-1, Math.min(1, value));
  };

  // 表示用のコード
  const typeCode = 
    (getAxisValue('specialist') > 0 ? 'S' : 'G') +
    (getAxisValue('innovative') > 0 ? 'I' : 'C') +
    (getAxisValue('human') > 0 ? 'H' : 'T') +
    (getAxisValue('analytical') > 0 ? 'A' : 'P');
    
  // 軸の値に基づいて色を取得
  const getAxisColor = (key) => {
    const value = getAxisValue(key);
    if (value > 0) return '#3B82F6'; // 青系
    if (value < 0) return '#10B981'; // 緑系
    return '#6B7280'; // グレー（中立）
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '32px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{
        color: '#1E3A8A',
        fontSize: '22px',
        fontWeight: '600',
        marginBottom: '24px',
        textAlign: 'center'
      }}>あなたの4軸プロファイル</h3>
      
      {/* 専門性軸 */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>専門性軸</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              color: getAxisColor('specialist'),
              fontWeight: '600',
              backgroundColor: `${getAxisColor('specialist')}15`,
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              {getAxisValue('specialist') > 0 ? '専門的 (S)' : getAxisValue('specialist') < 0 ? '総合的 (G)' : '中立'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '14px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('specialist') !== 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.abs(getAxisValue('specialist')) * 50}%` 
              }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('specialist') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('specialist')) * 50}%`,
                height: '100%',
                backgroundColor: getAxisColor('specialist'),
                borderRadius: '8px'
              }}
            ></motion.div>
          )}
          {getAxisValue('specialist') === 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: '48%',
                height: '100%',
                width: '4%',
                backgroundColor: '#CBD5E0',
                borderRadius: '8px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>総合的(G)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>専門的(S)</span>
        </div>
      </div>
      
      {/* 革新性軸 */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>革新性軸</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              color: getAxisColor('innovative'),
              fontWeight: '600',
              backgroundColor: `${getAxisColor('innovative')}15`,
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              {getAxisValue('innovative') > 0 ? '革新的 (I)' : getAxisValue('innovative') < 0 ? '継続的 (C)' : '中立'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '14px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('innovative') !== 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.abs(getAxisValue('innovative')) * 50}%` 
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('innovative') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('innovative')) * 50}%`,
                height: '100%',
                backgroundColor: getAxisColor('innovative'),
                borderRadius: '8px'
              }}
            ></motion.div>
          )}
          {getAxisValue('innovative') === 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: '48%',
                height: '100%',
                width: '4%',
                backgroundColor: '#CBD5E0',
                borderRadius: '8px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>継続的 (C)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>革新的 (I)</span>
        </div>
      </div>
      
      {/* 対象軸 */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>対象軸</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              color: getAxisColor('human'),
              fontWeight: '600',
              backgroundColor: `${getAxisColor('human')}15`,
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              {getAxisValue('human') > 0 ? '人間中心 (H)' : getAxisValue('human') < 0 ? '技術中心 (T)' : '中立'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '14px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('human') !== 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.abs(getAxisValue('human')) * 50}%` 
              }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('human') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('human')) * 50}%`,
                height: '100%',
                backgroundColor: getAxisColor('human'),
                borderRadius: '8px'
              }}
            ></motion.div>
          )}
          {getAxisValue('human') === 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: '48%',
                height: '100%',
                width: '4%',
                backgroundColor: '#CBD5E0',
                borderRadius: '8px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>技術中心 (T)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>人間中心 (H)</span>
        </div>
      </div>
      
      {/* 思考軸 */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>思考軸</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              color: getAxisColor('analytical'),
              fontWeight: '600',
              backgroundColor: `${getAxisColor('analytical')}15`,
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              {getAxisValue('analytical') > 0 ? '分析的 (A)' : getAxisValue('analytical') < 0 ? '実践的 (P)' : '中立'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '14px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('analytical') !== 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.abs(getAxisValue('analytical')) * 50}%` 
              }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('analytical') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('analytical')) * 50}%`,
                height: '100%',
                backgroundColor: getAxisColor('analytical'),
                borderRadius: '8px'
              }}
            ></motion.div>
          )}
          {getAxisValue('analytical') === 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: '48%',
                height: '100%',
                width: '4%',
                backgroundColor: '#CBD5E0',
                borderRadius: '8px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>実践的 (P)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>分析的 (A)</span>
        </div>
      </div>
      
      {/* タイプ表示 */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#F7FAFC', 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0'
      }}>
        <p style={{ 
          fontWeight: '600', 
          color: '#2D3748', 
          marginBottom: '10px',
          fontSize: '16px'
        }}>
          あなたの医療キャリアタイプ
        </p>
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#1A6CBF', 
            marginBottom: '12px',
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '2px solid #EBF8FF'
          }}
        >
          {typeCode}
        </motion.div>
        <div className="type-traits" style={{ 
          fontSize: '15px', 
          color: '#4A5568',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '12px'
        }}>
          {getAxisValue('specialist') > 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('specialist')}15`,
              color: getAxisColor('specialist'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>専門的</span>
          )}
          {getAxisValue('specialist') < 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('specialist')}15`,
              color: getAxisColor('specialist'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>総合的</span>
          )}
          {getAxisValue('innovative') > 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('innovative')}15`,
              color: getAxisColor('innovative'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>革新的</span>
          )}
          {getAxisValue('innovative') < 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('innovative')}15`,
              color: getAxisColor('innovative'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>継続的</span>
          )}
          {getAxisValue('human') > 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('human')}15`,
              color: getAxisColor('human'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>人間中心</span>
          )}
          {getAxisValue('human') < 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('human')}15`,
              color: getAxisColor('human'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>技術中心</span>
          )}
          {getAxisValue('analytical') > 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('analytical')}15`,
              color: getAxisColor('analytical'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>分析的</span>
          )}
          {getAxisValue('analytical') < 0 && (
            <span style={{ 
              padding: '4px 10px', 
              backgroundColor: `${getAxisColor('analytical')}15`,
              color: getAxisColor('analytical'),
              borderRadius: '16px',
              fontWeight: '500'
            }}>実践的</span>
          )}
        </div>
      </div>
    </div>
  );
};

// 追従する予約ボタンコンポーネント - モバイル対応改善版
const FloatingButton = ({ onClick }) => {
  return (
    <div 
      className="floating-button"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '20px',
        zIndex: 100
      }}
    >
      <motion.button
        onClick={(e) => {
          e.preventDefault();
          if (typeof onClick === 'function') {
            onClick();
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          backgroundColor: '#1A6CBF',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 24px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span>相談する</span>
      </motion.button>
    </div>
  );
};

// 結果画面コンポーネント - タブ切り替え改善版
const ResultScreen = ({ results, profession, postalCode, answers, onRestart }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [showContactForm, setShowContactForm] = useState(false);
  
  // タブコンテンツ要素への参照を保持
  const tabContentRef = useRef(null);
  
  // コンポーネントマウント時の処理
  useEffect(() => {
    // ページトップへスクロール (初回のみ)
    window.scrollTo({ top: 0, behavior: 'auto' });
    console.log('ResultScreen mounted with:', { 
      results: results ? `${results.type || 'no-type'} (${results.title || 'no-title'})` : 'no-results',
      profession,
      postalCode: postalCode || 'なし'
    });
  }, [results, profession, postalCode]);
  
  // 結果データがない場合の処理
  if (!results) {
    console.log('No results data available, showing fallback UI');
    return (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/patterns/medical_pattern_light.png)`,
        backgroundSize: '400px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundColor: '#65A9E5',
        fontFamily: `'Inter', 'Noto Sans JP', sans-serif`
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '40px 30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          textAlign: 'center',
          maxWidth: '450px',
          margin: '0 20px'
        }}>
          <h2 style={{ 
            color: '#1A6CBF', 
            fontSize: '28px', 
            fontWeight: '700',
            marginBottom: '16px'
          }}>診断結果が見つかりません</h2>
          <p style={{
            marginBottom: '24px',
            color: '#4B5563',
            fontSize: '16px'
          }}>診断を完了してからこの画面をご覧ください。</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof onRestart === 'function') {
                onRestart();
              }
            }}
            style={{
              backgroundColor: '#1A6CBF',
              color: 'white',
              border: 'none',
              borderRadius: '32px',
              padding: '14px 36px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <span>はじめに戻る</span>
          </button>
        </div>
      </div>
    );
  }

  // インスピレーションの引用を取得
  const inspirationalQuote = results.inspirationalQuote || {
    text: "最高の技術とは、複雑さではなく単純さをもたらし、人々の生活をより良くするものである。",
    author: "医療のアート"
  };

  // タイトルと説明を取得
  const resultTitle = results.title || (typeof results.type === 'string' ? results.type : '');
  const resultDescription = results.description || '';

  // 職種別の色設定
  const getProfessionColor = () => {
    switch (profession) {
      case '看護師':
        return '#3182CE'; // 青系
      case '薬剤師':
        return '#38A169'; // 緑系
      case 'リハビリ系':
        return '#DD6B20'; // オレンジ系
      case 'その他医療職':
        return '#805AD5'; // 紫系
      default:
        return '#1A6CBF'; // デフォルト青
    }
  };

  const professionColor = getProfessionColor();

  // タブ定義
  const tabs = [
    { id: 'summary', label: '特性と強み' },
    { id: 'growth', label: '成長と発展' },
    { id: 'interpersonal', label: '対人関係' },
    { id: 'environment', label: '職場環境' },
    { id: 'inspiration', label: 'インスピレーション' }
  ];

  // タブ切り替え処理 - スクロールなし・背景固定
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // スクロールしない - これが重要な変更点
  };

  // 問い合わせフォームを開く
  const handleOpenContactForm = () => {
    console.log('Opening contact form');
    setShowContactForm(true);
  };

  // 問い合わせフォームを閉じる
  const handleCloseContactForm = () => {
    console.log('Closing contact form');
    setShowContactForm(false);
  };

  // タブコンテンツのアニメーション設定
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div style={{ 
      fontFamily: `'Inter', 'Noto Sans JP', sans-serif`, 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/patterns/medical_pattern_light.png)`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundColor: '#65A9E5',
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      {/* ヘッダーセクション */}
      <div className="header-section" style={{
        padding: '60px 20px 80px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        backgroundColor: 'rgba(101, 169, 229, 0.3)',
        backdropFilter: 'blur(2px)',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            fontSize: '38px', 
            fontWeight: '700', 
            marginBottom: '16px', 
            letterSpacing: '-0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          診断結果
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            padding: '6px 12px',
            borderRadius: '20px',
            marginBottom: '20px',
            color: 'white',
            fontWeight: '500'
          }}>
            <span style={{ 
              backgroundColor: professionColor,
              color: 'white',
              padding: '4px 10px',
              borderRadius: '16px',
              fontSize: '14px',
              marginRight: '8px'
            }}>
              {profession || '医療職'}
            </span>
            <span>向け診断</span>
          </div>
          <h2 className="result-title" style={{ 
            fontSize: '28px', 
            fontWeight: '600', 
            marginBottom: '20px',
            color: 'white',
            maxWidth: '800px',
            margin: '0 auto 20px',
            lineHeight: '1.3',
            padding: '0 10px'
          }}>
            あなたは「{resultTitle}」タイプです
          </h2>
          <p className="result-description" style={{ 
            fontSize: '18px', 
            fontWeight: '400', 
            lineHeight: '1.6', 
            maxWidth: '900px', 
            margin: '0 auto 30px',
            color: 'rgba(255, 255, 255, 0.9)',
            padding: '0 20px'
          }}>
            {resultDescription ? (resultDescription.length > 150 ? `${resultDescription.substring(0, 150)}...` : resultDescription) : ''}
          </p>
        </motion.div>
      </div>

      {/* メインコンテンツエリア */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          marginTop: '-60px',
          padding: '40px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* インスピレーションの言葉 */}
        <div className="quote-container" style={{
          backgroundColor: '#F7FAFC',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          maxWidth: '900px',
          margin: '0 auto 32px'
        }}>
          <p style={{
            fontSize: '22px',
            fontStyle: 'italic',
            color: '#1A6CBF',
            marginBottom: '16px',
            lineHeight: '1.6',
            wordBreak: 'break-word'
          }}>"{inspirationalQuote.text}"</p>
          <p style={{
            fontSize: '16px',
            color: '#4A5568',
            fontWeight: '600'
          }}>— {inspirationalQuote.author}</p>
        </div>
        
        {/* 4軸プロファイル */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <AxisProfile axisScores={results.axisScores} />
        </div>

        {/* タブナビゲーション - モバイル対応2列レイアウト */}
        <div className="tabs-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
          padding: '10px 0'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(tab.id);
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '32px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                minWidth: '120px',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? professionColor : 'white',
                color: activeTab === tab.id ? 'white' : professionColor,
                border: `2px solid ${activeTab === tab.id ? professionColor : '#E5E7EB'}`,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* タブコンテンツ - アニメーション付き・背景は固定 */}
        <div 
          id="tab-content" 
          ref={tabContentRef}
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '0 10px',
            minHeight: '400px' // 最小の高さを設定して背景が安定するように
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ResultSummary 
                result={results} 
                tab={activeTab} 
                profession={profession} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* アクションボタン */}
        <div className="action-buttons" style={{
          marginTop: '50px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '900px',
          margin: '50px auto 0'
        }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenContactForm();
            }}
            style={{
              backgroundColor: professionColor,
              color: 'white',
              border: 'none',
              borderRadius: '32px',
              padding: '14px 36px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: `0 4px 12px ${professionColor}40`,
              transition: 'all 0.3s ease',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            <span>無料でキャリア相談をする</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof onRestart === 'function') {
                onRestart();
              }
            }}
            style={{
              backgroundColor: 'transparent',
              color: professionColor,
              border: `2px solid ${professionColor}`,
              borderRadius: '32px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            <span>診断をやり直す</span>
          </button>
        </div>
      </motion.div>

      {/* フッター */}
      <footer style={{ textAlign: 'center', marginTop: '40px', color: 'white', fontSize: '13px', paddingBottom: '40px', lineHeight: '1.8' }}>
        <p>MediMatchは看護師・薬剤師・リハビリ系（PT/OT/ST）などのためのキャリア診断</p>
        <p>© 2025 株式会社はるひメディカルサービス. All rights reserved.</p>
        <a href="/privacy" style={{ color: 'white', textDecoration: 'underline' }}>
          プライバシーポリシー・利用規約・お問い合わせ
        </a>
      </footer>

      {/* 追従ボタン */}
      <FloatingButton onClick={handleOpenContactForm} />

      {/* 予約フォームモーダル */}
      {showContactForm && (
        <QuickConsultationForm 
          resultType={resultTitle}
          profession={profession}
          onClose={handleCloseContactForm}
        />
      )}

      {/* モバイル対応のためのスタイル */}
      <style jsx="true">{`
        /* モバイル表示（480px以下）用のスタイル */
        @media (max-width: 480px) {
          .header-section {
            padding: 40px 15px 60px !important;
          }
          
          .result-title {
            font-size: 24px !important;
            margin-bottom: 12px !important;
          }
          
          .result-description {
            font-size: 15px !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
          }
          
          .quote-container {
            padding: 20px 15px !important;
          }
          
          .quote-container p:first-child {
            font-size: 18px !important;
          }
          
          .tabs-container {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: repeat(2, auto) !important;
            gap: 8px !important;
            padding: 8px !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .tabs-container button {
            font-size: 13px !important;
            padding: 8px 12px !important;
            min-width: auto !important;
            flex-shrink: 0 !important;
          }
          
          /* 環境とインスピレーションタブを2行目に配置 */
          .tabs-container button:nth-child(4),
          .tabs-container button:nth-child(5) {
            grid-row: 2 !important;
          }
          
          .tabs-container button:nth-child(4) {
            grid-column: 1 / span 1 !important;
          }
          
          .tabs-container button:nth-child(5) {
            grid-column: 2 / span 2 !important;
          }
          
          .type-traits {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
            margin-top: 16px !important;
          }
          
          .type-traits span {
            font-size: 12px !important;
            padding: 4px 6px !important;
            text-align: center !important;
          }
          
          .action-buttons {
            margin-top: 30px !important;
          }
          
          .action-buttons button {
            font-size: 15px !important;
            padding: 12px !important;
          }
          
          .floating-button {
            bottom: 15px !important;
            right: 15px !important;
          }
          
          .floating-button button {
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
        }
        
        /* タブレット表示（481px〜768px）用のスタイル */
        @media (min-width: 481px) and (max-width: 768px) {
          .header-section {
            padding: 50px 20px 70px !important;
          }
          
          .result-title {
            font-size: 26px !important;
          }
          
          .tabs-container {
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: repeat(2, auto) !important;
            gap: 10px !important;
          }
          
          .tabs-container button {
            font-size: 14px !important;
            padding: 10px 20px !important;
            min-width: auto !important;
          }
          
          /* 環境とインスピレーションタブを2行目に配置 */
          .tabs-container button:nth-child(4),
          .tabs-container button:nth-child(5) {
            grid-row: 2 !important;
          }
          
          .tabs-container button:nth-child(4) {
            grid-column: 1 / span 2 !important;
          }
          
          .tabs-container button:nth-child(5) {
            grid-column: 3 / span 1 !important;
          }
        }
        
        /* アニメーション */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ResultScreen;