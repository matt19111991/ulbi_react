import type { Subscription } from '@/entities/Subscription';

/**
 * Шаблон подписки
 */
export const subscription: Subscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/eu-l4l42jWg:APA91bGBHhlD7BE6',
  expirationTime: null,
  keys: {
    auth: '_tjTCOwxxjWo0wnktaeCCw',
    p256dh:
      'BKe9c0IF4Xsl2UxLCbtNUjW-k6xDHUFSFmBwvKFVQQKZOrqLGslD67qzF3IFDRtZFm4z-Bd2zUleEbisg3x8f9M',
  },
  token: '1',
  userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)',
};

/**
 * Генератор подписок
 * @param amount - количество необходимых подписок
 */
export const generateSubscriptions = (amount: number): Subscription[] =>
  // 'fill(amount)' - неважно, чем заполнять
  new Array(amount).fill(amount).map((_, idx) => ({
    ...subscription,
    endpoint: `https://fcm.googleapis.com/fcm/send/eu-l4l42jWg:APA91bGBHhlD7BE${idx + 1}`,
    keys: {
      auth: `_tjTCOwxxjWo0wnktaeCC${idx + 1}`,
      p256dh: `BKe9c0IF4Xsl2UxLCbtNUjW-k6xDHUFSFmBwvKFVQQKZOrqLGslD67qzF3IFDRtZFm4z-Bd2zUleEbisg3x8f9${idx + 1}`,
    },
    token: String(idx + 1),
    userAgent: `Mozilla/5.0 (Linux; Android ${idx + 1}; K) AppleWebKit/537.36 (KHTML, like Gecko)`,
  }));
