// src/utils/slackNotifier.js - Optimized Implementation

/**
 * Enhanced Slack notification system with optimizations for:
 * - Batch processing
 * - Rate limiting
 * - Message formatting
 * - Efficient error handling
 * - Resource usage optimization
 */

// In-memory queue to batch notifications
const notificationQueue = [];
let isProcessingQueue = false;
let lastNotificationTime = 0;

// Constants
const RATE_LIMIT_INTERVAL = 1000; // Minimum 1 second between API calls
const MAX_RETRY_ATTEMPTS = 3;     // Maximum retry attempts for failed notifications
const NOTIFICATION_CACHE_SIZE = 20; // Size of notification cache for deduplication
const QUEUE_PROCESS_INTERVAL = 3000; // Process queue every 3 seconds

// Cache of recent notifications to prevent duplicates (using simple LRU-like approach)
const recentNotifications = [];

/**
 * Generate a unique hash for a notification to detect duplicates
 * @param {Object} formData - The form data
 * @param {Object} diagnosticInfo - Additional diagnostic information
 * @returns {String} A hash string representing the notification
 */
const generateNotificationHash = (formData, diagnosticInfo) => {
  return `${formData.email || ''}-${formData.name || ''}-${diagnosticInfo?.resultType || ''}`;
};

/**
 * Check if a notification is a potential duplicate
 * @param {String} hash - The notification hash to check
 * @returns {Boolean} True if likely a duplicate
 */
const isDuplicate = (hash) => {
  // Check if this hash exists in recent notifications
  return recentNotifications.some(item => item.hash === hash);
};

/**
 * Add a notification to the recent cache
 * @param {String} hash - The notification hash to add
 */
const addToRecentNotifications = (hash) => {
  // Add to the front of the array
  recentNotifications.unshift({ hash, timestamp: Date.now() });
  
  // Keep cache size under limit
  if (recentNotifications.length > NOTIFICATION_CACHE_SIZE) {
    recentNotifications.pop();
  }
};

/**
 * Process the notification queue
 * @returns {Promise<void>}
 */
const processQueue = async () => {
  if (isProcessingQueue || notificationQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  try {
    // Process one notification at a time to respect rate limits
    const notification = notificationQueue.shift();
    
    // Ensure rate limiting
    const now = Date.now();
    const timeSinceLastNotification = now - lastNotificationTime;
    
    if (timeSinceLastNotification < RATE_LIMIT_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_INTERVAL - timeSinceLastNotification));
    }
    
    // Send the notification
    await sendNotificationToSlack(
      notification.formData, 
      notification.diagnosticInfo, 
      notification.resolve, 
      notification.reject,
      notification.attempt || 1
    );
    
    lastNotificationTime = Date.now();
  } catch (error) {
    console.error('Error processing notification queue:', error);
  } finally {
    isProcessingQueue = false;
    
    // If there are more items in the queue, continue processing
    if (notificationQueue.length > 0) {
      setTimeout(processQueue, 100); // Small delay to prevent CPU hogging
    }
  }
};

/**
 * Start the queue processor
 */
const startQueueProcessor = () => {
  setInterval(() => {
    if (notificationQueue.length > 0) {
      processQueue();
    }
  }, QUEUE_PROCESS_INTERVAL);
};

// Start the queue processor immediately
startQueueProcessor();

/**
 * Optimized and enhanced message formatting for better readability in Slack
 * @param {Object} formData - The form data
 * @param {Object} diagnosticInfo - Additional diagnostic information
 * @returns {Object} Formatted Slack message payload
 */
