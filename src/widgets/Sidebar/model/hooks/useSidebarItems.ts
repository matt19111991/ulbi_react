import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';

import AboutIcon from '@/shared/assets/icons/about-redesigned.svg';
import ArticleIcon from '@/shared/assets/icons/articles-redesigned.svg';
import MainIcon from '@/shared/assets/icons/home-redesigned.svg';
import ProfileIcon from '@/shared/assets/icons/profile-redesigned.svg';

import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

import { toggleFeatures } from '@/shared/lib/features';

import type { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);

  const sidebarItemsList: SidebarItemType[] = [
    {
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      order: 1,
      path: getRouteMain(),
      text: 'Главная',
    },
    {
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      order: 4,
      path: getRouteAbout(),
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        authOnly: true,
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        order: 2,
        path: getRouteProfile(userData.id),
        text: 'Профиль',
      },
      {
        authOnly: true,
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        order: 3,
        path: getRouteArticles(),
        text: 'Статьи',
      },
    );
  }

  return sidebarItemsList.sort((a, b) => a.order - b.order);
};
