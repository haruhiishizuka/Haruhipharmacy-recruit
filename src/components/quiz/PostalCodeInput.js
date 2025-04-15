
// PostalCodeInput.js の修正版
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostalCodeInput = ({ onSubmit }) => {
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 郵便番号入力の処理
  const handleChange = (e) => {
    const value = e.target.value;
    
    // 数字とハイフンのみ許可
    const cleanValue = value.replace(/[^\d-]/g, '');
    
    // 自動的に3文字後にハイフンを挿入
    if (cleanValue.length === 3 && !cleanValue.includes('-') && postalCode.length < 3) {
      setPostalCode(cleanValue + '-');
    } else {
      setPostalCode(cleanValue);
    }
    
    setError('');
  };
  
  // 送信処理
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // 入力チェック
    if (!postalCode) {
      setError('郵便番号を入力してください');
      return;
    }
    
    // 郵便番号の基本的な検証 (XXX-XXXX or XXXXXXX)
    const cleanCode = postalCode.replace(/-/g, '');
    if (cleanCode.length !== 7) {
      setError('正しい郵便番号を入力してください（例：123-4567）');
      return;
    }
    
    // 送信中表示
    setIsSubmitting(true);
    
    // 1秒後に結果を返す（実際のAPIコールの代わり）
    setTimeout(() => {
      setIsSubmitting(false);
      // 親コンポーネントに通知
      if (typeof onSubmit === 'function') {
        onSubmit(cleanCode);
      }
    }, 1000);
  };
  
  // Enterキーでの送信対応
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        padding: '40px 30px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <h3 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          textAlign: 'center',
          color: '#1A6CBF',
          marginBottom: '30px'
        }}>
          お住まいの地域の郵便番号を入力してください
        </h3>
        
        <div style={{
          backgroundColor: '#EBF8FF',
          border: '1px solid #BEE3F8',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{ color: '#3182CE', flexShrink: 0, marginTop: '4px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: '15px', color: '#2C5282', lineHeight: '1.6' }}>
            あなたの希望に合った地域の医療機関をご提案するために使用します。個人を特定する情報として保存されることはありません。
          </p>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="postalCode" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#4A5568', 
            marginBottom: '8px' 
          }}>
            郵便番号
          </label>
          
          <div style={{ position: 'relative' }}>
            <span style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '16px', 
              transform: 'translateY(-50%)', 
              pointerEvents: 'none', 
              color: '#718096' 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"></path>
                <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.7 1.1z"></path>
              </svg>
            </span>
            
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="例: 123-4567"
              maxLength="8"
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                fontSize: '18px',
                border: `1px solid ${error ? '#E53E3E' : '#CBD5E0'}`,
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: error ? '0 0 0 2px rgba(229, 62, 62, 0.2)' : 'none',
              }}
            />
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: '#E53E3E',
                fontSize: '14px',
                margin: '8px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </motion.p>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#1659A2' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: '100%',
            backgroundColor: '#1A6CBF',
            color: 'white',
            border: 'none',
            borderRadius: '32px',
            padding: '14px 36px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isSubmitting ? 0.7 : 1,
            boxShadow: '0 4px 12px rgba(26, 108, 191, 0.3)',
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{
                animation: 'spin 1s linear infinite',
                marginRight: '8px',
                width: '20px',
                height: '20px'
              }}>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              処理中...
            </span>
          ) : (
            <>
              <span>次へ進む</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </motion.button>
        
        <style>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PostalCodeInput;