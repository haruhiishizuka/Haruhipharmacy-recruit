import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendToSlack } from '../../utils/slackNotifier';

const QuickConsultationForm = ({ resultType, profession, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postalCode: '', // 郵便番号入力フィールド追加
    contactMethod: 'phone',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // マウント時のデバッグログ
  useEffect(() => {
    console.log('📋 QuickConsultationForm マウント', { resultType, profession });
    console.log('🔄 onClose function:', typeof onClose);
  }, [resultType, profession, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`🔄 Input changed: ${name} = ${value}`);
    
    // 郵便番号の場合、数字とハイフンのみ許可する処理
    if (name === 'postalCode') {
      const cleanValue = value.replace(/[^\d-]/g, '');
      
      // 自動的に3文字後にハイフンを挿入
      if (cleanValue.length === 3 && !cleanValue.includes('-') && formData.postalCode.length < 3) {
        setFormData(prev => ({
          ...prev,
          [name]: cleanValue + '-'
        }));
        return;
      }
      
      // 郵便番号の最大長を8文字（xxx-xxxx）に制限
      if (cleanValue.length <= 8) {
        setFormData(prev => ({
          ...prev,
          [name]: cleanValue
        }));
      }
      return;
    }
    
    // それ以外のフィールドは通常処理
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log("🚀 Form submission started");
    // 最も重要: preventDefault を呼び出してフォームの標準送信を防止
    e.preventDefault();
    
    setIsSubmitting(true);
    setErrorMessage('');
  
    // バリデーションチェック
    if (!formData.name || !formData.email) {
      console.log("🛑 Validation error: Name or email is missing");
      setErrorMessage('氏名とメールアドレスは必須項目です');
      setIsSubmitting(false);
      return;
    }
    
    // 郵便番号の基本的な検証（入力されている場合）
    if (formData.postalCode) {
      const cleanCode = formData.postalCode.replace(/-/g, '');
      if (cleanCode.length !== 7) {
        setErrorMessage('正しい郵便番号を入力してください（例：123-4567）');
        setIsSubmitting(false);
        return;
      }
    }
  
    // 送信データのログ出力
    const diagnosticInfo = { 
      resultType, 
      profession, 
      postalCode: formData.postalCode 
    };
    console.log("📤 Sending data:", { formData, diagnosticInfo });
  
    try {
      // sendToSlack関数を呼び出す
      const result = await sendToSlack(formData, diagnosticInfo);
      console.log("📬 Slack API response:", result);
  
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.message || '送信に失敗しました。後ほどお試しください。');
      }
    } catch (err) {
      console.error("💥 Error sending to Slack:", err);
      setErrorMessage("サーバーとの通信中にエラーが発生しました。後ほどお試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 閉じるボタンの処理
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("❌ Closing form");
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("⚠️ onClose is not a function:", onClose);
    }
  };
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            backgroundColor: '#1A6CBF',
            color: 'white',
            padding: '20px',
            position: 'relative'
          }}
        >
          <button
            onClick={(e) => handleClose(e)}
            type="button"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
            無料キャリア相談を予約する
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            {resultType}タイプのあなたに最適なキャリアプランをご提案します
          </p>
        </div>

        {/* フォーム本体 */}
        <div style={{ padding: '24px' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#2D3748' }}>
                予約を受け付けました
              </h4>
              <p style={{ fontSize: '16px', color: '#4A5568', marginBottom: '24px' }}>
                担当者から24時間以内にご連絡いたします
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
                type="button"
                style={{
                  backgroundColor: '#1A6CBF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                閉じる
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ marginBottom: '20px', fontSize: '15px', color: '#4A5568' }}>
                以下の情報を入力いただくと、専任のキャリアアドバイザーからご連絡いたします。
              </p>
              
              {/* エラーメッセージ */}
              {errorMessage && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errorMessage}
                </div>
              )}
              
              {/* 名前 */}
              <div style={{ marginBottom: '16px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  お名前 <span style={{ color: '#E53E3E' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="例：田中 花子"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E0',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              {/* 電話番号 */}
              <div style={{ marginBottom: '16px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  電話番号 <span style={{ color: '#E53E3E' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="例：090-1234-5678"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E0',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              {/* メールアドレス */}
              <div style={{ marginBottom: '16px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  メールアドレス <span style={{ color: '#E53E3E' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="例：tanaka@example.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E0',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              {/* 郵便番号入力欄を追加 */}
              <div style={{ marginBottom: '16px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  郵便番号
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="例：123-4567"
                    maxLength="8"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E0',
                      fontSize: '16px'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '12px', 
                    transform: 'translateY(-50%)', 
                    pointerEvents: 'none', 
                    color: '#718096' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"></path>
                      <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.7 1.1z"></path>
                    </svg>
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                  ※お住まいの地域に合った医療機関をご紹介するために使用します
                </p>
              </div>
              
              {/* メッセージ欄 */}
              <div style={{ marginBottom: '16px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  メッセージ（任意）
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="質問や希望条件などがあればご記入ください"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E0',
                    fontSize: '16px',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              {/* 希望連絡方法 */}
              <div style={{ marginBottom: '24px' }}>
                <p 
                  style={{ 
                    marginBottom: '10px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#4A5568'
                  }}
                >
                  ご希望の連絡方法 <span style={{ color: '#E53E3E' }}>*</span>
                </p>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${formData.contactMethod === 'phone' ? '#1A6CBF' : '#CBD5E0'}`,
                      backgroundColor: formData.contactMethod === 'phone' ? '#EBF8FF' : 'white',
                      cursor: 'pointer',
                      flex: '1',
                      minWidth: '120px'
                    }}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '15px', color: '#2D3748' }}>電話</span>
                  </label>
                  
                  <label 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${formData.contactMethod === 'zoom' ? '#1A6CBF' : '#CBD5E0'}`,
                      backgroundColor: formData.contactMethod === 'zoom' ? '#EBF8FF' : 'white',
                      cursor: 'pointer',
                      flex: '1',
                      minWidth: '120px'
                    }}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value="zoom"
                      checked={formData.contactMethod === 'zoom'}
                      onChange={handleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '15px', color: '#2D3748' }}>Zoom</span>
                  </label>
                  
                  <label 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${formData.contactMethod === 'line' ? '#1A6CBF' : '#CBD5E0'}`,
                      backgroundColor: formData.contactMethod === 'line' ? '#EBF8FF' : 'white',
                      cursor: 'pointer',
                      flex: '1',
                      minWidth: '120px'
                    }}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value="line"
                      checked={formData.contactMethod === 'line'}
                      onChange={handleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '15px', color: '#2D3748' }}>LINE</span>
                  </label>
                </div>
              </div>
              
              {/* 診断情報の表示 */}
              <div style={{
                backgroundColor: '#F7FAFC',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span style={{ color: '#1A6CBF', fontWeight: '600' }}>診断情報</span>
                </div>
                <p style={{ color: '#4A5568', marginBottom: '4px' }}>
                  診断結果: <strong>{resultType}</strong>タイプ
                </p>
                {profession && (
                  <p style={{ color: '#4A5568', marginBottom: '4px' }}>
                    職種: <strong>{profession}</strong>
                  </p>
                )}
              </div>
              
              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: '#1A6CBF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'default' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ 
                      width: '18px', 
                      height: '18px', 
                      borderRadius: '50%', 
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span>送信中...</span>
                  </>
                ) : (
                  <span>無料相談を予約する</span>
                )}
              </button>
              
              <p style={{ 
                fontSize: '12px', 
                color: '#718096', 
                marginTop: '12px',
                textAlign: 'center' 
              }}>
                ※24時間以内に担当者からご連絡いたします
              </p>
            </form>
          )}
        </div>
      </motion.div>
      
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default QuickConsultationForm;