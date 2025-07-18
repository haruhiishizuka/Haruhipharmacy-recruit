import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendToSlack } from '../../utils/slackNotifier';
import { trackContactSubmit, trackContactStart } from '../../utils/analytics';

/**
 * QuickConsultationForm
 * -------------------------------------------------------------
 * - フォーム入力 + MediMatch の強み紹介をタブで切替表示
 * - バリデーションはリアルタイム & 送信前の二段構え
 * - LINE 相談を選択すると友だち追加ボタンが展開
 * - 成功時は 24h 以内連絡メッセージ、LINE 選択時は自動で友だち追加ページを開く
 * - UI / 配色 / アニメーションは WelcomeScreen に合わせた一貫デザイン
 * - アナリティクスとタグマネージャーに対応
 * -------------------------------------------------------------
 */
const QuickConsultationForm = ({ resultType, profession, postalCode, onClose }) => {
  /* ------------------------------------------------------------------
   * state
   * ----------------------------------------------------------------*/
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postalCode: '',
    contactMethod: 'line',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({});
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'about'

  useEffect(() => {
    // フォーム表示イベントのトラッキング
    trackContactStart(resultType, profession);
    
    // Google広告リマーケティングタグ
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        'send_to': 'AW-17044188297',
        'value': 0.0,
        'user_data': {
          'type': resultType
        }
      });
    }
  }, [resultType, profession]); // 依存配列を正しく設定

  /* ------------------------------------------------------------------
   * helpers
   * ----------------------------------------------------------------*/
  // フィールド単体バリデーション
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '氏名は必須項目です';
        break;
      case 'email':
        if (!value.trim()) return 'メールアドレスは必須項目です';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '有効なメールアドレスを入力してください';
        break;
      case 'phone':
        if (value.trim() && !/^[0-9\-+\s()]*$/.test(value)) return '有効な電話番号を入力してください';
        break;
      case 'postalCode':
        if (value.trim()) {
          const clean = value.replace(/-/g, '');
          if (clean.length !== 7) return '正しい郵便番号を入力してください（例：123-4567）';
        }
        break;
      default:
        break;
    }
    return '';
  };

    // コンポーネントマウント時（フォーム表示時）のトラッキング

  // フォーム全体バリデーション
  const validateForm = () => {
    const fields = Object.keys(formData);
    const newTouched = fields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
    setTouched(newTouched);

    for (const f of ['name', 'email']) {
      const msg = validateField(f, formData[f]);
      if (msg) {
        setErrorMessage(msg);
        return false;
      }
    }
    const pcMsg = validateField('postalCode', formData.postalCode);
    if (pcMsg) { setErrorMessage(pcMsg); return false; }

    const phMsg = validateField('phone', formData.phone);
    if (phMsg) { setErrorMessage(phMsg); return false; }

    setErrorMessage('');
    return true;
  };

  // 入力フィールドスタイル
  const getInputStyle = (field) => {
    const base = {
      width: '100%', padding: '12px', borderRadius: '8px',
      border: '1px solid #CBD5E0', fontSize: '16px', transition: 'all .2s'
    };
    if (!touched[field]) return base;
    const msg = validateField(field, formData[field]);
    if (msg) return { ...base, border: '1px solid #E53E3E', background: '#FFF5F5' };
    if (formData[field]) return { ...base, border: '1px solid #48BB78', background: '#F0FFF4' };
    return base;
  };

  /* ------------------------------------------------------------------
   *  handlers
   * ----------------------------------------------------------------*/
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, formData[name]);
    setErrorMessage(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 郵便番号フォーマット
    if (name === 'postalCode') {
      const digits = value.replace(/\D/g, '');
      const formatted = digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3, 7)}` : digits;
      if (formatted.length <= 8) setFormData((p) => ({ ...p, postalCode: formatted }));
      if (touched[name]) setErrorMessage(validateField(name, formatted));
      return;
    }
    // 電話番号半角数字などのみ許可
    if (name === 'phone') {
      const cleaned = value.replace(/[^0-9\-+\s()]/g, '');
      setFormData((p) => ({ ...p, phone: cleaned }));
      if (touched[name]) setErrorMessage(validateField(name, cleaned));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrorMessage(validateField(name, value));
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // 入力チェック
    if (!validateForm()) return;
    
    // 送信中表示
    setIsSubmitting(true);
    const diagnosticInfo = { resultType, profession, postalCode: formData.postalCode };
    try {
      const res = await sendToSlack(formData, diagnosticInfo);
      if (!res.success) throw new Error(res.message || 'Slack 送信失敗');

      // コンバージョンイベントのトラッキング
      trackContactSubmit(resultType, profession, formData.contactMethod);

      // Google広告コンバージョン用のイベント送信
      if (window.dataLayer) {
        // フォーム送信イベント（カスタムイベント）
        window.dataLayer.push({
          'event': 'form_submission',
          'form_type': 'contact',
          'profession': profession || 'not_specified',
          'result_type': resultType || 'not_specified',
          'contact_method': formData.contactMethod
        });
        
        // Google広告コンバージョン用イベント
        window.dataLayer.push({
          'event': 'conversion',
          'send_to': 'AW-17044188297/ラベル値',  // ここに実際のコンバージョンラベルを設定
          'value': 1.0,
          'currency': 'JPY',
          'transaction_id': Date.now().toString()
        });
        
        console.log('📊 Conversion tracking via GTM dataLayer');
      }

      // バックアップとしてgtag直接呼び出しも実装
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17044188297/ラベル値',  // ここに実際のコンバージョンラベルを設定
          'value': 1.0,
          'currency': 'JPY',
          'transaction_id': Date.now().toString()
        });
      }
      
      setIsSubmitted(true);
      // LINE 自動誘導
      if (formData.contactMethod === 'line') {
        setTimeout(() => window.open('https://lin.ee/xolKvUO', '_blank'), 1500);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('送信に失敗しました。後ほどお試しください。');
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage('');
    
    // タブ切り替え時にスクロール
    setTimeout(() => {
      const tabContent = document.getElementById('tab-content');
      if (tabContent) {
        tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    onClose?.();
  };

  /* ------------------------------------------------------------------
   *  UI 定義
   * ----------------------------------------------------------------*/
  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  // MediMatch 強みカード（6 枚目を追加済み）
  const strengths = [
    {
      title: 'ポジティブアプローチ転職システム',
      description: 'あなたの「行きたい」医療機関を選び、その希望に沿って私たちが求人を開拓します。従来の転職サービスでは実現できなかった可能性を切り開きます。',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>)
    },
    {
      title: '医療機関の質的評価',
      description: '経営基盤、理念、将来性などを独自の視点で評価・分析し、透明性の高い情報を提供します。良質な医療と健全な経営を両立する医療機関との連携を重視します。',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8.2a1 1 0 0 1 .4-.8l4.2-3.4a1 1 0 0 1 1.2 0l4.2 3.4a1 1 0 0 1 .4.8V20"/><path d="M12 15v5"/><path d="M8 9h8"/><path d="M8 13h8"/></svg>)
    },
    {
      title: '丁寧さの追求',
      description: '多くの求職者を扱うのではなく、限られた方々に深く寄り添うことで、量ではなく質を重視し、短期的な成果よりも長期的な満足と成長を大切にします。',
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>)
    },
    {
      title: '主体性の尊重',
      description: '医療従事者がキャリアを自らの手で切り開く権利を尊重し、「行きたい」という意志を最も尊い動機として受け止め、その実現に全力を尽くします。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m16 12-4 4-4-4"/>
          <path d="M12 8v8"/>
        </svg>
      )
    },
    {
      title: "成長への伴走",
      description: "単なる転職の瞬間だけでなく、医療従事者の長期的なキャリア形成とその人らしい成長の過程に寄り添います。「コナトゥス」を尊重し、自己実現へと至る道のりを共に歩みます。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      )
    }
  ];
  
  return (
    // 外側コンテナ
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
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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
            backgroundColor: '#d5e6d3',
            color: '#2d5a2a',
            padding: '20px',
            position: 'relative'
          }}
        >
          <button
            onClick={(e) => handleClose(e)}
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
            無料キャリア相談を予約する
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            {resultType}タイプのあなたに最適なキャリアプランをご提案します
          </p>
        </div>

        {/* タブナビゲーション - 改善版 */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F7FAFC',
          padding: '6px'
        }}
        role="tablist"
        aria-label="相談フォームタブ"
        >
          <button
            onClick={() => handleTabChange('form')}
            role="tab"
            aria-selected={activeTab === 'form'}
            aria-controls="form-tab"
            id="form-tab-button"
            style={{
              flex: 1,
              padding: '14px 8px',
              fontSize: '15px',
              fontWeight: '600',
              background: activeTab === 'form' ? 'white' : 'none',
              border: activeTab === 'form' ? '1px solid #E2E8F0' : 'none',
              borderBottom: activeTab === 'form' ? 'none' : '1px solid transparent',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              color: activeTab === 'form' ? '#2d5a2a' : '#4A5568',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              position: 'relative',
              boxShadow: activeTab === 'form' ? '0 -2px 6px rgba(0, 0, 0, 0.05)' : 'none'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              marginBottom: '2px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span>相談フォーム</span>
            {activeTab === 'form' && (
              <span style={{
                position: 'absolute',
                bottom: '-1px',
                left: '0',
                right: '0',
                height: '3px',
                backgroundColor: '#2d5a2a',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px'
              }}></span>
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('about')}
            role="tab"
            aria-selected={activeTab === 'about'}
            aria-controls="about-tab"
            id="about-tab-button"
            style={{
              flex: 1,
              padding: '14px 8px',
              fontSize: '15px',
              fontWeight: '600',
              background: activeTab === 'about' ? 'white' : 'none',
              border: activeTab === 'about' ? '1px solid #E2E8F0' : 'none',
              borderBottom: activeTab === 'about' ? 'none' : '1px solid transparent',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              color: activeTab === 'about' ? '#2d5a2a' : '#4A5568',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              position: 'relative',
              boxShadow: activeTab === 'about' ? '0 -2px 6px rgba(0, 0, 0, 0.05)' : 'none'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              marginBottom: '2px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <span>MediMatchの強み</span>
            {activeTab === 'about' && (
              <span style={{
                position: 'absolute',
                bottom: '-1px',
                left: '0',
                right: '0',
                height: '3px',
                backgroundColor: '#2d5a2a',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px'
              }}></span>
            )}
          </button>
        </div>

        {/* コンテンツエリア - スクロール可能 */}
        <div id="tab-content" style={{ overflowY: 'auto', flex: 1 }}>
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
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#38A169',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    
                    <h4 style={{ 
                      fontSize: '22px', 
                      fontWeight: '600', 
                      color: '#2D3748', 
                      marginBottom: '12px' 
                    }}>
                      予約を受け付けました
                    </h4>
                    
                    <p style={{ 
                      fontSize: '16px', 
                      color: '#4A5568', 
                      marginBottom: '24px', 
                      lineHeight: '1.6' 
                    }}>
                      担当者から24時間以内にご連絡いたします
                    </p>
                    

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleClose(e);  // 引数eを追加
                      }}
                      type="button"
                      style={{ 
                        backgroundColor: '#2d5a2a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '14px 36px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        margin: '0 auto',
                        display: 'block'
                      }}
                    >
                      閉じる
                    </button>

                    {/* シェア機能 - 追加 */}
                    <button
                      type="button"
                      onClick={() => {
                        const shareData = {
                          title: 'キャリア診断 結果',
                          text: `私は ${resultType} タイプでした！ MediMatch で診断してみませんか？`,
                          url: window.location.href
                        };
                        if (navigator.share) {
                          navigator.share(shareData).catch(console.error);
                        } else {
                          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
                            .then(() => alert('リンクをコピーしました！'))
                            .catch(() => alert('コピーできませんでした'));
                        }
                      }}
                      style={{
                        marginTop: '12px',
                        backgroundColor: '#38B2AC',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'block',
                        margin: '12px auto 0'
                      }}
                    >
                      結果をシェアする
                    </button>                  
                    {/* SNSシェアボタン */}
                    <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `私は ${resultType} タイプでした！ #MediMatch診断`
                        )}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#1DA1F2',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>

                      
                      <a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#06C755',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.819 4.588 8.857 10.778 9.623.421.091.999.28 1.145.641.132.331.089.848.044 1.182-.132.611-.611 2.38-.611 2.38-.033.16-.066.26.088.33.154.07.275-.05.421-.111 1.893-.798 9.488-5.494 12.954-9.412 2.354-2.581 2.851-5.239 2.181-7.593z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <p style={{ marginBottom: '20px', fontSize: '15px', color: '#4A5568' }}>
                      以下の情報を入力いただくと、専任のキャリアアドバイザーからご連絡いたします。
                    </p>
                    
                    {/* エラーメッセージ */}
                    {errorMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          backgroundColor: '#FEF2F2',
                          color: '#DC2626',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          marginBottom: '16px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        role="alert"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {errorMessage}
                      </motion.div>
                    )}
                    
                    {/* 名前 */}
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
                        className="input_field"
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
                    </div>
                    
                    {/* 電話番号 */}
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
                        電話番号 <span style={{ color: '#E53E3E' }}>*</span>
                      </label>
                      <input
                        className="input_field"
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder="例：090-1234-5678"
                        aria-required="true"
                        style={getInputStyle('phone')}
                      />
                    </div>
                    
                    {/* メールアドレス */}
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
                        className="input_field"
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
                    </div>
                    
                    {/* 郵便番号入力欄 */}
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="postalCode"
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
                          className="input_field"
                          id="postalCode"
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="例：123-4567"
                          maxLength="8"
                          aria-describedby="postalCode-hint"
                          style={{
                            ...getInputStyle('postalCode'),
                            paddingLeft: '40px'
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
                      <p id="postalCode-hint" style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                        ※お住まいの地域に合った医療機関をご紹介するために使用します
                      </p>
                    </div>
                    
                    {/* メッセージ欄 */}
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="message"
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
                        className="input_field"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="質問や希望条件などがあればご記入ください"
                        style={{
                          ...getInputStyle('message'),
                          minHeight: '100px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    {/* 希望連絡方法 */}
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ 
                        marginBottom: '10px', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: '#4A5568'
                      }}>
                        ご希望の連絡方法 <span style={{ color: '#E53E3E' }}>*</span>
                      </p>
    
                      <div 
                        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                        role="radiogroup"
                        aria-required="true"
                      >
                        <label 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: `1px solid ${formData.contactMethod === 'line' ? '#2d5a2a' : '#CBD5E0'}`,
                            backgroundColor: formData.contactMethod === 'line' ? '#f8f2e8' : 'white',
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
                            onBlur={handleBlur}
                            style={{ marginRight: '8px' }}
                          />
                          <span style={{ fontSize: '15px', color: '#2D3748' }}>LINE</span>
                        </label>
      
                        <label 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: `1px solid ${formData.contactMethod === 'phone' ? '#2d5a2a' : '#CBD5E0'}`,
                            backgroundColor: formData.contactMethod === 'phone' ? '#f8f2e8' : 'white',
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
                            onBlur={handleBlur}
                            style={{ marginRight: '8px' }}
                          />
                          <span style={{ fontSize: '15px', color: '#2D3748' }}>電話</span>
                        </label>
                      </div>
    
                      {/* LINE友だち追加ボタン - LINEが選択された場合のみ表示 */}
                      <AnimatePresence>
                        {formData.contactMethod === 'line' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              backgroundColor: '#F7FAFC',
                              borderRadius: '12px',
                              padding: '16px',
                              marginTop: '16px',
                              textAlign: 'center'
                            }}
                          >
                            <p style={{ 
                              marginBottom: '12px', 
                              fontSize: '14px', 
                              color: '#4A5568' 
                            }}>
                              <strong>LINEで相談</strong>をご希望の方は、公式アカウントを友だち追加してください。
                            </p>
                            
                            <a href="https://lin.ee/xolKvUO"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#06C755',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                fontWeight: 600,
                                textDecoration: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.819 4.588 8.857 10.778 9.623.421.091.999.28 1.145.641.132.331.089.848.044 1.182-.132.611-.611 2.38-.611 2.38-.033.16-.066.26.088.33.154.07.275-.05.421-.111 1.893-.798 9.488-5.494 12.954-9.412 2.354-2.581 2.851-5.239 2.181-7.593z"></path>
                              </svg>
                              <span>友だち追加して相談</span>
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span style={{ color: '#2d5a2a', fontWeight: '600' }}>診断情報</span>
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
                        backgroundColor: '#2d5a2a',
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
                          <div style={{ 
                            width: '18px', 
                            height: '18px', 
                            borderRadius: '50%', 
                            border: '3px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            animation: 'spin 1s linear infinite'
                          }} 
                          role="status"
                          aria-label="送信中">
                          </div>
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

                    {/* サービスの特徴へのリンク */}
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                      <button
                        type="button"
                        onClick={() => handleTabChange('about')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2d5a2a',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: '4px 8px'
                        }}
                      >
                        MediMatchの5つの強みを確認する →
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* 会社の強みタブのコンテンツ */}
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
                  backgroundColor: '#f8f2e8',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  border: '1px solid #e6d5c3'
                }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#2d5a2a',
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

                {/* 新規追加：医療専門家による1対1のサポートセクション */}
                <div style={{
                  backgroundColor: '#f8f2e8',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  border: '1px solid #e6d5c3'
                }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#2d5a2a',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    医療現場を知り尽くした専門家の支援
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '14px' }}>
                    <strong>経験豊富な医療専門家による1対1の伴走：</strong> 元急性期病院の事務長（30歳で就任）、医療経営コンサルタントが転職支援を担当。面接実績1000件以上の専門知識で、あなたのキャリアを本気でサポートします。
                  </p>
                  <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong>「転職ありき」ではない本質的なキャリア支援：</strong> 少人数制で一人ひとりとじっくり向き合うことで、短期的な転職だけでなく長期的なキャリア形成に寄り添います。
                  </p>
                </div>

                {/* 5つの強み */}
                <h4 style={{ 
                  fontSize: '17px', 
                  fontWeight: '600', 
                  color: '#2D3748',
                  marginBottom: '16px' 
                }}>
                  MediMatchの5つの強み
                </h4>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {strengths.map((strength, index) => (
                    <div key={index} style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      border: '1px solid #E2E8F0'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: '16px',
                        alignItems: 'flex-start'
                      }}>
                        <div style={{
                          backgroundColor: '#2d5a2a',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                          aria-hidden="true"
                        >
                          {strength.icon}
                        </div>
                        <div>
                          <h5 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: '#2d5a2a',
                            marginBottom: '6px' 
                          }}>
                            {strength.title}
                          </h5>
                          <p style={{ 
                            fontSize: '14px', 
                            color: '#4A5568', 
                            lineHeight: '1.6',
                            margin: 0
                          }}>
                            {strength.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* サービスの特徴セクション - 追加情報 */}
                <div style={{
                  backgroundColor: '#F7FAFC',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 20h20"></path>
                      <path d="M5 20v-8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8"></path>
                      <path d="M12 7V2"></path>
                      <path d="M13 5h-2"></path>
                    </svg>
                    私たちのサービスの特徴
                  </h4>
                  <ul style={{ 
                    paddingLeft: '20px',
                    marginBottom: '0',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#2D3748'
                  }}>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>「行きたい」医療機関への積極的アプローチ</strong>：従来のように求人ありきではなく、あなたの希望を最優先します
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>独自の医療機関評価</strong>：経営状態、組織体制、将来計画など詳細な情報を医業経営コンサルタントの視点から分析
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>プライベートエージェント制</strong>：少数精鋭のエージェントが担当者制で一人ひとりと丁寧に向き合います
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>転職後のフォローアップ</strong>：入職後も定期的なフォローを行い、長期的な成功と成長をサポート
                    </li>
                    <li>
                      <strong>完全無料のサービス</strong>：医療機関からいただく紹介手数料によって運営されているため、求職者の方々は無料でご利用いただけます
                    </li>
                  </ul>
                </div>

                {/* サービスの流れ */}
                <div style={{
                  backgroundColor: '#f8f2e8',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  border: '1px solid #e6d5c3'
                }}>
                  <h4 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#2d5a2a',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                    転職支援の流れ
                  </h4>
                  <ol style={{ 
                    paddingLeft: '25px',
                    marginBottom: '0',
                    fontSize: '14px',
                    color: '#2D3748'
                  }}>
                    <li style={{ marginBottom: '8px' }}>
                      <strong>初回面談</strong>：あなたの希望条件や価値観について丁寧にヒアリングします
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <strong>キャリアカウンセリング</strong>：これまでのキャリアを振り返りながら、今後のビジョンを一緒に考えます
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <strong>医療機関の選定・提案</strong>：あなたの希望に合った職場を提案。希望する医療機関に積極的にアプローチします
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <strong>医療機関情報の詳細提供</strong>：決算情報、経営状況、組織体制など詳細な情報を提供します
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <strong>面接サポート</strong>：面接対策からアレンジまで全面的にサポートします
                    </li>
                    <li>
                      <strong>入職後フォロー</strong>：入職後も定期的にフォローアップを行い、新しい環境での活躍をサポートします
                    </li>
                  </ol>
                </div>

                {/* フォームに戻るボタン */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => handleTabChange('form')}
                    style={{
                      backgroundColor: '#2d5a2a',
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
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default QuickConsultationForm;