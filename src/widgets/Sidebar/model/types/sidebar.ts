import type { FC, SVGProps } from 'react';

export interface SidebarItemType {
  authOnly?: boolean;
  Icon: FC<SVGProps<SVGSVGElement>>;
  order: number;
  path: string;
  text: string;
}
