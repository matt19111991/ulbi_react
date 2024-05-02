import type { Profile } from '@/entities/Profile';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateProfileRating } from '@/shared/lib/generators/rating';

import type { ProfileRatingEntity } from '../model/types/profileRatingEntity';

export interface GetProfileRatingArgs {
  profileId: Profile['id'];
  userId: User['id'];
}

export interface RateProfileArgs {
  feedback?: Rating['feedback'];
  profileId: Profile['id'];
  rate: Rating['rate'];
  userId: User['id'];
}

interface GetProfileRatingResponse {
  data: ProfileRatingEntity[];
}

interface RateProfileResponse {
  data: ProfileRatingEntity;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<ProfileRatingEntity[], GetProfileRatingArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateProfileRating(4)] };
        }

        return baseQuery({
          params: args,
          url: 'profile-ratings',
        }) as GetProfileRatingResponse;
      },
    }),
    rateProfile: build.mutation<ProfileRatingEntity, RateProfileArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateProfileRating(args.rate) };
        }

        return baseQuery({
          body: args,
          method: 'POST',
          url: 'profile-ratings',
        }) as RateProfileResponse;
      },
    }),
  }),
});

export const { useGetProfileRatingQuery, useRateProfileMutation } = profileRatingApi;
