import type { Profile } from '@/entities/Profile';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateRating } from '@/shared/lib/generators/rating';

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

interface ProfileRatingResponse {
  data: Rating[];
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[], GetProfileRatingArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(4)] };
        }

        return baseQuery({
          params: args,
          url: 'profile-ratings',
        }) as ProfileRatingResponse;
      },
    }),
    rateProfile: build.mutation<Rating[], RateProfileArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(args.rate)] };
        }

        return baseQuery({
          body: args,
          method: 'POST',
          url: 'profile-ratings',
        }) as ProfileRatingResponse;
      },
    }),
  }),
});

export const { useGetProfileRatingQuery, useRateProfileMutation } = profileRatingApi;
