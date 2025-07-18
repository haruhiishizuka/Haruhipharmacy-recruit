import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const QuizScreen = ({ questions, onComplete, onReturnHome, onNavigateToPage, onConsultation }) => {
  const QUESTIONS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [direction, setDirection] = useState(1);
  
  const quizContentRef = useRef(null);
  const headerRef = useRef(null);
  
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // 質問ごとのラベル定義
  const getQuestionLabels = (questionId) => {
    const labelsMap = {
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
      16: { negative: "興味がない", positive: "興味がある" },
      17: { negative: "あまり関心がない", positive: "関心がある" },
      18: { negative: "あまりやりがいを感じない", positive: "やりがいを感じる" },
    };
    
    return labelsMap[questionId] || { negative: "反対する", positive: "賛成する" };
  };

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
  };

  const scrollToQuizTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (!isNextEnabled) return;
    setDirection(1);

    if (currentPage < totalPages - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const answerArray = questions.map((q) => answers[q.id]);
        if (typeof onComplete === 'function') {
          onComplete(answerArray);
        }
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setDirection(-1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
      }, 100);
    }
  };

  useEffect(() => {
    scrollToQuizTop();
  }, []);

  useEffect(() => {
    scrollToQuizTop();
  }, [currentPage]);

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
        activeRoute="/quiz"
      />

      {/* Header */}
      <header className="section" style={{ padding: 'var(--spacing-md) 0' }}>
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">診断ステップ 2</div>
            <h1 className="heading_h2">質問に答えてください</h1>
            <p className="paragraph" style={{ color: '#2d5a2a' }}>
              質問 {currentPage * QUESTIONS_PER_PAGE + 1}〜
              {Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length)} / {questions.length}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="section">
        <div className="container is-small">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
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
                {currentQuestions.map((question) => {
                  const labels = getQuestionLabels(question.id);
                  
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
                        color: '#2d5a2a'
                      }}>
                        {question.text}
                      </h3>

                      {/* スケール選択UI */}
                      <div className="flex_vertical gap-medium">
                        <div className="flex_horizontal" style={{ 
                          justifyContent: 'space-between',
                          marginBottom: 'var(--spacing-md)'
                        }}>
                          <span className="paragraph_small" style={{ color: '#2d5a2a', opacity: 0.8 }}>
                            {labels.negative}
                          </span>
                          <span className="paragraph_small" style={{ color: '#2d5a2a', opacity: 0.8 }}>
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
                                checked={answers[question.id] === value}
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
                                    answers[question.id] === value ? '#2d5a2a' : 'var(--neutral-100)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  border: `2px solid ${
                                    answers[question.id] === value ? '#2d5a2a' : 'var(--neutral-300)'
                                  }`,
                                  transform: answers[question.id] === value ? 'scale(1.1)' : 'scale(1)'
                                }}
                              >
                                {answers[question.id] === value && (
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
                              color: '#2d5a2a',
                              opacity: 0.6,
                              textAlign: 'center',
                              flex: '1'
                            }}>
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex_horizontal" style={{ 
                justifyContent: 'center',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-xxl)',
                marginBottom: 'var(--spacing-xl)'
              }}>
                {currentPage > 0 && (
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
                      color: '#2d5a2a',
                      border: '2px solid #2d5a2a'
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
                    backgroundColor: isNextEnabled ? '#2d5a2a' : 'var(--neutral-400)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: isNextEnabled ? 'pointer' : 'not-allowed',
                    opacity: isNextEnabled ? 1 : 0.6
                  }}
                >
                  {currentPage === totalPages - 1 ? '結果を見る' : '次へ'}
                </motion.button>
              </div>

              {/* Progress Indicator */}
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
                    backgroundColor: index === currentPage ? '#2d5a2a' : 'var(--neutral-300)'
                  }}></div>
                ))}
              </div>

              <div className="text-align_center" style={{ marginTop: 'var(--spacing-md)' }}>
                <p className="paragraph_small" style={{ color: '#2d5a2a' }}>
                  ページ {currentPage + 1} / {totalPages}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default QuizScreen;