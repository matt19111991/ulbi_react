import { SVGProps, VFC } from 'react';

export interface SidebarItemType {
  authOnly?: boolean;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  path: string;
  text: string;
}
