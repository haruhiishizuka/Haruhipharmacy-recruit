// src/utils/analyticsDebug.js
// アナリティクスのデバッグ・診断ツール

/**
 * デバッグユーティリティ - アナリティクスの問題診断用
 * - ブラウザのコンソールから使用するためのヘルパー関数
 * - dataLayerの状態確認
 * - テストイベントの送信
 * - GTMの接続状態確認
 */

// グローバルスコープにデバッグ関数を追加
window.MediMatchDebug = {
    /**
     * GTMおよびGA4の接続状態を診断
     */
    diagnose: function() {
      console.group('🔍 MediMatch アナリティクス診断');
      
      // 1. dataLayerの存在確認
      const hasDataLayer = typeof window.dataLayer !== 'undefined';
      console.log(`✓ dataLayer: ${hasDataLayer ? '存在します' : '存在しません'}`);
      
      // 2. dataLayerの内容確認
      if (hasDataLayer) {
        console.log('📊 現在のdataLayer内容:', [...window.dataLayer]);
        
        // イベント数をカウント
        const eventCount = window.dataLayer.filter(item => item.event).length;
        console.log(`📊 記録されているイベント数: ${eventCount}`);
      }
      
      // 3. GTMスクリプトの読み込み確認
      const gtmScriptLoaded = !!document.getElementById('gtm-script') || 
                              !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
      console.log(`✓ GTMスクリプト: ${gtmScriptLoaded ? '読み込まれています' : '読み込まれていません'}`);
      
      // 4. GTM関数の存在確認
      const hasGtmFunction = typeof window.google_tag_manager !== 'undefined';
      console.log(`✓ GTM関数: ${hasGtmFunction ? '利用可能です' : '利用できません'}`);
      
      // 5. GA4確認
      const hasGA4 = typeof window.gtag !== 'undefined';
      console.log(`✓ gtag関数(GA4): ${hasGA4 ? '利用可能です' : '利用できません'}`);
      
      // 6. コンテナID確認
      if (hasGtmFunction) {
        try {
          const containerId = Object.keys(window.google_tag_manager).find(k => k.startsWith('GTM-'));
          console.log(`🏷️ 読み込まれているGTMコンテナID: ${containerId || '不明'}`);
        } catch(e) {
          console.log('🏷️ GTMコンテナID: 取得できませんでした');
        }
      }
      
      // 7. 問題診断
      const hasPotentialIssues = !hasDataLayer || !gtmScriptLoaded || !hasGtmFunction;
      
      if (hasPotentialIssues) {
        console.error('❌ アナリティクス連携に問題があります');
        
        console.log('🔧 問題解決のヒント:');
        
        if (!hasDataLayer) {
          console.log('- dataLayerが初期化されていません。analytics.jsのinitializeAnalytics()関数が実行されているか確認してください。');
        }
        
        if (!gtmScriptLoaded) {
          console.log('- GTMスクリプトが読み込まれていません。TagManager.jsのinjectGTMScript()関数が正しく動作しているか確認してください。');
        }
        
        if (!hasGtmFunction) {
          console.log('- GTM関数が利用できません。GTMコンテナが公開されているか、正しいIDを使用しているか確認してください。');
        }
      } else {
        console.log('✅ アナリティクス連携は正常に動作しているようです');
      }
      
      console.groupEnd();
      
      return {
        hasDataLayer,
        gtmScriptLoaded,
        hasGtmFunction,
        hasGA4,
        hasPotentialIssues
      };
    },
  
    /**
     * テストイベントを送信する
     * @param {string} eventName - イベント名
     * @param {Object} params - パラメータ (オプション)
     */
    sendTestEvent: function(eventName = 'test_event', params = {}) {
      if (typeof window.dataLayer === 'undefined') {
        console.error('❌ dataLayerが初期化されていないため、イベントを送信できません');
        return false;
      }
      
      const eventData = {
        event: eventName,
        event_time: new Date().toISOString(),
        event_source: 'debug_utility',
        ...params
      };
      
      try {
        window.dataLayer.push(eventData);
        console.log(`✅ テストイベント送信: ${eventName}`, eventData);
        return true;
      } catch (error) {
        console.error('❌ テストイベント送信エラー:', error);
        return false;
      }
    },
  
    /**
     * ページビューのテスト送信
     */
    sendTestPageView: function() {
      return this.sendTestEvent('page_view', {
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href
      });
    },
  
    /**
     * コンバージョンイベントのテスト送信
     */
    sendTestConversion: function() {
      return this.sendTestEvent('contact_submit', {
        result_type: 'テスト結果タイプ',
        profession: 'テスト職種',
        contact_method: 'テスト連絡方法'
      });
    },
  
    /**
     * dataLayerをクリア（テスト用）
     * 注意: 実際のデータが消去されるため、慎重に使用してください
     */
    clearDataLayer: function() {
      if (typeof window.dataLayer !== 'undefined') {
        // 初期イベントのみを残して他をクリア
        const initialEvents = window.dataLayer.filter(item => item.event === 'gtm.js');
        window.dataLayer.length = 0;
        
        // 初期イベントを戻す
        initialEvents.forEach(event => window.dataLayer.push(event));
        
        console.log('🧹 dataLayerをクリアしました（初期イベントは保持）');
        return true;
      }
      return false;
    },
  
    /**
     * ブラウザのローカルストレージに保存されたデータを表示
     */
    showStoredData: function() {
      try {
        console.group('🔍 ローカルストレージデータ');
        
        // MediMatch関連のストレージキーを取得
        const medimatchKeys = Object.keys(localStorage).filter(key => 
          key.startsWith('medimatch_') || 
          key.includes('MediMatch') || 
          key.includes('quiz') ||
          key.includes('profession') ||
          key.includes('contact')
        );
        
        if (medimatchKeys.length === 0) {
          console.log('MediMatch関連のデータはローカルストレージに保存されていません');
        } else {
          medimatchKeys.forEach(key => {
            try {
              const value = localStorage.getItem(key);
              const parsedValue = JSON.parse(value);
              console.log(`📦 ${key}:`, parsedValue);
            } catch (e) {
              console.log(`📦 ${key}:`, localStorage.getItem(key));
            }
          });
        }
        
        // セッションストレージも確認
        console.log('🔍 セッションストレージデータ:');
        const sessionKeys = Object.keys(sessionStorage).filter(key => 
          key.startsWith('medimatch_') || 
          key.includes('MediMatch') || 
          key.includes('quiz') ||
          key.includes('profession') ||
          key.includes('contact')
        );
        
        if (sessionKeys.length === 0) {
          console.log('MediMatch関連のデータはセッションストレージに保存されていません');
        } else {
          sessionKeys.forEach(key => {
            try {
              const value = sessionStorage.getItem(key);
              const parsedValue = JSON.parse(value);
              console.log(`📦 ${key}:`, parsedValue);
            } catch (e) {
              console.log(`📦 ${key}:`, sessionStorage.getItem(key));
            }
          });
        }
        
        console.groupEnd();
      } catch (error) {
        console.error('ストレージデータの取得中にエラーが発生しました:', error);
      }
    }
  };
  
  /**
   * 読み込み完了メッセージを表示
   */
  console.log('🔍 MediMatch アナリティクス・デバッグ・ツールが読み込まれました');
  console.log('使い方: ブラウザのコンソールから以下のコマンドを実行してください');
  console.log('- MediMatchDebug.diagnose() - アナリティクス接続状態を診断');
  console.log('- MediMatchDebug.sendTestEvent() - テストイベントを送信');
  console.log('- MediMatchDebug.sendTestPageView() - テストページビューを送信');
  console.log('- MediMatchDebug.sendTestConversion() - テストコンバージョンを送信');
  console.log('- MediMatchDebug.showStoredData() - ローカルストレージのデータを表示');
  
  /**
   * 自動診断 - 10秒後に自動的に診断を実行
   */
  setTimeout(() => {
    console.log('🔄 アナリティクス自動診断を実行します...');
    window.MediMatchDebug.diagnose();
  }, 10000);