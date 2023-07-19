import { createSelector } from '@reduxjs/toolkit';

import { getProfileData } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';

export const getIsUserCanEditProfile = createSelector(
  getUserAuthData,
  getProfileData,
  (user, profile): boolean => {
    if (!user || !profile) {
      return false;
    }

    return user.id === profile.id;
  },
);
