import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート追加
import ResultSummary from './ResultSummary';
import QuickConsultationForm from './QuickConsultationForm';
import { trackContactStart, trackRestart, trackShare } from '../../utils/analytics';
import { getTypeData, getTypeCodeExplanation } from '../../data/typeDescriptions';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import AnimalIcon from '../AnimalIcon';
import GlobalNavigation from '../common/GlobalNavigation';

// Chart.jsの設定
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// レーダーチャートコンポーネント
const TypeRadarChart = ({ axisScores }) => {
  // 安全なスコア値を取得（nullやundefinedの場合はデフォルト値を使用）
  const safeScores = axisScores || {
    specialist: 0,
    innovative: 0,
    human: 0,
    analytical: 0
  };

  // チャートデータの準備
  const data = {
    labels: ['専門的', '革新的', '人間中心', '分析的'],
    datasets: [
      {
        label: 'あなたのタイプ',
        data: [
          // -1〜1の値を0〜100にスケール変換
          (safeScores.specialist + 1) * 50,
          (safeScores.innovative + 1) * 50,
          (safeScores.human + 1) * 50,
          (safeScores.analytical + 1) * 50
        ],
        backgroundColor: 'rgba(103, 80, 50, 0.2)',
        borderColor: 'rgba(103, 80, 50, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(103, 80, 50, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(103, 80, 50, 1)'
      }
    ]
  };

  // チャートオプション
  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#675032'
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: (context) => {
            return `スコア: ${context.raw.toFixed(0)}%`;
          }
        }
      }
    },
    maintainAspectRatio: true
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '240px', 
      margin: '0 auto',
      padding: '10px'
    }}>
      <Radar data={data} options={options} />
    </div>
  );
};

