import { UserRole } from '@/entities/User';

import { Theme } from '@/shared/const/theme';

export const user = {
  id: '1',
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  features: {
    isAppRedesigned: true,
    isArticleRatingEnabled: false,
    isCounterEnabled: true,
  },
  jsonSettings: {
    isArticlesPageHasBeenOpened: true,
    isFirstVisit: false,
    settingsPageHasBeenOpen: false,
    theme: Theme.DARK,
  },
  password: '12345',
  roles: [UserRole.ADMIN],
  username: 'Jack',
};
