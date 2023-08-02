import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from 'entities/User';

import { getProfileData } from '../getProfileData/getProfileData';

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