// シェア機能コンポーネント
const ShareSection = ({ resultType, profession }) => {
  const [copied, setCopied] = useState(false);
  
  const shareData = {
    title: '医療キャリア診断 結果',
    text: `私は ${resultType} タイプでした！ MediMatch で診断してみませんか？`,
    url: window.location.href
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
      .then(() => {
        setCopied(true);
        // シェアイベントのトラッキング
        trackShare(resultType, 'copy');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert('リンクのコピーに失敗しました'));
  };
  
  const handleShare = (method) => {
    // シェアイベントのトラッキング
    trackShare(resultType, method);
    
    if (navigator.share && method === 'native') {
      navigator.share(shareData).catch(console.error);
    } else {
      handleCopyLink();
    }
  };
  
  return (
    <div>
      <h3 className="heading_h4" style={{ marginBottom: 'var(--spacing-lg)', color: '#675032' }}>
        診断結果をシェアする
      </h3>
      
      <div className="card" style={{
        backgroundColor: 'var(--neutral-primary)',
        borderRadius: 'var(--radius-large)',
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)',
        border: '1px solid var(--neutral-200)'
      }}>
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)', color: '#675032' }}>
          あなたの診断結果を友達や同僚とシェアして、お互いのタイプを比較してみましょう！
        </p>
        
        <div className="button-group" style={{ flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <button
            onClick={() => handleShare('native')}
            className="button"
            style={{
              backgroundColor: '#675032',
              color: 'white',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            結果をシェアする
          </button>
          
          <button
            onClick={handleCopyLink}
            style={{
              backgroundColor: 'white',
              color: '#675032',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #CBD5E0',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? 'コピーしました！' : 'リンクをコピー'}
          </button>
        </div>
      </div>
      
      {/* SNSシェアボタン */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `私は ${resultType} タイプでした！ #MediMatch診断`
        )}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare(resultType, 'twitter')}
          style={{
            backgroundColor: '#1DA1F2',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </a>
        
        <a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare(resultType, 'line')}
          style={{
            backgroundColor: '#06C755',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.819 4.588 8.857 10.778 9.623.421.091.999.28 1.145.641.132.331.089.848.044 1.182-.132.611-.611 2.38-.611 2.38-.033.16-.066.26.088.33.154.07.275-.05.421-.111 1.893-.798 9.488-5.494 12.954-9.412 2.354-2.581 2.851-5.239 2.181-7.593z"></path>
          </svg>
        </a>
        
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare(resultType, 'facebook')}
          style={{
            backgroundColor: '#1877F2',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
      </div>
      
      <div style={{
        backgroundColor: '#EBF8FF',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #BEE3F8',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#675032', fontWeight: '600' }}>
            周りと比較することで新たな気づきが！
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#675032' }}>
            異なるタイプの医療従事者が協力することで、より良いチーム医療が実現できます。周りの人とタイプを共有して、お互いの強みを活かしましょう。
          </p>
        </div>
      </div>
    </div>
  );
};

// メインの結果画面コンポーネント
const EnhancedResultScreen = ({ results, profession, postalCode, answers, onRestart, onReturnHome, onNavigateToPage, onConsultation }) => {
  const [activeTab, setActiveTab] = useState('inspiration');
  const [showContactForm, setShowContactForm] = useState(false);
  
  // useNavigateの使用
  const navigate = useNavigate();
  
  // コンポーネントマウント時の処理
  useEffect(() => {
    // ページトップへスクロール
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  
  // 結果データがない場合の処理
  if (!results) {
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
            onClick={onRestart}
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

  // タイプコードから動物名を取得
  const getAnimalName = (typeCode) => {
    const animalMap = {
      'SIHA': 'フクロウ',
      'SIHP': 'キツネ',
      'SITA': 'ワシ',
      'SITP': 'イルカ',
      'SCHA': 'カメ',
      'SCHP': 'クマ',
      'SCTA': 'ビーバー',
      'SCTP': 'ゾウ',
      'GIHA': 'サル',
      'GIHP': 'ネコ',
      'GITA': 'オオカミ',
      'GITP': 'ウマ',
      'GCHA': 'コアラ',
      'GCHP': 'ウサギ',
      'GCTA': 'シカ',
      'GCTP': 'イヌ'
    };
    
    return animalMap[typeCode] || 'フクロウ';
  };

  // タイプごとの一言キャッチフレーズ
  const getCatchPhrase = (typeCode) => {
    const phrases = {
      'SIHA': '専門家の知性',
      'SIHP': '実践する名匠',
      'SITA': '技術の達人',
      'SITP': '革新を実現する',
      'SCHA': '安定の守護者',
      'SCHP': '確実な実行者',
      'SCTA': '体系の番人',
      'SCTP': '伝統の継承者',
      'GIHA': '柔軟な調整役',
      'GIHP': '人間関係の絆',
      'GITA': '探究する改革者',
      'GITP': '行動する改革者',
      'GCHA': '知識の統合者',
      'GCHP': '癒しの支援者',
      'GCTA': '論理の調和者',
      'GCTP': '安定の協力者'
    };
    
    return phrases[typeCode] || '医療の架け橋';
  };

  // タイプごとのワンライナー
  const getOneLiner = (typeCode) => {
    const oneLiners = {
      'SIHA': '専門分野を極め、人と向き合い、知的な分析で医療の質を高める',
      'SIHP': '確かな専門技術を持ち、人間関係を大切にしながら実践的に行動する',
      'SITA': '最新技術に精通し、効率的なシステム構築で医療現場を変革する',
      'SITP': '専門的な技術を駆使し、革新的なアプローチで実践的な解決策を提供する',
      'SCHA': '専門知識を着実に蓄積し、安定した職場環境で人々をサポートする',
      'SCHP': '確かな専門スキルを持ち、継続的な改善で患者ケアの質を高める',
      'SCTA': '専門分野の体系的知識を持ち、効率的なシステムづくりに貢献する',
      'SCTP': '専門技術を確実に実践し、安定した医療サービスを提供する',
      'GIHA': '幅広い視野と対人スキルで、チーム全体の協調を促進する',
      'GIHP': '多様な人間関係を構築し、実践的なケアで患者中心の医療を実現する',
      'GITA': '幅広い知識と技術への好奇心で、医療システムの改善を推進する',
      'GITP': '革新的なアイデアを現場で実践し、医療の可能性を広げる',
      'GCHA': '多角的な視点と安定性で、チーム全体の知識と経験を結びつける',
      'GCHP': '幅広いケア知識と確かな実践力で、安心できる医療を提供する',
      'GCTA': '論理的思考と調和を重視し、医療システム全体の効率化に貢献する',
      'GCTP': '多面的な実践力と安定性で、医療チームの基盤を支える'
    };
    
    return oneLiners[typeCode] || '医療のプロフェッショナルとして多様な強みを活かし、患者中心のケアを実現する';
  };

  // タイプコードを取得
  const typeCode = results.type || '';
  const animalName = getAnimalName(typeCode);
  const catchPhrase = getCatchPhrase(typeCode);
  const oneLiner = getOneLiner(typeCode);
  
  // 職種ごとの色設定
  const getProfessionColor = () => {
    // 全職種でブラウン系に統一
    return '#675032'; // Webflowブラウン
  };

  const professionColor = getProfessionColor();

  // タブ定義
  const tabs = [
    { id: 'inspiration', label: 'ヒント' },
    { id: 'summary', label: '特性と強み' },
    { id: 'growth', label: '成長と発展' },
    { id: 'interpersonal', label: '対人関係' },
    { id: 'environment', label: '職場環境' },
    { id: 'share', label: 'シェアする' }
  ];

  // タブ切り替え処理
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 問い合わせフォームを開く
  const handleOpenContactForm = () => {
    // コンタクト開始イベントのトラッキング
    trackContactStart(results.title || typeCode, profession);
    if (typeof onConsultation === 'function') {
      onConsultation();
    } else {
      setShowContactForm(true);
    }
  };

  // 問い合わせフォームを閉じる
  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  // 診断やり直し処理
  const handleRestartClick = () => {
    // 診断やり直しイベントのトラッキング
    trackRestart(results.title || typeCode);
    
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  // タブコンテンツのアニメーション設定
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100%'
    }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={handleRestartClick}
        activeRoute="/result"
      />
      {/* ヒーローセクション */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">診断ステップ 3</div>
            <h1 className="heading_h2">診断結果</h1>
            
            {/* 動物アイコン */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            margin: '0 auto 16px',
            width: '140px',
            height: '140px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
          }}
        >
          <AnimalIcon type={typeCode} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
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
            <span>診断結果</span>
          </div>
          
          <h2 className="heading_h2" style={{ 
            marginBottom: 'var(--spacing-lg)',
            color: '#675032',
            textAlign: 'center'
          }}>
            あなたは<span style={{ color: '#ffffff', backgroundColor: '#675032', padding: '0.2em 0.4em', borderRadius: 'var(--radius-small)' }}>『{animalName}型』</span>
          </h2>
          
          <h3 className="heading_h3" style={{ 
            marginBottom: 'var(--spacing-md)',
            color: '#675032',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {catchPhrase}
          </h3>
          
          <p className="paragraph_large" style={{ 
            maxWidth: '600px', 
            margin: '0 auto var(--spacing-lg)',
            color: '#675032',
            textAlign: 'center',
            opacity: 0.8
          }}>
            {oneLiner}
          </p>
          
          {/* CTAボタン - 相談ボタン */}
          <motion.button
            onClick={handleOpenContactForm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button on-accent-primary"
            style={{
              backgroundColor: '#675032',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-medium)',
              padding: 'var(--spacing-md) var(--spacing-lg)',
              fontSize: 'var(--text-size-medium)',
              fontWeight: '600',
              marginBottom: 'var(--spacing-xxl)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            無料キャリア相談をする
          </motion.button>
        </motion.div>
          </div>
        </div>
      </section>

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
        {/* レーダーチャートとタイプコード */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <TypeRadarChart axisScores={results.axisScores} />
          
          <div style={{
            backgroundColor: '#F7FAFC',
            borderRadius: '12px',
            padding: '16px 24px',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2D3748', margin: 0 }}>
              タイプコード: <span style={{ color: professionColor }}>{typeCode}</span>
            </h3>
            <div style={{ 
              display: 'flex',
              gap: '16px',
              fontSize: '14px',
              color: '#675032'
            }}>
              <div>S/G: {Math.round((results.axisScores.specialist + 1) * 50)}%</div>
              <div>I/C: {Math.round((results.axisScores.innovative + 1) * 50)}%</div>
              <div>H/T: {Math.round((results.axisScores.human + 1) * 50)}%</div>
              <div>A/P: {Math.round((results.axisScores.analytical + 1) * 50)}%</div>
            </div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="tabs-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
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

        {/* タブコンテンツ */}
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '0 10px',
          minHeight: '400px'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeTab === 'share' ? (
                <ShareSection 
                  resultType={results.title || typeCode} 
                  profession={profession}
                />
              ) : (
                <ResultSummary 
                  result={results} 
                  tab={activeTab} 
                  profession={profession} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* アクションボタン - 位置調整済み */}
        <div className="action-buttons" style={{
          marginTop: '80px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '900px',
          margin: '80px auto 0',
          paddingTop: '30px',
          position: 'relative',
          zIndex: 5
        }}>
          <button
            onClick={handleOpenContactForm}
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
            onClick={handleRestartClick}
            className="button is-secondary"
            style={{
              backgroundColor: 'transparent',
              color: '#675032',
              border: '2px solid #675032',
              borderRadius: 'var(--radius-medium)',
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              fontSize: 'var(--text-size-medium)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            <span>診断をやり直す</span>
          </button>
        </div>
      </motion.div>

      {/* フッター - 修正済みリンク */}
      <footer className="section is-secondary" style={{ textAlign: 'center', paddingTop: 'var(--spacing-xl)' }}>
        <div className="container">
          <p className="paragraph_small" style={{ color: '#675032', marginBottom: 'var(--spacing-sm)' }}>MediMatchは看護師・薬剤師・リハビリ系（PT/OT/ST）などのためのキャリア診断</p>
          <p className="paragraph_small" style={{ color: '#675032' }}>© 2021 MediMatch. All rights reserved.</p>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/policy');
            }}
            className="text-link"
            style={{ color: '#675032', marginTop: 'var(--spacing-sm)', display: 'inline-block' }}
          >
            プライバシーポリシー・利用規約・お問い合わせ
          </a>
        </div>
      </footer>

      {/* 追従ボタン */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '20px',
        zIndex: 100
      }}>
        <motion.button
          onClick={handleOpenContactForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: professionColor,
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

      {/* 予約フォームモーダル */}
      {showContactForm && (
        <QuickConsultationForm 
          resultType={results.title || typeCode}
          profession={profession}
          postalCode={postalCode}
          onClose={handleCloseContactForm}
        />
      )}

      {/* モバイル対応のためのスタイル */}
      <style jsx="true">{`
        /* モバイル表示（480px以下）用のスタイル */
        @media (max-width: 480px) {
          .header-section {
            padding: 30px 15px 60px !important;
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
          
          .tabs-container {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(3, auto) !important;
            gap: 8px !important;
            padding: 8px !important;
          }
          
          .tabs-container button {
            font-size: 13px !important;
            padding: 8px 12px !important;
            min-width: auto !important;
          }
          
          .action-buttons {
            margin-top: 20px !important;
            marginBottom: '20px',
            padding-bottom: 80px !important;
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
            padding: 40px 20px 70px !important;
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

export default EnhancedResultScreen;