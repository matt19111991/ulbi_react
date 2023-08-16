import { RouteProps } from 'react-router-dom';

// eslint-disable-next-line path-checker-1911/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}
