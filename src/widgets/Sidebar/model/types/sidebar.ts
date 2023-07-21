import { SVGProps, VFC } from 'react';

export interface SidebarItemType {
  authOnly?: boolean;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  order: number;
  path: string;
  text: string;
}
