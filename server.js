const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
const PORT = 3001;
// fetch を node-fetch 経由で使う

app.use(cors());
app.use(express.json());

app.post('/api/notify', async (req, res) => {
  const { formData, diagnosticInfo } = req.body;

  console.log('📨 通知リクエスト受信:', {
    formData: formData || 'データなし',
    diagnosticInfo: diagnosticInfo || 'データなし'
  });

  const webhook = process.env.SLACK_WEBHOOK_URL;
  console.log('🔗 Webhook設定:', webhook ? 'OK' : 'なし');

  if (!webhook) {
    return res.status(500).json({
      success: false,
      error: 'Webhook URLが設定されていません'
    });
  }

  const timeLabels = {
    morning: '午前中（9:00〜12:00）',
    afternoon: '午後（13:00〜17:00）',
    evening: '夕方以降（17:00〜19:00）',
    anytime: '時間帯問わず'
  };

  const preferredTimeLabel = timeLabels[formData.preferredTime] || '未指定';

  const message = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '📩 新しいお問い合わせ', emoji: true }
      },
      { type: 'divider' },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*氏名:*\n${formData.name || '未入力'}` },
          { type: 'mrkdwn', text: `*メール:*\n${formData.email || '未入力'}` },
          { type: 'mrkdwn', text: `*電話番号:*\n${formData.phone || '未入力'}` },
          { type: 'mrkdwn', text: `*希望連絡方法:*\n${formData.contactMethod || '未指定'}` },
          { type: 'mrkdwn', text: `*希望時間帯:*\n${preferredTimeLabel}` },
          { type: 'mrkdwn', text: `*診断結果:*\n${diagnosticInfo?.resultType || '未指定'}` },
          { type: 'mrkdwn', text: `*職種:*\n${diagnosticInfo?.profession || '未指定'}` },
          { type: 'mrkdwn', text: `*郵便番号:*\n${diagnosticInfo?.postalCode || '未指定'}` }
        ]
      },
      ...(formData.message ? [{
        type: 'section',
        text: { type: 'mrkdwn', text: `*メッセージ:*\n${formData.message}` }
      }] : []),
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `送信時間: ${new Date().toLocaleString('ja-JP')}` }]
      }
    ]
  };

  try {
    console.log('🚀 Slackへ送信開始...');
    const slackRes = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    const text = await slackRes.text();
    console.log('📬 Slack応答:', slackRes.status, text);

    if (!slackRes.ok) throw new Error(`Slack通知エラー: ${text}`);
    res.json({ success: true });

  } catch (err) {
    console.error('❌ Slack送信エラー:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Slack通知APIサーバー起動中： http://localhost:${PORT}/api/notify`);
});
