import React from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ question, onAnswer, currentStep, totalSteps, currentAnswer }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
  };

  const options = [
    {
      value: 'strong_yes',
      label: '強く同意する',
      icon: '😄',
      color: '#3B82F6',
    },
    {
      value: 'yes',
      label: '同意する',
      icon: '🙂',
      color: '#60A5FA',
    },
    {
      value: 'somewhat_yes',
      label: 'やや同意する',
      icon: '🤔',
      color: '#93C5FD',
    },
    {
      value: 'somewhat_no',
      label: 'やや反対する',
      icon: '😕',
      color: '#FCA5A5',
    },
    {
      value: 'no',
      label: '反対する',
      icon: '🙁',
      color: '#F87171',
    },
    {
      value: 'strong_no',
      label: '強く反対する',
      icon: '😠',
      color: '#EF4444',
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* プログレスバー */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#4B5563'
        }}>
          <span>質問 {currentStep} / {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% 完了</span>
        </div>
        <div style={{ 
          height: '8px', 
          backgroundColor: '#E5E7EB', 
          borderRadius: '999px', 
          overflow: 'hidden',
          position: 'relative'
        }}>
          <motion.div
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #1A6CBF, #65A9E5)',
              borderRadius: '999px',
              position: 'absolute',
              top: 0,
              left: 0
            }}
            initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* 質問 */}
      <div style={{ 
        marginBottom: '40px', 
        borderLeft: '5px solid #1A6CBF',
        paddingLeft: '24px',
        position: 'relative'
      }}>
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          style={{ 
            fontSize: '26px',
            fontWeight: '700',
            color: '#1E3A8A',
            marginBottom: '12px',
            lineHeight: 1.3
          }}
        >
          {question.text}
        </motion.h2>
        {question.subtext && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{ 
              fontSize: '16px',
              color: '#6B7280',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            {question.subtext}
          </motion.p>
        )}
      </div>

      {/* 選択肢 */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {options.map((option, index) => {
          const isSelected = currentAnswer === option.value;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                border: `2px solid ${isSelected ? option.color : '#E5E7EB'}`,
                borderRadius: '12px',
                backgroundColor: isSelected ? `${option.color}15` : 'white',
                color: option.color,
                cursor: 'pointer',
                boxShadow: isSelected ? `0 4px 12px ${option.color}30` : '0 2px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              <div style={{
                fontSize: '28px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isSelected ? 'white' : '#F9FAFB',
                borderRadius: '50%',
                flexShrink: 0
              }}>
                {option.icon}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: isSelected ? option.color : '#4B5563'
                }}>
                  {option.label}
                </div>
              </div>
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ 
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    backgroundColor: option.color,
                    borderRadius: '50%',
                    color: 'white'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ヒント */}
      {question.hint && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '32px',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '12px', flexShrink: 0 }}
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span style={{ lineHeight: 1.6 }}>{question.hint}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionCard;