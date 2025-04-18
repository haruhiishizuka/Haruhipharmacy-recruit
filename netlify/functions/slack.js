// netlify/functions/slack.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // CORS対応
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // プリフライトリクエスト(OPTIONS)への対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // POSTメソッド以外は拒否
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // リクエストボディを解析
    const payload = JSON.parse(event.body);
    const { formData, diagnosticInfo } = payload;

    // Webhook URL - 環境変数から取得
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

    // Slackメッセージのフォーマット
    const message = {
      text: `新規お問い合わせ - ${diagnosticInfo?.resultType || '未診断'}タイプ`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `新規お問い合わせ - ${diagnosticInfo?.resultType || '未診断'}タイプ`,
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*名前:*\n${formData.name || '未入力'}` },
            { type: 'mrkdwn', text: `*メール:*\n${formData.email || '未入力'}` }
          ]
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*電話番号:*\n${formData.phone || '未入力'}` },
            { type: 'mrkdwn', text: `*希望連絡方法:*\n${formData.contactMethod || '未指定'}` }
          ]
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*職種:*\n${diagnosticInfo?.profession || '未指定'}` },
            { type: 'mrkdwn', text: `*郵便番号:*\n${diagnosticInfo?.postalCode || '未指定'}` }
          ]
        }
      ]
    };

    // メッセージがある場合は追加
    if (formData.message) {
      message.blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `*メッセージ:*\n${formData.message}` }
      });
    }

    // Slack APIへ送信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    // レスポンスの確認
    if (!response.ok) {
      throw new Error(`Slack responded with status ${response.status}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Slack通知エラー:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: error.message 
      })
    };
  }
};