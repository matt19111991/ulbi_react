import { Notification } from '@/entities/Notification';

export const notification: Notification = {
  id: '1',
  description: 'Произошло какое-то событие',
  href: 'https://localhost:3000/admin',
  title: 'Уведомление 4',
  userId: '1',
};

export const generateNotifications = (amount: number): Notification[] =>
  new Array(amount).fill(amount).map((_, idx) => ({
    ...notification,
    id: String(idx + 1),
    title: `${notification.title.split('Уведомление').at(0)} ${idx + 1}`,
  }));
