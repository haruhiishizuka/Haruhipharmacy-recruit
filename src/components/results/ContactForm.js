import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendToSlack } from '../../utils/slackNotifier'; // パスを修正

const ContactForm = ({ resultType, postalCode, profession }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
    contactMethod: '',
    consent: false
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    console.log('🧪 submit event triggered');
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.consent) {
      setFormStatus({
        type: 'error',
        message: '必須項目を入力してください'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: '有効なメールアドレスを入力してください'
      });
      return;
    }

    setFormStatus({
      type: 'loading',
      message: '送信中...'
    });

    const result = await sendToSlack(formData, {
      resultType,
      profession,
      postalCode
    });

    if (result.success) {
      setTimeout(() => {
        setFormStatus({
          type: 'success',
          message: 'メッセージを送信しました。担当者から連絡があります。'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredTime: '',
          contactMethod: '',
          consent: false
        });
      }, 1000);
    } else {
      setFormStatus({
        type: 'error',
        message: result.message || '送信に失敗しました。'
      });
    }
  };

  const timeOptions = [
    { value: '', label: '選択してください' },
    { value: 'morning', label: '午前中（9:00〜12:00）' },
    { value: 'afternoon', label: '午後（13:00〜17:00）' },
    { value: 'evening', label: '夕方以降（17:00〜19:00）' },
    { value: 'anytime', label: '時間帯問わず' }
  ];

  const contactOptions = [
    { value: '', label: '選択してください' },
    { value: 'メール', label: 'メール' },
    { value: '電話', label: '電話' },
    { value: 'LINE', label: 'LINE' }
  ];

  return (
    <motion.div className="p-6 bg-white rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-xl font-bold mb-4">無料キャリア相談フォーム</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">お名前 *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium mb-1">メールアドレス *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium mb-1">電話番号</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">希望連絡方法</label>
          <select name="contactMethod" value={formData.contactMethod} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {contactOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">希望連絡時間帯</label>
          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {timeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">メッセージ（任意）</label>
          <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
        </div>

        <div className="flex items-start">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 mr-2" />
          <label className="text-sm">個人情報の取り扱いに同意します（<a href="#" className="text-blue-500 underline">プライバシーポリシー</a>） *</label>
        </div>

        {formStatus?.type === 'error' && (
          <div className="text-red-600 text-sm">{formStatus.message}</div>
        )}
        {formStatus?.type === 'success' && (
          <div className="text-green-600 text-sm">{formStatus.message}</div>
        )}

        <button type="submit" disabled={formStatus?.type === 'loading'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {formStatus?.type === 'loading' ? (
            <span>送信中...</span>
          ) : (
            <span>送信する</span>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;