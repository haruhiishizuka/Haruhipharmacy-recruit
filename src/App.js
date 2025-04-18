import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { processQuizResults, normalizeResultData } from './utils/quizUtils';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import ProfessionSelect from './components/quiz/ProfessionSelect';
import QuizScreen from './components/quiz/QuizScreen';
import QuickConsultationForm from './components/results/QuickConsultationForm';
import PolicyPage from './components/PolicyPage';
import EnhancedResultScreen from './components/results/EnhancedResultScreen';

// AppコンテンツコンポーネントはRouteから渡されるパラメータを使用
function AppContent() {
  // アプリケーションの状態管理
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [profession, setProfession] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
  
  // React Routerのフック
  const navigate = useNavigate();
  const location = useLocation();
  
  // アプリケーションの初期化とルートの確認
  useEffect(() => {
    console.log('App initializing...', location.pathname);
    
    // 無効なルートへのアクセスを修正
    if (location.pathname !== '/' && 
        location.pathname !== '/profession' && 
        location.pathname !== '/quiz' && 
        location.pathname !== '/result' && 
        location.pathname !== '/policy') {
      console.log('無効なルートへのアクセスを検出: ', location.pathname);
      navigate('/', { replace: true });
    }
    
    // 画面表示時に短いローディング状態を設ける (特にモバイル向け)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialized(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 画面遷移のデバッグログ
  useEffect(() => {
    if (initialized) {
      console.log(`📱 URL遷移: ${location.pathname}`, {
        profession,
        postalCode: postalCode || 'なし',
        quizResult: quizResult ? '結果あり' : '結果なし',
        userAgent: navigator.userAgent,
        isMobile: /Mobi|Android/i.test(navigator.userAgent)
      });
    }
  }, [location, profession, postalCode, quizResult, initialized]);

  // アニメーション用のバリアント
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 基本質問セット - 共通質問
  const baseQuestions = [
    {
      id: 1,
      text: "新しい医療技術や治療法を学ぶことに強い関心がありますか？",
      axis: "specialist", // S型（専門的）を示す軸
      weight: 1.0
    },
    {
      id: 2,
      text: "チームのリーダーとして責任を持つことが好きですか？",
      axis: "innovative", // I型（革新的）を示す軸
      weight: 0.7
    },
    {
      id: 3,
      text: "業務プロセスの改善や効率化を考えることが得意ですか？",
      axis: "analytical", // A型（分析的）を示す軸
      weight: 0.8
    },
    {
      id: 4,
      text: "患者さんと深く関わり、長期的な関係を築くことを重視しますか？",
      axis: "human", // H型（人間中心）を示す軸
      weight: 1.0
    },
    {
      id: 5,
      text: "独立して働くことや、自分で判断する機会が多い環境を好みますか？",
      axis: "specialist", // S型（専門的）を示す軸
      weight: 0.7
    },
    {
      id: 6,
      text: "医療の最前線で急性期や緊急時の対応をすることにやりがいを感じますか？",
      axis: "innovative", // I型（革新的）を示す軸
      weight: 0.8
    },
    {
      id: 7,
      text: "新しい職場環境や多様な医療現場を経験することに抵抗はありませんか？",
      axis: "innovative", // I型（革新的）を示す軸
      weight: 0.6
    },
    {
      id: 8,
      text: "他の医療従事者に知識や技術を教えることに興味がありますか？",
      axis: "human", // H型（人間中心）を示す軸
      weight: 0.7
    },
    {
      id: 9,
      text: "ワークライフバランスを重視したいと考えていますか？",
      axis: "human", // H型（人間中心）を示す軸
      weight: 0.5
    },
    {
      id: 10,
      text: "大規模な医療機関よりも、小規模でアットホームな環境の方が合っていると感じますか？",
      axis: "specialist", // S型の逆、G型（総合的）を示す
      weight: -0.6 // 負の値はG型を示す
    },
    {
      id: 11,
      text: "専門分野を極めるより、幅広い経験を積むことを重視しますか？",
      axis: "specialist", // S型の逆、G型（総合的）を示す
      weight: -0.8 // 負の値はG型を示す
    },
    {
      id: 12,
      text: "医療と経営の両面に興味がありますか？",
      axis: "analytical", // A型（分析的）を示す軸
      weight: 0.6
    },
    {
      id: 13,
      text: "地域医療や在宅医療に貢献したいと考えることがありますか？",
      axis: "human", // H型（人間中心）を示す軸
      weight: 0.7
    },
    {
      id: 14,
      text: "論理的に考え、データや根拠に基づいた医療を重視しますか？",
      axis: "analytical", // A型（分析的）を示す軸
      weight: 1.0
    },
    {
      id: 15,
      text: "将来的にはキャリアアップよりも、安定した環境で長く働きたいと考えていますか？",
      axis: "innovative", // I型の逆、C型（保守的）を示す
      weight: -0.8 // 負の値はC型を示す
    }
  ];

  // 職種ごとの追加質問または質問の置き換え
  const nurseQuestions = [
    {
      id: 16,
      text: "看護記録や患者データの管理・分析に興味がありますか？",
      axis: "analytical",
      weight: 0.7,
      subtext: "看護情報学やデータに基づく看護実践に関する質問です"
    },
    {
      id: 17,
      text: "特定の疾患や症状に対する専門的な看護ケアの提供に関心がありますか？",
      axis: "specialist",
      weight: 0.9,
      subtext: "専門・認定看護師などのスペシャリストとしてのキャリアに関する質問です"
    },
    {
      id: 18,
      text: "患者さんの精神的・心理的サポートを提供することにやりがいを感じますか？",
      axis: "human",
      weight: 0.8,
      subtext: "メンタルケアや心理的支援に関する質問です"
    }
  ];

  const pharmacistQuestions = [
    {
      id: 16,
      text: "薬物療法の効果や副作用のモニタリングと分析に興味がありますか？",
      axis: "analytical",
      weight: 0.8,
      subtext: "薬学的管理や臨床判断に関する質問です"
    },
    {
      id: 17,
      text: "特定の疾患（がん、感染症など）に関する専門的な薬学知識を深めたいと思いますか？",
      axis: "specialist",
      weight: 0.9,
      subtext: "専門・認定薬剤師などのスペシャリストとしてのキャリアに関する質問です"
    },
    {
      id: 18,
      text: "患者さんへの服薬指導や薬の正しい使い方の教育に関心がありますか？",
      axis: "human",
      weight: 0.7,
      subtext: "患者教育や服薬支援に関する質問です"
    }
  ];

  const therapistQuestions = [
    {
      id: 16,
      text: "患者さんのリハビリ進捗データの分析や評価に興味がありますか？",
      axis: "analytical",
      weight: 0.7,
      subtext: "データに基づくリハビリテーション評価に関する質問です"
    },
    {
      id: 17,
      text: "特定の疾患や障害（脳卒中、スポーツ障害など）に特化したリハビリ技術を磨きたいと思いますか？",
      axis: "specialist",
      weight: 0.8,
      subtext: "専門的なリハビリテーション技術に関する質問です"
    },
    {
      id: 18,
      text: "患者さんやご家族への生活指導やホームエクササイズの提案に関心がありますか？",
      axis: "human",
      weight: 0.8,
      subtext: "日常生活動作の支援や家族指導に関する質問です"
    }
  ];

  const otherQuestions = [
    {
      id: 16,
      text: "医療データやエビデンスの分析・評価に興味がありますか？",
      axis: "analytical",
      weight: 0.8,
      subtext: "データ分析や研究的アプローチに関する質問です"
    },
    {
      id: 17,
      text: "自分の専門分野における高度な知識や技術を極めたいと思いますか？",
      axis: "specialist",
      weight: 0.9,
      subtext: "専門性を高めるキャリア志向に関する質問です"
    },
    {
      id: 18,
      text: "患者さんや他の医療従事者とのコミュニケーションに重きを置いていますか？",
      axis: "human",
      weight: 0.7,
      subtext: "対人関係やコミュニケーションスキルに関する質問です"
    }
  ];

  // 職種に応じた質問セットを取得する関数
  const getQuestionsByProfession = () => {
    let questionsSet = [...baseQuestions];
    
    switch(profession) {
      case '看護師':
        return [...questionsSet, ...nurseQuestions];
      case '薬剤師':
        return [...questionsSet, ...pharmacistQuestions];
      case 'リハビリ系':
        return [...questionsSet, ...therapistQuestions];
      case 'その他医療職':
        return [...questionsSet, ...otherQuestions];
      default:
        return questionsSet;
    }
  };

  // 職種選択マッピング
  const professionMap = {
    'nurse': '看護師',
    'pharmacist': '薬剤師',
    'therapist': 'リハビリ系',
    'other': 'その他医療職'
  };

  // 職種選択の処理 - URLも変更
  const handleProfessionSelect = (selectedProfession) => {
    console.log(`👩‍⚕️ 選択された職種: ${selectedProfession} (${professionMap[selectedProfession] || '不明'})`);
    setProfession(professionMap[selectedProfession] || selectedProfession);
    // セッションストレージに保存
    sessionStorage.setItem('profession', professionMap[selectedProfession] || selectedProfession);
    // 質問画面にナビゲート
    navigate('/quiz');
  };

  // 郵便番号入力の処理
  const handlePostalCodeSubmit = (code) => {
    console.log(`📮 入力された郵便番号: ${code}`);
    setPostalCode(code);
    navigate('/quiz');
  };

  // 質問回答完了時の処理
  const handleQuizComplete = (answerArray) => {
    console.log('📝 質問への回答完了:', answerArray);
    
    // 回答データを処理
    if (Array.isArray(answerArray)) {
      // 回答データを保存
      setAnswers(answerArray);
      
      // 診断結果を計算
      const result = processQuizResults(answerArray);
      console.log('🧠 診断結果:', result);
      setQuizResult(result);
      
      // 結果画面に遷移
      navigate('/result');
    } else {
      console.error('❌ 無効な回答データ:', answerArray);
    }
  };
  
  // App.js内のhandleRestart関数
  const handleRestart = () => {
    console.log('🔄 診断をやり直します');
  
    // 画面上部へのスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    // 少し遅延させて状態をリセット
    setTimeout(() => {
      setAnswers([]);
      setQuizResult(null);
      setProfession('');
      setPostalCode('');
      // ホーム画面にナビゲート
      navigate('/');
    }, 300); // スクロールが始まってから状態を変更
  };

  // コンタクトフォームの表示/非表示を切り替える
  const toggleContactForm = (isVisible) => {
    console.log(`📞 コンタクトフォーム表示: ${isVisible}`);
    setShowContactForm(isVisible);
  };

  // プライバシーポリシーページを表示する関数
  const handleOpenPolicy = () => {
    console.log('🔖 プライバシーポリシーページを表示します');
    // 画面上部へスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // ポリシーページに遷移
    navigate('/policy');
  };

  // ポリシーページからホームに戻る関数
  const handleReturnHome = () => {
    console.log('🏠 ホームに戻ります');
    // 画面上部へスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // ウェルカム画面に遷移
    navigate('/');
  };

  // ローディング表示
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        backgroundColor: '#65A9E5'
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          borderTop: '5px solid white',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  // URLに基づいて適切なコンポーネントをレンダリング
  const renderRouteContent = () => {
    // 初期化前はローディング表示
    if (!initialized) {
      return null;
    }
    
    // 特定のURLで特定の状態が必要な場合のチェック
    // 例：/resultアクセス時に結果がない場合はリダイレクト
    if (location.pathname === '/result' && !quizResult) {
      console.log('結果なしで/resultにアクセスしました - リダイレクトします');
      return <Navigate to="/" replace />;
    }
    
    // 同様に他のパスもチェック
    if (location.pathname === '/quiz' && !profession) {
      // ルート復元時はホームに戻す 
      return <Navigate to="/" replace />;
    }
    
    // URLパスに応じたコンポーネントをレンダリング
    switch (location.pathname) {
      case '/':
        return <WelcomeScreen onStartQuiz={() => navigate('/profession')} onOpenPolicy={handleOpenPolicy} />;
      case '/profession':
        return <ProfessionSelect selectedProfession="" onSelect={handleProfessionSelect} />;
      case '/quiz':
        // 職種に基づいた質問セットを取得
        const questionSet = getQuestionsByProfession();
        console.log(`🧩 職種「${profession}」に対する質問セット:`, questionSet.length, '問');
        
        return (
          <QuizScreen 
            questions={questionSet} 
            profession={profession} 
            onComplete={handleQuizComplete} 
          />
        );
      case '/result':
        const normalizedResult = normalizeResultData(quizResult);
        console.log('📊 正規化された結果データ:', normalizedResult);
        
        return (
          <EnhancedResultScreen 
            results={normalizedResult} 
            profession={profession}
            postalCode={postalCode}
            answers={answers}
            onRestart={handleRestart}
          />
        );
      case '/policy':
        return <PolicyPage onReturnHome={handleReturnHome} />;
      default:
        // 未定義のURLには404または再度ホームにリダイレクト
        console.log('未定義のURLパス:', location.pathname);
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="app-container" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="page-container"
          style={{ 
            width: '100%', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100vw',
            overflowX: 'hidden'
          }}
        >
          {renderRouteContent()}
        </motion.div>
      </AnimatePresence>
      
      {/* コンタクトフォームモーダル */}
      {showContactForm && (
        <QuickConsultationForm
          resultType={quizResult ? normalizeResultData(quizResult).title : ''}
          profession={profession}
          postalCode={postalCode}
          onClose={() => toggleContactForm(false)}
        />
      )}
      
      {/* ローディングアニメーションのスタイル */}
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .app-container {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .page-container {
          width: 100%;
        }
        
        /* モバイル向けの追加スタイル */
        @media (max-width: 480px) {
          .app-container {
            padding: 0;
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          .page-container {
            width: 100vw;
            max-width: 100vw;
            overflow-x: hidden;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}

// メインのAppコンポーネント - RouterをここでラップしてRootコンポーネントからRenderします
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;