import { Rating } from '@/entities/Rating';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateRating } from '@/shared/lib/generators/rating';

interface GetProfileRatingArgs {
  profileId: string;
  userId: string;
}

interface RateProfileArgs {
  feedback?: string;
  profileId: string;
  rate: number;
  userId: string;
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
          url: '/profile-ratings',
          params: args,
        }) as ProfileRatingResponse;
      },
    }),
    rateProfile: build.mutation<Rating[], RateProfileArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(args.rate)] };
        }

        return baseQuery({
          url: 'profile-ratings',
          method: 'POST',
          body: args,
        }) as ProfileRatingResponse;
      },
    }),
  }),
});

export const { useGetProfileRatingQuery, useRateProfileMutation } = profileRatingApi;
