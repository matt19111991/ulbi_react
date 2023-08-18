import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';

import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';

import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        Icon: MainIcon,
        order: 1,
        path: getRouteMain(),
        text: 'Главная',
      },
      {
        Icon: AboutIcon,
        order: 4,
        path: getRouteAbout(),
        text: 'О сайте',
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          authOnly: true,
          Icon: ProfileIcon,
          order: 2,
          path: getRouteProfile(userData.id),
          text: 'Профиль',
        },
        {
          authOnly: true,
          Icon: ArticleIcon,
          order: 3,
          path: getRouteArticles(),
          text: 'Статьи',
        },
      );
    }

    return sidebarItemsList.sort((a, b) => a.order - b.order);
  },
);
