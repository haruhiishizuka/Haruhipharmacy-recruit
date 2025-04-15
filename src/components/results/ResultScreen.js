import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResultSummary from './ResultSummary';
import QuickConsultationForm from './QuickConsultationForm';

// 4軸プロファイル表示コンポーネント - 改良版
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

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{
        color: '#2D3748',
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '20px',
        textAlign: 'center'
      }}>あなたの4軸プロファイル</h3>
      
      {/* 専門性軸 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>専門性軸</span>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#718096', marginRight: '8px' }}>
              {getAxisValue('specialist') > 0 ? '' : '総合的 (G)'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('specialist') !== 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('specialist') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('specialist')) * 50}%`,
                height: '100%',
                width: `${Math.abs(getAxisValue('specialist')) * 50}%`,
                backgroundColor: getAxisValue('specialist') > 0 ? '#63B3ED' : '#9AE6B4',
                borderRadius: '6px'
              }}
            ></div>
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
                borderRadius: '6px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>総合的(G)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>専門的(S)</span>
        </div>
      </div>
      
      {/* 革新性軸 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>革新性軸</span>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#718096', marginRight: '8px' }}>
              {getAxisValue('innovative') > 0 ? '' : '継続的 (C)'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('innovative') !== 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('innovative') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('innovative')) * 50}%`,
                height: '100%',
                width: `${Math.abs(getAxisValue('innovative')) * 50}%`,
                backgroundColor: getAxisValue('innovative') > 0 ? '#63B3ED' : '#9AE6B4',
                borderRadius: '6px'
              }}
            ></div>
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
                borderRadius: '6px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>継続的 (C)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>革新的 (I)</span>
        </div>
      </div>
      
      {/* 対象軸 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>対象軸</span>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#718096', marginRight: '8px' }}>
              {getAxisValue('human') > 0 ? '人間中心 (H)' : ''}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('human') !== 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('human') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('human')) * 50}%`,
                height: '100%',
                width: `${Math.abs(getAxisValue('human')) * 50}%`,
                backgroundColor: getAxisValue('human') > 0 ? '#63B3ED' : '#9AE6B4',
                borderRadius: '6px'
              }}
            ></div>
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
                borderRadius: '6px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>技術中心 (T)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>人間中心 (H)</span>
        </div>
      </div>
      
      {/* 思考軸 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', color: '#4A5568' }}>思考軸</span>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#718096', marginRight: '8px' }}>
              {getAxisValue('analytical') > 0 ? '分析的 (A)' : '実践的 (P)'}
            </span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '2px', backgroundColor: '#CBD5E0' }}></div>
          
          {getAxisValue('analytical') !== 0 && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: getAxisValue('analytical') > 0 ? '50%' : `${50 - Math.abs(getAxisValue('analytical')) * 50}%`,
                height: '100%',
                width: `${Math.abs(getAxisValue('analytical')) * 50}%`,
                backgroundColor: getAxisValue('analytical') > 0 ? '#63B3ED' : '#9AE6B4',
                borderRadius: '6px'
              }}
            ></div>
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
                borderRadius: '6px'
              }}
            ></div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>実践的 (P)</span>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>分析的 (A)</span>
        </div>
      </div>
      
      {/* タイプ表示 */}
      <div style={{ textAlign: 'center', marginTop: '12px', padding: '16px', backgroundColor: '#F7FAFC', borderRadius: '8px' }}>
        <p style={{ fontWeight: '600', color: '#2D3748', marginBottom: '8px' }}>あなたの医療キャリアタイプ</p>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: '#1A6CBF', 
          marginBottom: '8px' 
        }}>
          {typeCode}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#4A5568' }}>
          {getAxisValue('specialist') > 0 ? '専門的' : ''} 
          {getAxisValue('innovative') > 0 ? '革新的' : ''} 
          {getAxisValue('human') > 0 ? '人間中心' : ''} 
          {getAxisValue('analytical') > 0 ? '分析的' : ''}
        </p>
      </div>
    </div>
  );
};

// 追従する予約ボタンコンポーネント
const FloatingButton = ({ onClick }) => {
  return (
    <div 
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

// 結果画面コンポーネント
const ResultScreen = ({ results, profession, answers, onRestart }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [showContactForm, setShowContactForm] = useState(false);
  
  // コンポーネントマウント時の処理
  useEffect(() => {
    // ページトップへスクロール
    window.scrollTo({ top: 0, behavior: 'auto' });
    // デバッグログ
    console.log('ResultScreen mounted with:', { 
      results: results ? `${results.type || 'no-type'} (${results.title || 'no-title'})` : 'no-results',
      profession
    });
  }, [results, profession]);
  
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

  // タブ定義
  const tabs = [
    { id: 'summary', label: '特性と強み' },
    { id: 'growth', label: '成長と発展' },
    { id: 'interpersonal', label: '対人関係' },
    { id: 'environment', label: '職場環境' },
    { id: 'inspiration', label: 'インスピレーション' }
  ];

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
      <div style={{
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
          style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.5px' }}
        >
          診断結果
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '600', 
            marginBottom: '20px',
            color: 'white'
          }}>
            あなたは「{resultTitle}」タイプです
          </h2>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: '400', 
            lineHeight: '1.6', 
            maxWidth: '800px', 
            margin: '0 auto 30px',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            {resultDescription ? (resultDescription.length > 120 ? `${resultDescription.substring(0, 120)}...` : resultDescription) : ''}
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
        <div style={{
          backgroundColor: '#F7FAFC',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{
            fontSize: '22px',
            fontStyle: 'italic',
            color: '#1A6CBF',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>"{inspirationalQuote.text}"</p>
          <p style={{
            fontSize: '16px',
            color: '#4A5568',
            fontWeight: '600'
          }}>— {inspirationalQuote.author}</p>
        </div>
        
        {/* 4軸プロファイル */}
        <AxisProfile axisScores={results.axisScores} />

        {/* タブナビゲーション */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '32px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                minWidth: '140px',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#1A6CBF' : 'white',
                color: activeTab === tab.id ? 'white' : '#1A6CBF',
                border: `2px solid ${activeTab === tab.id ? '#1A6CBF' : '#E5E7EB'}`,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
              }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* タブコンテンツ */}
        <div style={{ padding: '0 10px' }}>
          <ResultSummary result={results} tab={activeTab} />
        </div>

        {/* アクションボタン */}
        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenContactForm();
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
              color: '#1A6CBF',
              border: '2px solid #1A6CBF',
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
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#333', fontSize: '13px', paddingBottom: '40px', lineHeight: '1.8' }}>
        <p>MediMatchは看護師・薬剤師・リハビリ系（PT/OT/ST）などのためのキャリア診断</p>
        <p>© 2025 株式会社はるひメディカルサービス. All rights reserved.</p>
        <a href="/privacy" style={{ color: '#1A6CBF', textDecoration: 'underline' }}>
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

      {/* モバイル対応のためのインラインスタイル */}
      <style jsx="true">{`
        @media (max-width: 768px) {
          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultScreen;