import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';

import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ArticlePageGreeting.module.scss';

interface ArticlePageGreetingProps {
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

  const onClose = () => setIsOpen(false);

  const text = (
    <VStack gap='8'>
      <Text align={TextAlign.CENTER} title={t('Добро пожаловать на страницу статей')} />

      <Text
        align={TextAlign.CENTER}
        text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
      />
    </VStack>
  );

  if (isMobile || storybookMobile) {
    return (
      <Drawer isOpen={isOpen} lazy onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal
      className={classes.ArticlePageGreetingModalContent}
      isOpen={isOpen}
      lazy
      onClose={onClose}
    >
      {text}
    </Modal>
  );
});

ArticlePageGreeting.displayName = 'ArticlePageGreeting';
