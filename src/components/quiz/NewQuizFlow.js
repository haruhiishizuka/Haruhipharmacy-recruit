import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mainQuestions, professions } from '../../data/newQuestions.js';
import { calculateCompleteResult } from '../../utils/newQuizUtils.js';
import NewResultDisplay from '../results/NewResultDisplay.js';
import GlobalNavigation from '../common/GlobalNavigation.js';

const NewQuizFlow = ({ onReturnHome, onConsultation, onNavigateToPage }) => {
  const [currentStep, setCurrentStep] = useState('profession'); // profession, quiz, result
  const [selectedProfession, setSelectedProfession] = useState('');
  const [allAnswers, setAllAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // デバッグ用のログ
  console.log('NewQuizFlow レンダリング:', { currentStep, selectedProfession, currentQuestionIndex });

  // 職種選択画面 - 従来のUIスタイルに合わせて調整
  const ProfessionSelect = () => (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={() => {}}
        activeRoute="/new-quiz"
      />

      {/* Main Content */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">新16タイプ診断 - ステップ 1</div>
            <h1 className="heading_h2">あなたの職種を教えてください</h1>
            <p className="subheading">職種に応じた診断を行い、より精度の高い結果をお届けします</p>
          </div>

          <motion.div 
            className="grid_2-col gap-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {professions.map((profession, index) => (
              <motion.button
                key={profession.id}
                onClick={() => {
                  setSelectedProfession(profession.id);
                  setCurrentStep('quiz');
                }}
                className="card profession-card"
                style={{
                  cursor: 'pointer',
                  border: '2px solid var(--neutral-300)',
                  backgroundColor: 'var(--neutral-primary)',
                  color: '#333333',
                  transition: 'all var(--transition-base)',
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-large)'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgb(0 0 0 / 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#333333';
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--neutral-300)';
                  e.currentTarget.style.backgroundColor = 'var(--neutral-primary)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-large)',
                  backgroundColor: '#d5e6d3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '32px'
                }}>
                  {profession.icon || '医療'}
                </div>
                
                <div>
                  <h3 className="heading_h4" style={{
                    marginBottom: 'var(--spacing-xs)',
                    color: '#333333'
                  }}>
                    {profession.label}
                  </h3>
                  <p className="paragraph_small" style={{
                    color: '#333333',
                    lineHeight: '1.4',
                    opacity: 0.7
                  }}>
                    {profession.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="flex_horizontal gap-small is-align-center"
            style={{ 
              justifyContent: 'center', 
              marginTop: 'var(--spacing-xl)' 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: '#333333'
            }}></div>
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'var(--neutral-300)'
            }}></div>
            <div style={{
              width: '12px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'var(--neutral-300)'
            }}></div>
          </motion.div>

          <motion.div
            className="text-align_center"
            style={{ marginTop: 'var(--spacing-md)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="paragraph_small" style={{ color: '#333333' }}>
              ステップ 1 / 3
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );

  // 統合質問画面 - 24問すべてを処理
  const QuizQuestions = () => {
    const QUESTIONS_PER_PAGE = 6;
    const totalPages = Math.ceil(mainQuestions.length / QUESTIONS_PER_PAGE);
    const currentPageQuestions = mainQuestions.slice(
      currentQuestionIndex * QUESTIONS_PER_PAGE,
      (currentQuestionIndex + 1) * QUESTIONS_PER_PAGE
    );
    const [direction, setDirection] = useState(1);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    // 従来システムと同じ回答チェック
    useEffect(() => {
      const allAnswered = currentPageQuestions.every(
        (q) => allAnswers[q.id] !== undefined
      );
      setIsNextEnabled(allAnswered);
    }, [allAnswers, currentPageQuestions]);

    const handleAnswer = (questionId, value) => {
      setAllAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    };

    // 従来システムと同じナビゲーション処理
    const handleNext = () => {
      if (!isNextEnabled) return;
      setDirection(1);

      if (currentQuestionIndex < totalPages - 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          console.log('全質問完了！結果計算開始...');
          calculateResult();
        }, 300);
      }
    };

    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        setDirection(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }, 100);
      }
    };

    // 質問ごとのラベル定義（従来システムと同じパターン）
    const getQuestionLabels = (question) => {
      if (question.riasec === 'Behavior' || question.riasec === 'Stress') {
        return { negative: "当てはまらない", positive: "当てはまる" };
      }
      return { negative: "全く当てはまらない", positive: "非常に当てはまる" };
    };

    // 結果計算関数
    const calculateResult = async () => {
      setIsLoading(true);
      
      console.log('結果計算開始:', {
        allAnswers,
        profession: selectedProfession,
        answersCount: Object.keys(allAnswers).length
      });
      
      // 少し遅延を入れて計算している感を演出
      setTimeout(() => {
        try {
          // allAnswersをmainAnswersとstressAnswersに分割
          const mainAnswers = {};
          const stressAnswers = {};
          
          console.log('回答データ処理開始:', allAnswers);
          
          Object.entries(allAnswers).forEach(([questionId, answer]) => {
            const question = mainQuestions.find(q => q.id === parseInt(questionId));
            if (question) {
              if (question.riasec === 'Stress') {
                stressAnswers[questionId] = answer;
                console.log(`ストレス質問 ${questionId}: ${answer}`);
              } else {
                mainAnswers[questionId] = answer;
                console.log(`メイン質問 ${questionId} (${question.riasec}): ${answer}`);
              }
            } else {
              console.warn(`質問 ${questionId} が見つかりません`);
            }
          });

          console.log('分割後:', { mainAnswers, stressAnswers });

          const completeResult = calculateCompleteResult(
            mainAnswers,
            stressAnswers,
            selectedProfession
          );
          console.log('診断結果計算完了:', completeResult);
          
          if (!completeResult || !completeResult.personalityType) {
            throw new Error('診断結果が正しく計算されませんでした');
          }
          
          setResult(completeResult);
          setCurrentStep('result');
        } catch (error) {
          console.error('診断結果計算エラー:', error);
          console.error('スタックトレース:', error.stack);
          alert(`診断結果の計算中にエラーが発生しました: ${error.message}\n\nもう一度お試しください。`);
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    };

    // ローディング画面
    if (isLoading) {
      return (
        <div className="page_container" style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50)' }}>
          <GlobalNavigation 
            onReturnHome={onReturnHome}
            onNavigateToPage={onNavigateToPage}
            onConsultation={onConsultation}
            onStartQuiz={() => {}}
            activeRoute="/new-quiz"
          />
          
          <section className="section">
            <div className="container">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid var(--neutral-200)',
                  borderTop: '4px solid #333333',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: 'var(--spacing-lg)'
                }} />
                <h2 className="heading_h3" style={{ marginBottom: 'var(--spacing-sm)', color: '#333333' }}>
                  分析中...
                </h2>
                <p className="paragraph" style={{ color: '#333333', opacity: 0.7 }}>
                  あなたの回答を詳細に分析しています
                </p>
                
                <style jsx>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </motion.div>
            </div>
          </section>
        </div>
      );
    }

    // 従来システムと同じアニメーション設定
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
      <div className="page_container" style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50)' }}>
        {/* Navigation */}
        <GlobalNavigation 
          onReturnHome={onReturnHome}
          onNavigateToPage={onNavigateToPage}
          onConsultation={onConsultation}
          onStartQuiz={() => {}}
          activeRoute="/new-quiz"
        />

        {/* Header */}
        <header className="section" style={{ padding: 'var(--spacing-md) 0' }}>
          <div className="container">
            <div className="header is-align-center">
              <div className="eyebrow">新16タイプ診断 - ステップ 2</div>
              <h1 className="heading_h2">質問に答えてください</h1>
              <p className="paragraph" style={{ color: '#333333' }}>
                質問 {currentQuestionIndex * QUESTIONS_PER_PAGE + 1}〜
                {Math.min((currentQuestionIndex + 1) * QUESTIONS_PER_PAGE, mainQuestions.length)} / {mainQuestions.length}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="section">
          <div className="container is-small">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentQuestionIndex}
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="grid_2-col gap-large" style={{ 
                  '@media (max-width: 767px)': { 
                    gridTemplateColumns: '1fr' 
                  } 
                }}>
                  {currentPageQuestions.map((question) => {
                    const labels = getQuestionLabels(question);
                    
                    return (
                      <div key={question.id} className="card" style={{
                        backgroundColor: 'var(--neutral-primary)',
                        border: '1px solid var(--neutral-200)',
                        borderRadius: 'var(--radius-large)',
                        padding: 'var(--spacing-xl)',
                        marginBottom: 'var(--spacing-lg)'
                      }}>
                        <h3 className="heading_h4" style={{ 
                          marginBottom: 'var(--spacing-lg)',
                          color: '#333333'
                        }}>
                          {question.text}
                        </h3>

                        {/* 選択UI - 従来システムと統一 */}
                        {question.riasec === 'Behavior' || question.riasec === 'Stress' ? (
                          // 行動スタイル質問・ストレス質問の場合 - 縦に並ぶボタン
                          <div className="flex_vertical gap-small">
                            {question.riasec === 'Stress' && (
                              <div style={{
                                padding: 'var(--spacing-sm)',
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: 'var(--radius-medium)',
                                marginBottom: 'var(--spacing-sm)',
                                fontSize: '12px',
                                color: '#856404',
                                textAlign: 'center'
                              }}>
                                ヒント: どれか一つ、最も当てはまるものを選んでください
                              </div>
                            )}
                            {question.options.map((option, index) => {
                              const optionValue = option.behavior || option.stressType;
                              const isSelected = allAnswers[question.id] === optionValue;
                              const isStressQuestion = question.riasec === 'Stress';
                              
                              return (
                                <label key={index} style={{ 
                                  display: 'block', 
                                  cursor: 'pointer'
                                }}>
                                  <input
                                    type="radio"
                                    name={`q-${question.id}`}
                                    value={optionValue}
                                    checked={isSelected}
                                    onChange={() => handleAnswer(question.id, optionValue)}
                                    style={{ display: 'none' }}
                                  />
                                  <div
                                    className="button is-secondary"
                                    style={{
                                      backgroundColor: isSelected ? (isStressQuestion ? '#28a745' : '#333333') : 'transparent',
                                      color: isSelected ? '#ffffff' : '#333333',
                                      border: `2px solid ${isSelected ? (isStressQuestion ? '#28a745' : '#333333') : 'var(--neutral-300)'}`,
                                      textAlign: 'left',
                                      width: '100%',
                                      padding: 'var(--spacing-md) var(--spacing-lg)',
                                      fontSize: isStressQuestion ? '15px' : '14px',
                                      lineHeight: '1.5',
                                      transition: 'all 0.2s ease',
                                      position: 'relative',
                                      minHeight: isStressQuestion ? '60px' : 'auto',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseOver={(e) => {
                                      if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = isStressQuestion ? '#f8f9fa' : 'var(--neutral-50)';
                                        e.currentTarget.style.borderColor = isStressQuestion ? '#28a745' : '#333333';
                                      }
                                    }}
                                    onMouseOut={(e) => {
                                      if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = 'var(--neutral-300)';
                                      }
                                    }}
                                  >
                                    {isStressQuestion && (
                                      <span style={{
                                        display: 'inline-block',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: isSelected ? '#ffffff' : 'var(--neutral-200)',
                                        color: isSelected ? '#28a745' : '#333333',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        marginRight: 'var(--spacing-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                      }}>
                                        {String.fromCharCode(65 + index)}
                                      </span>
                                    )}
                                    <span style={{ flex: 1 }}>
                                      {option.text}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        ) : (
                          // 通常のRIASEC質問の場合 - 7段階スケール
                          <div className="flex_vertical gap-medium">
                            <div className="flex_horizontal" style={{ 
                              justifyContent: 'space-between',
                              marginBottom: 'var(--spacing-md)'
                            }}>
                              <span className="paragraph_small" style={{ color: '#333333', opacity: 0.8 }}>
                                {labels.negative}
                              </span>
                              <span className="paragraph_small" style={{ color: '#333333', opacity: 0.8 }}>
                                {labels.positive}
                              </span>
                            </div>
                            
                            <div className="flex_horizontal" style={{ 
                              justifyContent: 'space-between',
                              gap: 'var(--spacing-xs)'
                            }}>
                              {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                                <label key={value} style={{ 
                                  display: 'block', 
                                  flex: '1',
                                  cursor: 'pointer'
                                }}>
                                  <input
                                    type="radio"
                                    name={`q-${question.id}`}
                                    value={value}
                                    checked={allAnswers[question.id] === value}
                                    onChange={() => handleAnswer(question.id, value)}
                                    style={{ display: 'none' }}
                                  />
                                  <div
                                    style={{
                                      width: '100%',
                                      aspectRatio: '1/1',
                                      maxWidth: '40px',
                                      margin: '0 auto',
                                      borderRadius: '50%',
                                      backgroundColor: 
                                        allAnswers[question.id] === value ? '#333333' : 'var(--neutral-100)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      border: `2px solid ${
                                        allAnswers[question.id] === value ? '#333333' : 'var(--neutral-300)'
                                      }`,
                                      transform: allAnswers[question.id] === value ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                  >
                                    {allAnswers[question.id] === value && (
                                      <span
                                        style={{
                                          width: '10px',
                                          height: '10px',
                                          borderRadius: '50%',
                                          backgroundColor: 'white'
                                        }}
                                      />
                                    )}
                                  </div>
                                </label>
                              ))}
                            </div>
                            
                            {/* 数値表示 */}
                            <div className="flex_horizontal" style={{ 
                              justifyContent: 'space-between',
                              marginTop: 'var(--spacing-xs)'
                            }}>
                              {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                                <span key={value} style={{ 
                                  fontSize: 'var(--text-size-small)',
                                  color: '#333333',
                                  opacity: 0.6,
                                  textAlign: 'center',
                                  flex: '1'
                                }}>
                                  {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons - 従来システムと統一 */}
                <div className="flex_horizontal" style={{ 
                  justifyContent: 'center',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-xxl)',
                  marginBottom: 'var(--spacing-xl)'
                }}>
                  {currentQuestionIndex > 0 && (
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePrevious();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="button is-secondary"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#333333',
                        border: '2px solid #333333'
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
                    whileHover={isNextEnabled ? { scale: 1.02 } : {}}
                    whileTap={isNextEnabled ? { scale: 0.98 } : {}}
                    className="button"
                    style={{
                      backgroundColor: isNextEnabled ? '#333333' : 'var(--neutral-400)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: isNextEnabled ? 'pointer' : 'not-allowed',
                      opacity: isNextEnabled ? 1 : 0.6
                    }}
                  >
                    {currentQuestionIndex === totalPages - 1 ? '結果を見る' : '次へ'}
                  </motion.button>
                </div>

                {/* Progress Indicator - 従来システムと統一 */}
                <div className="flex_horizontal" style={{ 
                  justifyContent: 'center',
                  gap: 'var(--spacing-xs)',
                  marginTop: 'var(--spacing-lg)'
                }}>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <div key={index} style={{
                      width: '12px',
                      height: '4px',
                      borderRadius: '2px',
                      backgroundColor: index === currentQuestionIndex ? '#333333' : 'var(--neutral-300)'
                    }}></div>
                  ))}
                </div>

                <div className="text-align_center" style={{ marginTop: 'var(--spacing-md)' }}>
                  <p className="paragraph_small" style={{ color: '#333333' }}>
                    ページ {currentQuestionIndex + 1} / {totalPages}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    );
  };

  // 診断リセット機能
  const handleRetryQuiz = () => {
    setCurrentStep('profession');
    setSelectedProfession('');
    setAllAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--neutral-50)',
      width: '100%'
    }}>
      <AnimatePresence mode="wait">
        {currentStep === 'profession' && <ProfessionSelect />}
        {currentStep === 'quiz' && <QuizQuestions />}
        {currentStep === 'result' && result && (
          <NewResultDisplay
            result={result}
            onRetryQuiz={handleRetryQuiz}
            onConsultation={onConsultation}
            onReturnHome={onReturnHome}
            onNavigateToPage={onNavigateToPage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewQuizFlow;