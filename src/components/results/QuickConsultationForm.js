// src/components/results/QuickConsultationForm.js

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendToSlack } from '../../utils/slackNotifier';

// 等身大の対応を強調した予約フォームコンポーネント
const QuickConsultationForm = ({ resultType, profession, postalCode, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postalCode: postalCode || '',
    contactMethod: 'line',
    message: `${resultType}タイプの診断結果に基づいて、私に合ったキャリアについて相談したいです。`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({});
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'about'

  // バリデーションエラーチェック
  const getError = (field) => {
    if (!touched[field]) return '';
    
    switch (field) {
      case 'name':
        return formData.name.trim() === '' ? 'お名前を入力してください' : '';
      case 'email':
        return formData.email.trim() === '' 
          ? 'メールアドレスを入力してください' 
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
            ? '有効なメールアドレスを入力してください' 
            : '';
      default:
        return '';
    }
  };

  // 入力フィールドのスタイル取得
  const getInputStyle = (field) => {
    const baseStyle = {
      width: '100%',
      padding: '12px 16px',
      fontSize: '15px',
      border: '1px solid #CBD5E0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border 0.3s ease'
    };
    
    const error = getError(field);
    if (error) {
      return {
        ...baseStyle,
        border: '1px solid #E53E3E',
        backgroundColor: '#FFF5F5'
      };
    }
    
    if (touched[field] && !error) {
      return {
        ...baseStyle,
        border: '1px solid #48BB78',
        backgroundColor: '#F0FFF4'
      };
    }
    
    return baseStyle;
  };

  // フォーム入力変更時のハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // フィールドからフォーカスが外れた時のハンドラー
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // フォーム送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 全フィールドをタッチ済みとしてマーク
    const allFields = { name: true, email: true, phone: true };
    setTouched(allFields);
    
    // 必須フィールドのバリデーション
    const nameError = getError('name');
    const emailError = getError('email');
    
    if (nameError || emailError) {
      setErrorMessage('必須項目を正しく入力してください');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Slackへの通知送信（実装例）
      await sendToSlack({
        channel: '#website-inquiries',
        username: 'MediMatch Website Bot',
        text: `*新規キャリア相談予約*\n*タイプ*: ${resultType}\n*名前*: ${formData.name}\n*メール*: ${formData.email}\n*電話*: ${formData.phone || 'なし'}\n*郵便番号*: ${formData.postalCode || 'なし'}\n*連絡方法*: ${formData.contactMethod}\n*メッセージ*: ${formData.message}`
      });
      
      // 成功時の処理
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('送信中にエラーが発生しました。しばらくしてからもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // タブコンテンツのアニメーション設定
  const tabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
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
        padding: '20px',
        overflow: 'auto'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '550px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
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
            onClick={(e) => onClose(e)}
            type="button"
            aria-label="閉じる"
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
            専属アドバイザーとの無料キャリア相談
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '13px',
              marginRight: '8px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              個人対応のため受付人数を限定
            </span>
            {resultType}タイプに基づいた相談
          </p>
        </div>

        {/* タブナビゲーション */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F7FAFC'
        }}>
          <button
            onClick={() => setActiveTab('form')}
            style={{
              flex: 1,
              padding: '14px 10px',
              backgroundColor: activeTab === 'form' ? 'white' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'form' ? '2px solid #1A6CBF' : 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'form' ? '600' : '500',
              color: activeTab === 'form' ? '#1A6CBF' : '#4A5568',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            id="form-tab-button"
            aria-selected={activeTab === 'form'}
            aria-controls="form-tab"
            role="tab"
          >
            相談フォーム
          </button>
          <button
            onClick={() => setActiveTab('about')}
            style={{
              flex: 1,
              padding: '14px 10px',
              backgroundColor: activeTab === 'about' ? 'white' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'about' ? '2px solid #1A6CBF' : 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'about' ? '600' : '500',
              color: activeTab === 'about' ? '#1A6CBF' : '#4A5568',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            id="about-tab-button"
            aria-selected={activeTab === 'about'}
            aria-controls="about-tab"
            role="tab"
          >
            MediMatchの強み
          </button>
        </div>

        {/* コンテンツエリア - スクロール可能 */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <AnimatePresence mode="wait">
            {/* フォームタブのコンテンツ */}
            {activeTab === 'form' && (
              <motion.div 
                key="form"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ padding: '24px' }}
                role="tabpanel"
                id="form-tab"
                aria-labelledby="form-tab-button"
              >
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#EBF8FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2D3748' }}>
                      相談予約を受け付けました
                    </h4>
                    <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#4A5568', maxWidth: '380px', margin: '0 auto 20px' }}>
                      24時間以内に担当者からご連絡いたします。確認のメールをお送りしましたので、ご確認ください。
                    </p>
                    <button
                      onClick={onClose}
                      style={{
                        backgroundColor: '#EBF8FF',
                        color: '#1A6CBF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      閉じる
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="approach-message" style={{
                      backgroundColor: '#F7FAFC',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '20px'
                    }}>
                      <p style={{ 
                        margin: '0',
                        fontSize: '15px',
                        color: '#4A5568',
                        lineHeight: '1.6'
                      }}>
                        <strong>MediMatchの特徴:</strong> 大手エージェントとは異なり、一人のアドバイザーがあなたの
                        キャリア相談から医療機関とのやり取りまで一貫して担当します。等身大の相談だからこそ、
                        あなたの「{resultType}」タイプの強みを活かした、誠実で丁寧なサポートが可能です。
                      </p>
                    </div>
                    
                    <div className="commitment" style={{
                      backgroundColor: '#F0F9FF',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '20px',
                      border: '1px solid #BFDBFE'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2563EB',
                        marginTop: '0',
                        marginBottom: '10px'
                      }}>お約束すること</h4>
                      <ul style={{
                        margin: '0',
                        paddingLeft: '20px',
                        fontSize: '14px',
                        color: '#3B82F6',
                        lineHeight: '1.6'
                      }}>
                        <li style={{ marginBottom: '6px' }}>あなたの状況と希望を丁寧に聞き取ります</li>
                        <li style={{ marginBottom: '6px' }}>転職ありきではなく、現職での改善の可能性も含めて検討します</li>
                        <li style={{ marginBottom: '6px' }}>医療機関の内情や将来性についても率直にお伝えします</li>
                        <li>少数対応だからこそできる、きめ細やかなサポートを提供します</li>
                      </ul>
                    </div>
                    
                    {errorMessage && (
                      <div style={{
                        backgroundColor: '#FFF5F5',
                        color: '#E53E3E',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {errorMessage}
                      </div>
                    )}
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="name"
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
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder="例：田中 花子"
                        aria-required="true"
                        style={getInputStyle('name')}
                      />
                      {getError('name') && (
                        <p style={{ color: '#E53E3E', fontSize: '12px', margin: '4px 0 0' }}>
                          {getError('name')}
                        </p>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="email"
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
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder="例：tanaka@example.com"
                        aria-required="true"
                        style={getInputStyle('email')}
                      />
                      {getError('email') && (
                        <p style={{ color: '#E53E3E', fontSize: '12px', margin: '4px 0 0' }}>
                          {getError('email')}
                        </p>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="phone"
                        style={{ 
                          display: 'block', 
                          marginBottom: '6px', 
                          fontSize: '14px', 
                          fontWeight: '500',
                          color: '#4A5568'
                        }}
                      >
                        電話番号（任意）
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="例：090-1234-5678"
                        style={getInputStyle('phone')}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{ 
                          display: 'block', 
                          marginBottom: '6px', 
                          fontSize: '14px', 
                          fontWeight: '500',
                          color: '#4A5568'
                        }}
                      >
                        希望連絡方法
                      </label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {['line', 'email', 'phone'].map((method) => {
                          const labels = {
                            line: 'LINE',
                            email: 'メール',
                            phone: '電話'
                          };
                          
                          return (
                            <label
                              key={method}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 16px',
                                border: `1px solid ${formData.contactMethod === method ? '#1A6CBF' : '#E2E8F0'}`,
                                borderRadius: '8px',
                                backgroundColor: formData.contactMethod === method ? '#EBF8FF' : 'white',
                                cursor: 'pointer',
                                flex: 1,
                                fontSize: '14px'
                              }}
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                value={method}
                                checked={formData.contactMethod === method}
                                onChange={handleChange}
                                style={{ margin: 0 }}
                              />
                              {labels[method]}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
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
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div 
                            style={{ 
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderTopColor: 'white',
                              animation: 'spin 1s linear infinite'
                            }} 
                            role="status"
                            aria-label="送信中">
                          </div>
                          <span>送信中...</span>
                        </>
                      ) : (
                        <span>無料相談を予約する（所要時間: 30分）</span>
                      )}
                    </button>
                    
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#718096', 
                      marginTop: '12px',
                      textAlign: 'center' 
                    }}>
                      ※現在個人で対応しているため、ご連絡までに少しお時間をいただく場合がございます
                    </p>
                  </form>
                )}
              </motion.div>
            )}

            {/* 「MediMatchの強み」タブのコンテンツ */}
            {activeTab === 'about' && (
              <motion.div 
                key="about"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ padding: '24px' }}
                role="tabpanel"
                id="about-tab"
                aria-labelledby="about-tab-button"
              >
                {/* MediMatchの理念 */}
                <div style={{
                  backgroundColor: '#EBF8FF',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  border: '1px solid #BEE3F8'
                }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#1A6CBF',
                    marginBottom: '12px' 
                  }}>
                    私たちの理念
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '14px' }}>
                    「医療機関が選ばれる時代の、信頼できる伴走者でありたい」
                  </p>
                  <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    MediMatchは、医療従事者一人ひとりの「行きたい」という意志を何よりも尊重します。
                    私たちは量ではなく質を重視し、短期的な成果よりも長期的な満足と成長を大切にしています。
                  </p>
                </div>

                {/* 個人対応による少数精鋭のサポート */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0'
                }}>
                  <h4 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#2D3748',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    丁寧なサポートのために
                  </h4>
                  
                  <div style={{
                    backgroundColor: '#F7FAFC',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '16px',
                    position: 'relative',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto 12px',
                      border: '3px solid #EBF8FF'
                    }}>
                      <img 
                        src="/images/advisor.jpg" 
                        alt="アドバイザー" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.src = '/images/icons/MediMatchlogo.png';
                        }}
                      />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '10px',
                      marginBottom: '16px',
                      flexWrap: 'wrap'
                    }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{
                          backgroundColor: '#1A6CBF',
                          color: 'white',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          position: 'relative'
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '11px',
                            color: '#4A5568',
                            whiteSpace: 'nowrap'
                          }}>対応中</span>
                        </div>
                      ))}
                      
                      {[1, 2].map(i => (
                        <div key={`available-${i}`} style={{
                          backgroundColor: 'white',
                          color: '#718096',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          border: '2px dashed #CBD5E0',
                          position: 'relative'
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '11px',
                            color: '#4A5568',
                            whiteSpace: 'nowrap'
                          }}>相談可能</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#4A5568',
                    margin: '0'
                  }}>
                    個人でエージェント業務を行っているため、同時に対応できる人数には限りがあります。
                    一人ひとりの状況に合わせた丁寧なサポートを提供するために、このような形をとっています。
                    大手エージェントのような大量対応ではなく、質を重視した等身大の相談を心がけています。
                  </p>
                </div>
                
                {/* サービスの流れ */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0'
                }}>
                  <h4 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#2D3748',
                    marginBottom: '16px'
                  }}>
                    サービスの流れ
                  </h4>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    {[
                      {
                        step: 1,
                        title: '無料キャリア相談',
                        desc: 'あなたの状況や希望を丁寧にヒアリングします。現職の改善可能性も含めて率直にお話します。',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        )
                      },
                      {
                        step: 2,
                        title: '条件のすり合わせ',
                        desc: '希望条件と現実のバランスを一緒に考え、最適な選択肢を検討します。',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        )
                      },
                      {
                        step: 3,
                        title: '医療機関との調整',
                        desc: '内部情報も含めて、医療機関の実態をお伝えします。面接対策や条件交渉もサポートします。',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        )
                      },
                      {
                        step: 4,
                        title: '長期的なフォロー',
                        desc: '転職後も定期的に状況確認をさせていただき、長期的な成長をサポートします。',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A6CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        )
                      }
                    ].map((item) => (
                      <div 
                        key={item.step}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'flex-start'
                        }}
                      >
                        <div style={{
                          minWidth: '40px',
                          height: '40px',
                          backgroundColor: '#EBF8FF',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1A6CBF'
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <h5 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: '#2D3748',
                            marginTop: '0',
                            marginBottom: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span style={{
                              backgroundColor: '#1A6CBF',
                              color: 'white',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '700'
                            }}>{item.step}</span>
                            {item.title}
                          </h5>
                          <p style={{ 
                            fontSize: '14px', 
                            lineHeight: '1.6', 
                            color: '#4A5568',
                            margin: '0'
                          }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* フォームに戻るボタン */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    style={{
                      backgroundColor: '#1A6CBF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0, 108, 191, 0.2)'
                    }}
                  >
                    相談フォームに戻る
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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