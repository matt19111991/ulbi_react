import { Rating } from '@/entities/Rating';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateRating } from '@/shared/lib/generators/rating';

interface GetProfileRatingArgs {
  profileId: string;
  userId: string;
}

interface GetProfileRatingResponse {
  data: Rating[];
}

interface RateProfileArgs {
  feedback?: string;
  profileId: string;
  rate: number;
  userId: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[], GetProfileRatingArgs>({
      queryFn: ({ profileId, userId }, api, extraOptions, baseQuery) => {
        if (__PROJECT__ === 'storybook') {
          return { data: [generateRating(4)] };
        }

        return baseQuery({
          url: '/profile-ratings',
          params: { profileId, userId },
        }) as GetProfileRatingResponse;
      },
    }),
    rateProfile: build.mutation<void, RateProfileArgs>({
      query: (args) => ({
        url: 'profile-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useGetProfileRatingQuery, useRateProfileMutation } = profileRatingApi;
