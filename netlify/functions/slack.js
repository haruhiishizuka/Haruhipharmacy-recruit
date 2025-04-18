// netlify/functions/slack.js

const fetch = require('node-fetch');

// 環境変数からSlack WebhookのURLを取得
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// メインハンドラー関数
exports.handler = async (event, context) => {
  // CORS対応のヘッダー
  const headers = {
    'Access-Control-Allow-Origin': '*', // 本番環境では適切なオリジンに制限すべき
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // OPTIONSリクエスト（プリフライトリクエスト）への対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  // POSTメソッド以外は受け付けない
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  console.log('Slack通知関数が呼び出されました');

  try {
    // Webhook URLが設定されているか確認
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URLが設定されていません');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Slack Webhook URL is not configured' 
        })
      };
    }

    // リクエストボディの解析
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (e) {
      console.error('リクエストボディの解析に失敗:', e);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid request body' 
        })
      };
    }

    // ペイロードの検証
    if (!payload || !payload.payload) {
      console.error('無効なペイロード形式:', payload);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid payload format' 
        })
      };
    }

    console.log('Slackに送信するペイロード:', JSON.stringify(payload.payload));

    // Slackに送信
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.payload)
    });

    // レスポンスの確認
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Slack API エラー: ${response.status}`, errorText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: `Slack API error: ${response.status} - ${errorText}` 
        })
      };
    }

    // 成功レスポンス
    console.log('Slackメッセージが正常に送信されました');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent to Slack successfully' 
      })
    };

  } catch (error) {
    // 例外処理
    console.error('Slack通知処理中のエラー:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: `Internal server error: ${error.message}` 
      })
    };
  }
};