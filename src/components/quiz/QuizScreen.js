import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackQuestionAnswer, trackQuizComplete } from '../utils/analytics';

const QuizScreen = ({ questions, onComplete }) => {
  const QUESTIONS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [direction, setDirection] = useState(1); // 1:前進, -1:後退
  const [startTime, setStartTime] = useState(Date.now()); // 診断開始時間
  
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // コンポーネントマウント時に開始時間を設定
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // 質問ごとのラベル定義
  const getQuestionLabels = (questionId) => {
    // 質問IDに基づいて適切なラベルを返す
    const labelsMap = {
      // 基本質問
      1: { negative: "関心がない", positive: "関心がある" },
      2: { negative: "好きではない", positive: "好き" },
      3: { negative: "得意ではない", positive: "得意である" },
      4: { negative: "重視していない", positive: "重視している" },
      5: { negative: "指示を受ける方が好き", positive: "自分で判断したい" },
      6: { negative: "やりがいを感じない", positive: "やりがいを感じる" },
      7: { negative: "抵抗がある", positive: "抵抗はない" },
      8: { negative: "興味がない", positive: "興味がある" },
      9: { negative: "あまり重視していない", positive: "重視している" },
      10: { negative: "大規模な環境が好き", positive: "小規模な環境が好き" },
      11: { negative: "専門性を重視する", positive: "幅広さを重視する" },
      12: { negative: "興味がない", positive: "興味がある" },
      13: { negative: "あまり考えない", positive: "貢献したいと考える" },
      14: { negative: "あまり重視していない", positive: "重視している" },
      15: { negative: "キャリアアップを重視する", positive: "安定を重視する" },
      // 看護師向け追加質問
      16: { negative: "興味がない", positive: "興味がある" },
      17: { negative: "あまり関心がない", positive: "関心がある" },
      18: { negative: "あまりやりがいを感じない", positive: "やりがいを感じる" },
    };
    
    // 質問IDに対応するラベルがない場合はデフォルト値を返す
    return labelsMap[questionId] || { negative: "反対する", positive: "賛成する" };
  };

  // 回答チェックのみを行う - スクロールなし
  useEffect(() => {
    const allAnswered = currentQuestions.every(
      (q) => answers[q.id] !== undefined
    );
    setIsNextEnabled(allAnswered);
  }, [answers, currentQuestions]);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    
    // 回答イベントのトラッキング
    const questionIndex = questions.findIndex(q => q.id === questionId);
    trackQuestionAnswer(questionIndex, questionId, value);
    
    // 回答時にはスクロールしない
  };

  // 明示的にスクロール処理を含むページ遷移関数
  const handleNext = () => {
    if (!isNextEnabled) return;
    setDirection(1);
    
    if (currentPage < totalPages - 1) {
      // ページ遷移前にスクロール処理を実行
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // スクロール後にページを変更
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
      }, 100); // スクロールのアニメーションが開始されるのを少し待つ
    } else {
      // 結果画面へ遷移する前にスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // スクロール開始後に結果画面に遷移
      setTimeout(() => {
        // 回答時間を計算（秒単位）
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        
        // 診断完了イベントのトラッキング
        trackQuizComplete('completed', timeSpent);
        
        // 重要な修正部分: イベントオブジェクトを返さないようにする
        const answerArray = questions.map((q) => answers[q.id]);
        if (typeof onComplete === 'function') {
          onComplete(answerArray);
        }
      }, 100);
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 0) {
      setDirection(-1);
      
      // ページ遷移前にスクロール処理を実行
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // スクロール後にページを変更
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
      }, 100);
    }
  };

  // ページ遷移アニメーションのバリアント
  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (

    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/patterns/medical_pattern_light.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#EDF2F7',
        fontFamily: `'Inter', 'Noto Sans JP', sans-serif`,
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(6px)',
          padding: '16px 0',
          textAlign: 'center',
          fontWeight: '600',
          color: '#1A6CBF',
          fontSize: '18px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          zIndex: 10
        }}
      >
        質問 {currentPage * QUESTIONS_PER_PAGE + 1}〜
        {Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length)} / {questions.length}
      </header>

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '40px 20px 100px',
          position: 'relative'
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentQuestions.map((question) => {
              // 質問ごとのラベルを取得
              const labels = getQuestionLabels(question.id);
              
              return (
                <div
                  key={question.id}
                  style={{
                    marginBottom: '60px',
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#333', 
                    marginBottom: '20px'
                  }}>
                    {question.text}
                  </h3>

                  {/* 7段階選択の新しいUIスタイル */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '16px',
                  }}>
                    {/* ラベル表示 - 「反対する」「賛成する」 */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#4B5563', fontSize: '14px' }}>{labels.negative}</span>
                      <span style={{ color: '#4B5563', fontSize: '14px' }}>{labels.positive}</span>
                    </div>
                    
                    {/* 7段階の選択肢 */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      gap: '4px'
                    }}>
                      {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                        <label key={value} style={{ display: 'block', flex: '1' }}>
                          <input
                            type="radio"
                            name={`q-${question.id}`}
                            value={value}
                            checked={answers[question.id] === value}
                            onChange={() => handleAnswer(question.id, value)}
                            style={{ display: 'none' }}
                          />
                          <div
                            style={{
                              width: '100%',
                              aspectRatio: '1/1',
                              maxWidth: '42px',
                              margin: '0 auto',
                              borderRadius: '50%',
                              backgroundColor: 
                                answers[question.id] === value ? '#1A6CBF' : '#E5E7EB',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            <span
                              style={{
                                width: '30%',
                                height: '30%',
                                borderRadius: '50%',
                                backgroundColor: 
                                  answers[question.id] === value ? '#fff' : 'transparent',
                              }}
                            ></span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーションボタン */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px',
          marginTop: '40px'
        }}>
          {currentPage > 0 && (
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'white',
                color: '#1A6CBF',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #1A6CBF',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              前へ
            </motion.button>
          )}
          
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            disabled={!isNextEnabled}
            whileHover={isNextEnabled ? { scale: 1.05 } : {}}
            whileTap={isNextEnabled ? { scale: 0.95 } : {}}
            style={{
              backgroundColor: isNextEnabled ? '#1A6CBF' : '#A5B4FC',
              color: 'white',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '999px',
              cursor: isNextEnabled ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: isNextEnabled ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {currentPage === totalPages - 1 ? '結果を見る' : '次へ'}
          </motion.button>
        </div>
      </div>
      
      {/* レスポンシブ対応用のグローバルスタイル */}
      <style jsx="true">{`
        /* グローバルスタイル */
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        /* モバイル対応 */
        @media (max-width: 768px) {
          h3 {
            font-size: 16px !important;
          }
          
          .navigation-buttons {
            padding-bottom: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizScreen;