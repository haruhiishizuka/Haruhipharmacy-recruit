import React, { useState, useEffect } from 'react';
import './styles.css';
import { processQuizResults, normalizeResultData } from './utils/quizUtils';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultScreen from './components/results/ResultScreen';
import ProfessionSelect from './components/quiz/ProfessionSelect';

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, profession, quiz, result
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [profession, setProfession] = useState('');
  
  // 画面遷移のデバッグログ
  useEffect(() => {
    console.log(`📱 画面遷移: ${screen}`, {
      profession,
      quizResult: quizResult ? '結果あり' : '結果なし'
    });
  }, [screen, profession, quizResult]);

  // 質問データ
  const questions = [
    {
      id: 1,
      text: "新しい医療技術や治療法を学ぶことに強い関心がありますか？"
    },
    {
      id: 2,
      text: "チームのリーダーとして責任を持つことが好きですか？"
    },
    {
      id: 3,
      text: "業務プロセスの改善や効率化を考えることが得意ですか？"
    },
    {
      id: 4,
      text: "患者さんと深く関わり、長期的な関係を築くことを重視しますか？"
    },
    {
      id: 5,
      text: "独立して働くことや、自分で判断する機会が多い環境を好みますか？"
    },
    {
      id: 6,
      text: "医療の最前線で急性期や緊急時の対応をすることにやりがいを感じますか？"
    },
    {
      id: 7,
      text: "新しい職場環境や多様な医療現場を経験することに抵抗はありませんか？"
    },
    {
      id: 8,
      text: "他の医療従事者に知識や技術を教えることに興味がありますか？"
    },
    {
      id: 9,
      text: "ワークライフバランスを重視したいと考えていますか？"
    },
    {
      id: 10,
      text: "大規模な医療機関よりも、小規模でアットホームな環境の方が合っていると感じますか？"
    },
    {
      id: 11,
      text: "専門分野を極めるより、幅広い経験を積むことを重視しますか？"
    },
    {
      id: 12,
      text: "医療と経営の両面に興味がありますか？"
    },
    {
      id: 13,
      text: "地域医療や在宅医療に貢献したいと考えることがありますか？"
    },
    {
      id: 14,
      text: "論理的に考え、データや根拠に基づいた医療を重視しますか？"
    },
    {
      id: 15,
      text: "将来的にはキャリアアップよりも、安定した環境で長く働きたいと考えていますか？"
    }
  ];

  // 職種選択マッピング
  const professionMap = {
    'nurse': '看護師',
    'pharmacist': '薬剤師',
    'therapist': 'リハビリ系',
    'other': 'その他医療職'
  };

  // 職種選択の処理
  const handleProfessionSelect = (selectedProfession) => {
    console.log(`👩‍⚕️ 選択された職種: ${selectedProfession} (${professionMap[selectedProfession] || '不明'})`);
    setProfession(professionMap[selectedProfession] || selectedProfession);
    // 郵便番号入力画面をスキップして直接質問画面へ
    setScreen('quiz');
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
      setScreen('result');
    } else {
      console.error('❌ 無効な回答データ:', answerArray);
    }
  };

  // 診断をやり直す処理
  const handleRestart = () => {
    console.log('🔄 診断をやり直します');
    setScreen('welcome');
    setAnswers([]);
    setQuizResult(null);
    setProfession('');
  };

  // 画面の切り替え
  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onStartQuiz={() => setScreen('profession')} />;
      case 'profession':
        return <ProfessionSelect selectedProfession="" onSelect={handleProfessionSelect} />;
      case 'quiz':
        return <QuizScreen questions={questions} onComplete={handleQuizComplete} />;
      case 'result':
        const normalizedResult = normalizeResultData(quizResult);
        console.log('📊 正規化された結果データ:', normalizedResult);
        
        return (
          <ResultScreen 
            results={normalizedResult} 
            profession={profession}
            answers={answers}
            onRestart={handleRestart}
          />
        );
      default:
        return <WelcomeScreen onStartQuiz={() => setScreen('profession')} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App;