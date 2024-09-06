import type { User } from '@/entities/User';

export interface Subscription {
  endpoint: string;
  expirationTime: null;
  keys: {
    auth: string;
    p256dh: string;
  };
  token: User['id'];
  userAgent: string;
}
