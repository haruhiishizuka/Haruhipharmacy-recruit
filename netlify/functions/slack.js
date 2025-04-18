// Netlify Function for Slack notifications
exports.handler = async function(event, context) {
  // CORS対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // POSTリクエスト以外は拒否
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }) 
    };
  }

  try {
    // Slack Webhook URL（Netlify環境変数から取得）
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('SLACK_WEBHOOK_URL環境変数が設定されていません');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Webhook URL not configured' })
      };
    }

    // リクエストボディを解析
    const requestBody = JSON.parse(event.body);
    const { formData, diagnosticInfo } = requestBody;
    
    // Slackメッセージを構築
    const message = {
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

    // メッセージがあれば追加
    if (formData.message) {
      message.blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `*メッセージ:*\n${formData.message}` }
      });
    }

    // 時間情報を追加
    message.blocks.push({
      type: 'context',
      elements: [
        { type: 'mrkdwn', text: `送信日時: ${new Date().toLocaleString('ja-JP')}` }
      ]
    });

    // Slackに送信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with status: ${response.status}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    };
    
  } catch (error) {
    console.error('Slack通知エラー:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};