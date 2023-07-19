import { createSelector } from '@reduxjs/toolkit';

import { getProfileData } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';

export const getIsUserCanEditProfile = createSelector(
  getUserAuthData,
  getProfileData,
  (user, profile): boolean => user?.id === profile?.id,
);