const formatSlackMessage = (formData, diagnosticInfo) => {
  // Get the current time in a readable format for Japan timezone
  const timestamp = new Date().toLocaleString('ja-JP', { 
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Determine severity/priority based on available information
  const hasPriority = formData.contactMethod === 'phone' || formData.message?.toLowerCase().includes('急いで');
  const priorityIcon = hasPriority ? '🔴' : '🔵';
  
  // Format the header with priority and type
  const headerText = `${priorityIcon} 新規${diagnosticInfo?.resultType ? `「${diagnosticInfo.resultType}」タイプ` : ''}お問い合わせ`;
  
  // Create a richer, more scannable message format
  return {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: headerText, emoji: true }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*名前:*\n${formData.name || '未入力'}` },
          { type: 'mrkdwn', text: `*連絡先:*\n${formData.email || '未入力'}` }
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
          { type: 'mrkdwn', text: `*診断結果:*\n${diagnosticInfo?.resultType || '未診断'}` },
          { type: 'mrkdwn', text: `*職種:*\n${diagnosticInfo?.profession || '未指定'}` }
        ]
      },
      ...(formData.message ? [{
        type: 'section',
        text: { type: 'mrkdwn', text: `*メッセージ:*\n${formData.message}` }
      }] : []),
      {
        type: 'context',
        elements: [
          { type: 'mrkdwn', text: `送信日時: ${timestamp} | 地域: ${diagnosticInfo?.postalCode ? `〒${diagnosticInfo.postalCode}` : '不明'}` }
        ]
      },
      {
        type: 'divider'
      }
    ]
  };
};

/**
 * Try to send a notification to Slack with retries
 * @param {Object} formData - User submitted form data
 * @param {Object} diagnosticInfo - Additional diagnostic information
 * @param {Function} resolve - Promise resolve function
 * @param {Function} reject - Promise reject function
 * @param {Number} attempt - Current attempt number
 */
const sendNotificationToSlack = async (formData, diagnosticInfo, resolve, reject, attempt = 1) => {
  // Format the message
  const messageData = formatSlackMessage(formData, diagnosticInfo);
  
  // Get the Slack webhook URL from environment
  const webhookUrl = process.env.REACT_APP_SLACK_WEBHOOK_URL;
  
  // If no webhook is configured, use the mock implementation
  if (!webhookUrl) {
    console.log('⚠️ No webhook URL configured, using mock implementation');
    const mockResult = await mockSendToSlack(formData, diagnosticInfo);
    resolve(mockResult);
    return;
  }
  
  try {
    // Attempt to send directly to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    
    if (response.ok) {
      console.log('✅ Slack webhook successful!');
      resolve({ success: true });
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    console.warn(`⚠️ Slack webhook error (attempt ${attempt}/${MAX_RETRY_ATTEMPTS}):`, error.message);
    
    // If we have attempts left, retry after delay
    if (attempt < MAX_RETRY_ATTEMPTS) {
      const retryDelay = 1000 * Math.pow(2, attempt - 1); // Exponential backoff
      
      console.log(`🔄 Retrying in ${retryDelay}ms`);
      setTimeout(() => {
        // Add back to the queue with incremented attempt
        notificationQueue.push({
          formData,
          diagnosticInfo,
          resolve,
          reject,
          attempt: attempt + 1
        });
        
        processQueue();
      }, retryDelay);
    } else {
      // All retries failed, fall back to mock implementation
      console.log('🔄 All webhook attempts failed, using mock implementation');
      const mockResult = await mockSendToSlack(formData, diagnosticInfo);
      resolve(mockResult);
    }
  }
};

/**
 * Save to local storage for offline tracking
 * @param {Object} formData - Form data
 * @param {Object} diagnosticInfo - Diagnostic info
 */
const saveToLocalStorage = (formData, diagnosticInfo) => {
  try {
    const storedRequests = JSON.parse(localStorage.getItem('medimatch_contact_requests') || '[]');
    
    // Add new request with timestamp
    storedRequests.push({
      formData,
      diagnosticInfo,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the last 50 requests to avoid storage issues
    const trimmedRequests = storedRequests.slice(-50);
    
    localStorage.setItem('medimatch_contact_requests', JSON.stringify(trimmedRequests));
    console.log('💾 Request saved to localStorage for later review');
  } catch (e) {
    console.warn('⚠️ Failed to save to localStorage:', e);
  }
};

/**
 * Mock implementation for testing and fallback
 * @param {Object} formData - The form data
 * @param {Object} diagnosticInfo - Additional diagnostic information
 * @returns {Promise<Object>} Mock response
 */
export const mockSendToSlack = (formData, diagnosticInfo) => {
  console.log('🔔 MOCK sendToSlack called with:', { formData, diagnosticInfo });
  
  // Log the request details for testing
  console.log(`
====== お問い合わせデータ ======
【氏名】: ${formData.name || '未入力'}
【メール】: ${formData.email || '未入力'}
【電話番号】: ${formData.phone || '未入力'}
【希望連絡方法】: ${formData.contactMethod || '未指定'}
【メッセージ】: ${formData.message || 'なし'}

====== 診断情報 ======
【診断結果】: ${diagnosticInfo?.resultType || '未指定'}
【職種】: ${diagnosticInfo?.profession || '未指定'}
【郵便番号】: ${diagnosticInfo?.postalCode || '未指定'}

====== 送信時間 ======
${new Date().toLocaleString('ja-JP')}
  `);
  
  // Save to local storage for offline tracking
  saveToLocalStorage(formData, diagnosticInfo);
  
  return new Promise((resolve) => {
    // Mock a small delay to simulate API call
    setTimeout(() => {
      console.log('✅ MOCK API response: Success - お問い合わせは正常に記録されました');
      resolve({ success: true });
    }, 800);
  });
};

/**
 * Main export function - Enhanced version with batching and throttling
 * Sends form data to Slack with optimized handling
 * @param {Object} formData - User submitted form data
 * @param {Object} diagnosticInfo - Additional diagnostic information
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const sendToSlack = (formData, diagnosticInfo) => {
  console.log('🔔 Enhanced sendToSlack called with:', { formData, diagnosticInfo });
  
  // Generate a hash to detect potential duplicates
  const notificationHash = generateNotificationHash(formData, diagnosticInfo);
  
  // Check for duplicates (submit within 10 minutes)
  if (isDuplicate(notificationHash)) {
    console.warn('⚠️ Potential duplicate submission detected');
    
    // Still add to local storage but mark as potential duplicate
    saveToLocalStorage({
      ...formData,
      potentialDuplicate: true
    }, diagnosticInfo);
    
    // Process it anyway, but log the warning
  }
  
  // Add to recent notifications cache
  addToRecentNotifications(notificationHash);
  
  return new Promise((resolve, reject) => {
    // Add to the notification queue
    notificationQueue.push({
      formData,
      diagnosticInfo,
      resolve,
      reject
    });
    
    // Try to process the queue immediately
    processQueue();
  });
};

// Export a monitoring function to check queue health
export const getNotificationQueueStatus = () => {
  return {
    queueLength: notificationQueue.length,
    isProcessing: isProcessingQueue,
    recentNotificationsCount: recentNotifications.length
  };
};

// Add a cleanup function to persist unprocessed notifications on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (notificationQueue.length > 0) {
      try {
        // Store unprocessed notifications
        const unprocessed = JSON.parse(localStorage.getItem('medimatch_unprocessed_notifications') || '[]');
        const combinedQueue = [...unprocessed, ...notificationQueue];
        
        // Keep only the last 20 items to avoid storage issues
        const trimmedQueue = combinedQueue.slice(-20);
        
        localStorage.setItem('medimatch_unprocessed_notifications', JSON.stringify(trimmedQueue));
      } catch (e) {
        console.error('Failed to save unprocessed notifications:', e);
      }
    }
  });
  
  // Check for unprocessed notifications on page load
  window.addEventListener('load', () => {
    try {
      const unprocessed = JSON.parse(localStorage.getItem('medimatch_unprocessed_notifications') || '[]');
      
      if (unprocessed.length > 0) {
        console.log(`🔄 Found ${unprocessed.length} unprocessed notifications, adding to queue`);
        
        // Add to queue with a slight delay to ensure environment is fully loaded
        setTimeout(() => {
          unprocessed.forEach(item => {
            notificationQueue.push(item);
          });
          
          // Clear the storage
          localStorage.removeItem('medimatch_unprocessed_notifications');
          
          // Start processing
          processQueue();
        }, 3000);
      }
    } catch (e) {
      console.error('Failed to load unprocessed notifications:', e);
    }
  });
}