// src/components/PolicyPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlobalNavigation from './common/GlobalNavigation';

const PolicyPage = ({ onReturnHome, onNavigateToPage, onConsultation }) => {
  // タブ状態の管理
  const [activeTab, setActiveTab] = useState('privacy');
  
  // 画面サイズに応じたスタイル調整
  const [isMobile, setIsMobile] = useState(false);
  
  // 画面幅を監視してモバイル表示かどうかを判定
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初期チェック
    checkScreenSize();
    
    // リサイズイベントでチェック
    window.addEventListener('resize', checkScreenSize);
    
    // クリーンアップ
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // 画面上部へスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);
  
  // アニメーションのバリアント
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  };
  
  // タブ定義
  const tabs = [
    { id: 'privacy', label: 'プライバシーポリシー' },
    { id: 'terms', label: '利用規約' },
    { id: 'contact', label: 'お問い合わせ' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100%'
    }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={() => {}}
        activeRoute="/policy"
      />

      {/* ヘッダーセクション */}
      <section className="section is-secondary">
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">サポート情報</div>
            <motion.h1
              className="heading_h2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#675032' }}
            >
              {activeTab === 'privacy' && 'プライバシーポリシー'}
              {activeTab === 'terms' && '利用規約'}
              {activeTab === 'contact' && 'お問い合わせ'}
            </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="subheading" style={{ 
            fontSize: isMobile ? '16px' : '18px', 
            fontWeight: '400', 
            lineHeight: '1.6', 
            maxWidth: '900px', 
            margin: '0 auto 30px',
            color: '#675032',
            padding: '0 20px'
          }}>
            {activeTab === 'privacy' && 'MediMatchでは、お客様の個人情報を適切に管理し、保護することを重要な責務と考えています。'}
            {activeTab === 'terms' && 'MediMatchをご利用いただくにあたり、以下の利用規約をご確認いただきますようお願いいたします。'}
            {activeTab === 'contact' && 'ご質問やご相談がございましたら、お気軽にお問い合わせください。担当者が丁寧に対応いたします。'}
          </p>
        </motion.div>
        
        {/* タブナビゲーション */}
        <div className="button-group" style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          overflowX: 'auto',
          padding: '10px 0'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              className={`button ${activeTab === tab.id ? '' : 'is-secondary'}`}
              style={{
                padding: '12px 24px',
                borderRadius: '32px',
                fontWeight: '600',
                fontSize: isMobile ? '14px' : '16px',
                transition: 'all 0.3s ease',
                minWidth: isMobile ? '100px' : '120px',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#675032' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#675032',
                border: `2px solid #675032`,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        </div>
      </div>
      </section>

      {/* メインコンテンツエリア */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        className="container card"
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          marginTop: '-60px',
          padding: '40px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* プライバシーポリシータブ */}
        {activeTab === 'privacy' && (
          <motion.div 
            key="privacy"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                1. 個人情報の取得について
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                MediMatchでは、サービス提供のために必要な範囲で、お客様の個人情報を取得しています。主に以下の方法で個人情報を取得いたします。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>ウェブサイトでのフォーム入力</li>
                <li style={{ marginBottom: '8px' }}>診断ツールご利用時の入力情報</li>
                <li style={{ marginBottom: '8px' }}>お電話やメールでのお問い合わせ</li>
                <li style={{ marginBottom: '8px' }}>面談やカウンセリング時のヒアリング</li>
                <li style={{ marginBottom: '8px' }}>Cookie等の技術を利用した自動取得</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                2. 取得する個人情報の内容
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社が取得する個人情報は以下の通りです。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>氏名</li>
                <li style={{ marginBottom: '8px' }}>連絡先（電話番号、メールアドレスなど）</li>
                <li style={{ marginBottom: '8px' }}>お住まいの地域（郵便番号など）</li>
                <li style={{ marginBottom: '8px' }}>職種、資格情報</li>
                <li style={{ marginBottom: '8px' }}>診断ツールでの回答内容</li>
                <li style={{ marginBottom: '8px' }}>キャリア相談内容</li>
                <li style={{ marginBottom: '8px' }}>IPアドレス、Cookie情報、ブラウザ情報などの技術情報</li>
                <li style={{ marginBottom: '8px' }}>当サイトでの行動履歴（閲覧ページ、クリック情報など）</li>
              </ul>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                なお、当社が取得する個人情報は、サービス提供に必要な最小限の情報に限定しています。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                3. 個人情報の利用目的
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、取得した個人情報を以下の目的で利用いたします。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>転職支援サービスの提供</li>
                <li style={{ marginBottom: '8px' }}>キャリアカウンセリングの実施</li>
                <li style={{ marginBottom: '8px' }}>お客様に合った医療機関の紹介</li>
                <li style={{ marginBottom: '8px' }}>サービスの改善や新サービスの開発</li>
                <li style={{ marginBottom: '8px' }}>お問い合わせへの対応</li>
                <li style={{ marginBottom: '8px' }}>各種情報のご案内（お客様の同意がある場合）</li>
                <li style={{ marginBottom: '8px' }}>マーケティングおよび広告配信（Google広告などの第三者広告サービスを含む）</li>
                <li style={{ marginBottom: '8px' }}>ウェブサイトの利用状況分析および改善</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                4. Cookieと広告IDの使用について
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社ウェブサイトでは、利用者のウェブサイト閲覧履歴や行動データを収集するためにCookieおよび類似技術を使用しています。これらのデータは以下の目的で利用されます。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>ウェブサイトの機能維持およびパフォーマンス向上</li>
                <li style={{ marginBottom: '8px' }}>ユーザー体験の向上およびカスタマイズ</li>
                <li style={{ marginBottom: '8px' }}>広告配信および効果測定</li>
                <li style={{ marginBottom: '8px' }}>マーケティング分析およびサービス改善</li>
              </ul>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、Google広告やGoogle アナリティクスなどの第三者サービスを使用しており、これらのサービスもCookieを使用してデータを収集します。これらのデータは当社と当該第三者間で共有される場合があります。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                ユーザーは、ブラウザの設定を変更することでCookieの使用を制限したり、拒否したりすることができます。また、以下のリンクからGoogle広告のパーソナライズをオプトアウトすることも可能です：
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#675032', textDecoration: 'underline', marginLeft: '5px' }}>Google広告設定</a>
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                なお、Cookieを無効にした場合、当サイトの一部の機能が正常に動作しなくなる可能性があります。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                5. 個人情報の第三者提供
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>お客様の同意がある場合</li>
                <li style={{ marginBottom: '8px' }}>法令に基づく場合</li>
                <li style={{ marginBottom: '8px' }}>人の生命、身体または財産の保護のために必要がある場合</li>
                <li style={{ marginBottom: '8px' }}>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li style={{ marginBottom: '8px' }}>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                転職支援サービスにおいて、お客様の情報を医療機関に提供する場合は、事前にお客様の同意を得た上で行います。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、広告配信およびウェブ解析のためにGoogle広告やGoogle アナリティクスなどの第三者サービスを利用しており、これらのサービスにお客様の情報（Cookie情報、IPアドレス、デバイス情報など）が提供される場合があります。ただし、これらの情報は統計的に処理され、個人を特定する目的では利用されません。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                6. 個人情報の安全管理
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、個人情報の漏洩、滅失、毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>個人情報保護責任者の設置</li>
                <li style={{ marginBottom: '8px' }}>従業員に対する教育・監督</li>
                <li style={{ marginBottom: '8px' }}>個人情報へのアクセス制限</li>
                <li style={{ marginBottom: '8px' }}>SSL（Secure Socket Layer）による通信の暗号化</li>
                <li style={{ marginBottom: '8px' }}>ファイアウォール等によるネットワークセキュリティの確保</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                7. 個人情報の開示・訂正・利用停止等
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、お客様ご本人から個人情報の開示・訂正・削除・利用停止等のご請求があった場合、本人確認を行った上で、適切に対応いたします。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                ご請求につきましては、下記「9. お問い合わせ窓口」までご連絡ください。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                8. ユーザーの選択肢
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、ユーザーが自身の個人情報の取り扱いに関して選択肢を持てるよう、以下の方法を提供しています。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Cookie設定：</strong> ほとんどのウェブブラウザでは、Cookieの受け入れを制限またはブロックすることができます。ブラウザの設定方法については、ブラウザのヘルプをご確認ください。
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>広告のオプトアウト：</strong> Google広告では、ユーザーが興味・関心に基づく広告をオプトアウトすることができます。
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#675032', textDecoration: 'underline', marginLeft: '5px' }}>Google広告設定</a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Google アナリティクスのオプトアウト：</strong> Google アナリティクスによるデータ収集を無効にするには、
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#675032', textDecoration: 'underline', marginLeft: '5px' }}>Google アナリティクス オプトアウト アドオン</a>
                  をインストールしてください。
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>メールマーケティング：</strong> 当社からのメールマガジンなどについては、各メール内に記載されているオプトアウト手順に従って配信停止を行うことができます。
                </li>
              </ul>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                これらの設定を変更しても、引き続き当サイトを利用することは可能ですが、一部の機能が制限される場合があります。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                9. プライバシーポリシーの変更
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを変更することがあります。変更にあたっては、変更後のプライバシーポリシーの施行時期及び内容を当社ウェブサイト上で掲示することにより、お客様に告知します。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                10. お問い合わせ窓口
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div style={{ 
                backgroundColor: '#f8f2e8',
                padding: '20px',
                borderRadius: '12px',
                marginTop: '20px',
                border: '1px solid #d5e6d3'
              }}>
                <p style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '600', color: '#675032' }}>MediMatch</p>
                <p style={{ marginBottom: '8px', fontSize: '15px', color: '#675032' }}>住所：〒482-0025 愛知県岩倉市大地新町3丁目45番地2</p>
                <p style={{ marginBottom: '8px', fontSize: '15px', color: '#675032' }}>電話番号：0587-50-7535</p>
                <p style={{ marginBottom: '8px', fontSize: '15px', color: '#675032' }}>メールアドレス：info@haruhi-medical.com</p>
                <p style={{ marginBottom: '8px', fontSize: '15px', color: '#675032' }}>担当者：個人情報保護管理者 平島 禎之</p>
              </div>
            </div>
            
            <div style={{ textAlign: 'right', marginTop: '40px', fontSize: '14px', color: '#718096' }}>
              制定日：2023年9月1日<br />
              最終改定日：2025年4月30日
            </div>
          </motion.div>
        )}
        
        {/* 利用規約タブ */}
        {activeTab === 'terms' && (
          <motion.div 
            key="terms"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                1. はじめに
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                MediMatch（以下「当社」といいます）が提供するMediMatch（以下「本サービス」といいます）をご利用いただく際には、本利用規約に同意いただく必要があります。本サービスを利用することにより、利用者は本規約に同意したものとみなされます。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                2. サービス内容
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                本サービスは、医療従事者向けの転職支援サービスです。主に以下のサービスを提供しています。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>医療キャリア診断ツールの提供</li>
                <li style={{ marginBottom: '8px' }}>キャリアカウンセリングの実施</li>
                <li style={{ marginBottom: '8px' }}>転職先医療機関の紹介</li>
                <li style={{ marginBottom: '8px' }}>面接対策、職場訪問のサポート</li>
                <li style={{ marginBottom: '8px' }}>入職後のフォローアップ</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                3. 利用登録
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                本サービスを利用するには、当社が定める方法によって利用登録を行う必要があります。当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>虚偽の事項を届け出た場合</li>
                <li style={{ marginBottom: '8px' }}>本規約に違反したことがある者からの申請である場合</li>
                <li style={{ marginBottom: '8px' }}>その他、当社が利用登録を相当でないと判断した場合</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                4. 利用料金
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                本サービスは、求職者（医療従事者）の方は完全無料でご利用いただけます。当社は医療機関からいただく紹介手数料によって運営されています。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                医療機関様向けの手数料は、成功報酬型となっており、採用が成立した場合に限りお支払いいただきます。詳細は別途医療機関様との契約に基づきます。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                5. 禁止事項
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>法令または公序良俗に違反する行為</li>
                <li style={{ marginBottom: '8px' }}>犯罪行為に関連する行為</li>
                <li style={{ marginBottom: '8px' }}>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li style={{ marginBottom: '8px' }}>当社のサービスの運営を妨害するおそれのある行為</li>
                <li style={{ marginBottom: '8px' }}>他の利用者に関する個人情報等を収集または蓄積する行為</li>
                <li style={{ marginBottom: '8px' }}>他の利用者に成りすます行為</li>
                <li style={{ marginBottom: '8px' }}>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li style={{ marginBottom: '8px' }}>その他、当社が不適切と判断する行為</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                6. サービス内容の変更・中断
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、以下の事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li style={{ marginBottom: '8px' }}>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li style={{ marginBottom: '8px' }}>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li style={{ marginBottom: '8px' }}>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                7. 免責事項
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、本サービスに関して、利用者と医療機関との間に生じた紛争について一切の責任を負いません。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、医療機関の採用条件や就業環境の正確性を保証するものではありません。また、入職後の労働条件や環境の変更について責任を負うものではありません。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、最大限の努力を持って医療機関の情報収集と提供を行いますが、全ての情報が完全であることを保証するものではありません。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                8. サービス利用契約の解除
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                利用者は、当社所定の方法で当社に通知することにより、本サービスの利用契約を解除できるものとします。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、利用者が以下の各号のいずれかに該当する場合には、事前の通知なく利用契約を解除することができるものとします。
              </p>
              <ul style={{ 
                marginLeft: '20px', 
                marginBottom: '15px',
                color: '#675032',
                fontSize: '16px'
              }}>
                <li style={{ marginBottom: '8px' }}>本規約のいずれかの条項に違反した場合</li>
                <li style={{ marginBottom: '8px' }}>登録事項に虚偽の事実があることが判明した場合</li>
                <li style={{ marginBottom: '8px' }}>その他、当社が本サービスの利用を適当でないと判断した場合</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                9. 規約の変更
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができるものとします。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                変更後の利用規約は、当社ウェブサイトに掲載した時点で効力を生じるものとします。本規約の変更後、本サービスを利用した場合には、変更後の規約に同意したものとみなします。
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                10. 準拠法・裁判管轄
              </h2>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p className="paragraph" style={{ marginBottom: '12px', fontSize: '16px', color: '#675032' }}>
                本サービスに関して紛争が生じた場合には、名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </div>
            
            <div style={{ textAlign: 'right', marginTop: '40px', fontSize: '14px', color: '#718096' }}>
              制定日：2023年9月1日<br />
              最終改定日：2025年4月30日
            </div>
          </motion.div>
        )}
        
        {/* お問い合わせタブ */}
        {activeTab === 'contact' && (
          <motion.div 
            key="contact"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                お問い合わせ方法
              </h2>
              <p style={{ marginBottom: '20px', fontSize: '16px', color: '#4B5563' }}>
                MediMatchに関するご質問、ご相談は以下の方法でお問い合わせください。
                担当者がご丁寧に対応させていただきます。
              </p>
              
              <div style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '15px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <p style={{ margin: 0, fontWeight: '600', color: '#3182CE', fontSize: '17px' }}>お問い合わせについて</p>
                </div>
                <p style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#675032', lineHeight: '1.7' }}>
                  お問い合わせは、以下の電話番号またはメールアドレスにて受け付けております。
                  転職相談やキャリアカウンセリングのご予約も同様にこちらからご連絡ください。
                </p>
              </div>
            </div>
            
            {/* 直接のお問い合わせ */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                お電話・メールでのお問い合わせ
              </h2>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {/* 電話でのお問い合わせ */}
                <div style={{ 
                  backgroundColor: '#f8f2e8',
                  borderRadius: '12px',
                  padding: '30px',
                  border: '1px solid #d5e6d3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#EBF8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 4px 10px rgba(26, 108, 191, 0.15)'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#675032', marginBottom: '12px' }}>
                    お電話でのお問い合わせ
                  </h3>
                  <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '16px', color: '#675032' }}>
                    平日 9:00〜18:00<br />
                    土日祝 要予約
                  </p>
                  <a 
                    href="tel:0587-50-7535" 
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'white',
                      color: '#675032',
                      padding: '16px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '22px',
                      border: '2px solid #EBF8FF',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    0587-50-7535
                  </a>
                  <p style={{ marginTop: '15px', fontSize: '14px', color: '#718096', textAlign: 'center' }}>
                    クリックで電話がかけられます
                  </p>
                </div>
                
                {/* メールでのお問い合わせ */}
                <div style={{ 
                  backgroundColor: '#f8f2e8',
                  borderRadius: '12px',
                  padding: '30px',
                  border: '1px solid #d5e6d3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#EBF8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 4px 10px rgba(26, 108, 191, 0.15)'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#675032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#675032', marginBottom: '12px' }}>
                    メールでのお問い合わせ
                  </h3>
                  <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '16px', color: '#675032' }}>
                    24時間受付<br />
                    営業日内に返信いたします
                  </p>
                  <a 
                    href="mailto:yoshiyuki.hirashima@haruhi-medical.com" 
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'white',
                      color: '#675032',
                      padding: '16px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '16px',
                      border: '2px solid #EBF8FF',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    メールを送る
                  </a>
                  <p style={{ marginTop: '15px', fontSize: '14px', color: '#718096', textAlign: 'center' }}>
                    メールアドレス：jinji@haruhi-medical.com
                  </p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#FEFCBF',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #F6E05E',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D69E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <p style={{ margin: 0, fontWeight: '600', color: '#D69E2E', fontSize: '16px' }}>お問い合わせ時のお願い</p>
                </div>
                <ul style={{ margin: '0 0 0 20px', padding: 0, fontSize: '15px', color: '#744210' }}>
                  <li style={{ marginBottom: '8px' }}>お問い合わせの際は、お名前、ご連絡先、お問い合わせ内容を明記ください。</li>
                  <li style={{ marginBottom: '8px' }}>転職相談の場合は、現在の職種、経験年数、希望勤務地域なども併せてお知らせいただくとスムーズです。</li>
                  <li>土日祝日のお問い合わせは、翌営業日以降の対応となります。</li>
                </ul>
              </div>
            </div>
            
            {/* 会社情報 */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                会社情報
              </h2>
              
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '12px 10px', textAlign: 'left', width: '30%', fontSize: '15px', color: '#675032', verticalAlign: 'top' }}>業務内容</th>
                      <td style={{ padding: '12px 10px', fontSize: '15px', color: '#675032' }}>
                        医療系人材紹介事業<br />
                        医療機関コンサルティング業務<br />
                        医療機関の物流業務<br />
                        医療機器・医療材料の卸
                      </td>
                    </tr>
                    <tr>
                      <th style={{ padding: '12px 10px', textAlign: 'left', width: '30%', fontSize: '15px', color: '#675032', verticalAlign: 'top' }}>有料職業紹介事業許可</th>
                      <td style={{ padding: '12px 10px', fontSize: '15px', color: '#675032' }}>厚生労働大臣許可 23-ユ-302928</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* アクセスマップ */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#675032', 
                marginBottom: '20px',
                borderBottom: '2px solid #d5e6d3', 
                paddingBottom: '10px' 
              }}>
                アクセスマップ
              </h2>
              
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '0',
                  paddingBottom: '56.25%',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  borderRadius: '8px'
                }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.579085739726!2d136.87166631560084!3d35.2465835804012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600373a4b57a6f8b%3A0xb2b662a55d82debc!2z44CSNDgyLTAwMjUg5oSb55-l55yM5bKp5YCJ5biC5aSn5Zyw5paw55S677yT5LiB55uu77yU77yV4oiS77yS!5e0!3m2!1sja!2sjp!4v1587360510271!5m2!1sja!2sjp" 
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      border: '0'
                    }} 
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
                <div style={{
                  backgroundColor: '#f8f2e8',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  color: '#675032',
                  lineHeight: '1.6'
                }}>
                  <p style={{ marginBottom: '8px', fontWeight: '600' }}>アクセス方法</p>
                  <ul style={{ paddingLeft: '20px', margin: '0' }}>
                    <li>名鉄犬山線「岩倉駅」より徒歩15分</li>
                    <li>名鉄バス「大地新町」バス停より徒歩3分</li>
                    <li>駐車場完備（ご来社の際はお気軽にご利用ください）</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* フッター */}
      <footer className="section is-secondary">
        <div className="container">
          <div className="flex_horizontal is-y-center">
            <div className="paragraph_small text-color_secondary">
              © 2021 MediMatch. All rights reserved.
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onReturnHome === 'function') {
                  onReturnHome();
                }
              }}
              className="text-link is-small"
              style={{ marginLeft: 'auto' }}
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PolicyPage;