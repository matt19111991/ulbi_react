import { SVGProps, VFC } from 'react';

import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
  authOnly?: boolean;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  path: string;
  text: string;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    Icon: MainIcon,
    path: RoutePath.main,
    text: 'Главная',
  },
  {
    Icon: AboutIcon,
    path: RoutePath.about,
    text: 'О сайте',
  },
  {
    authOnly: true,
    Icon: ProfileIcon,
    path: RoutePath.profile,
    text: 'Профиль',
  },
];
