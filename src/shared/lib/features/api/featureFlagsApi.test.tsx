import type { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import type { FeatureFlags } from '@/shared/types/featureFlags';

import { useUpdateFeatureFlagsMutation } from './featureFlagsApi';

interface FeatureFlagsMockProperties {
  features: Partial<FeatureFlags>;
  userId: string;
}

const featureFlagsMock: FeatureFlagsMockProperties = {
  features: {
    isArticleRatingEnabled: true,
  },
  userId: '1',
};

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('featureFlagsApi', () => {
  describe('useUpdateFeatureFlagsMutation', () => {
    test('returns updated feature flags', async () => {
      /*
       'renderHook()' принимает аргументами:
         1. колбэк, в котором вызываем хук
         2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
            тестируемого компонента

      'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
       значение, возвращаемое из хука, в нашем случае кортеж: '[mutation, { data: FeatureFlagsMockProperties }]'
     */
      const { result } = renderHook(() => useUpdateFeatureFlagsMutation(), {
        wrapper: ComponentWrapper,
      });

      /*
        основная цель 'act()' - гарантировать корректную последовательность обновлений в 'React'
        при работе с сайд-эффектами и действиями пользователя
      */
      act(() => {
        const [mutation] = result.current;

        mutation(featureFlagsMock);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual(featureFlagsMock);
      });
    });
  });
});
