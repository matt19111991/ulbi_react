import type { Notification } from '@/entities/Notification';

import { getRouteArticles } from '@/shared/const/router';

/**
 * Шаблон уведомления
 */
const notification: Notification = {
  id: '1',
  description: 'Добавлена новая статья',
  href: getRouteArticles(),
  title: 'Уведомление 1',
  userId: '1',
};

/**
 * Генератор уведомлений
 * @param amount - количество необходимых уведомлений
 */
export const generateNotifications = (amount: number): Notification[] =>
  // 'fill(amount)' - неважно, чем заполнять
  new Array(amount).fill(amount).map((_, idx) => ({
    ...notification,
    id: String(idx + 1),
    title: `${notification.title.split('Уведомление').at(0)} ${idx + 1}`,
  }));
