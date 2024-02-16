import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';

// 'BugButton' - компонент для тестирования 'ErrorBoundary'

export const BugButton = memo(() => {
  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const onThrow = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <ButtonRedesigned color='normal' onClick={onThrow} variant='filled'>
          {t('Выбросить ошибку')}
        </ButtonRedesigned>
      }
      off={
        <ButtonDeprecated onClick={onThrow} theme={ButtonTheme.BACKGROUND_INVERTED}>
          {t('Выбросить ошибку')}
        </ButtonDeprecated>
      }
    />
  );
});

BugButton.displayName = 'BugButton';
