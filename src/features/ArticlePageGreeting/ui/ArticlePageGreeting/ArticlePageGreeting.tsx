import { memo, useCallback, useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';

import { ToggleFeatures } from '@/shared/lib/features';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';

import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

interface ArticlePageGreetingProps {
  /**
   * Активация мобильного режима для 'storybook'
   */
  storybookMobile?: boolean;
}

export const ArticlePageGreeting = memo(({ storybookMobile }: ArticlePageGreetingProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isArticlesPageHasBeenOpened } = useJsonSettings();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isArticlesPageHasBeenOpened) {
      setIsOpen(true);

      dispatch(saveJsonSettings({ isArticlesPageHasBeenOpened: true }));
    }
  }, [dispatch, isArticlesPageHasBeenOpened]);

  const onClose = useCallback(() => setIsOpen(false), []);

  const text: JSX.Element = (
    <VStack gap='8'>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <>
            <TextRedesigned align='center' title={t('Добро пожаловать на страницу статей')} />

            <TextRedesigned
              align='center'
              text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
            />
          </>
        }
        off={
          <>
            <TextDeprecated
              align={TextAlign.CENTER}
              title={t('Добро пожаловать на страницу статей')}
            />

            <TextDeprecated
              align={TextAlign.CENTER}
              text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
            />
          </>
        }
      />
    </VStack>
  );

  if (isMobile || storybookMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal isOpen={isOpen} lazy onClose={onClose}>
      {text}
    </Modal>
  );
});

ArticlePageGreeting.displayName = 'ArticlePageGreeting';
