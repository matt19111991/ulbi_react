import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Text } from '@/shared/ui/Text/Text';

import classes from './RatingCard.module.scss';

interface RatingCardProps {
  className?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onAccept?: (starsCount: number, feedback?: string) => void;
  onCancel?: (starsCount: number) => void;
  rate?: number; // существующая оценка пользователя
  storybookMobile?: boolean;
  title?: string;
}

export const RatingCard = memo(({
  className,
  feedbackTitle,
  hasFeedback,
  onAccept,
  onCancel,
  rate = 0,
  storybookMobile,
  title,
}: RatingCardProps) => {
  const { t } = useTranslation();

  const [feedback, setFeedback] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount);

    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);

    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);

    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />

      <Input
        onChange={setFeedback}
        placeholder={t('Ваш отзыв')}
        value={feedback}
      />
    </>
  );

  const browserContent = (
    <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
      <VStack align='start' gap='32' max>
        {modalContent}

        <HStack gap='16' justify='end' max>
          <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
            {t('Закрыть')}
          </Button>

          <Button onClick={acceptHandler}>
            {t('Отправить')}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );

  const mobileContent = (
    <Drawer
      className={classes.mobile}
      isOpen={isModalOpen}
      lazy
      onClose={cancelHandler}
    >
      <VStack align='start' gap='32' max>
        {modalContent}

        <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
          {t('Отправить')}
        </Button>
      </VStack>
    </Drawer>
  );

  if (storybookMobile) {
    return (
      <Card
        className={classNames('', {}, [className])}
        max
      >
        <VStack align='center' gap='8' max>
          <Text title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

          <StarRating
            onSelect={onSelectStars}
            selectedStars={starsCount}
            size={40}
          />

          {mobileContent}
        </VStack>
      </Card>
    );
  }

  return (
    <Card
      className={classNames('', {}, [className])}
      max
    >
      <VStack align='center' gap='8' max>
        <Text title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

        <StarRating
          onSelect={onSelectStars}
          selectedStars={starsCount}
          size={40}
        />

        <BrowserView>{browserContent}</BrowserView>

        <MobileView>{mobileContent}</MobileView>
      </VStack>
    </Card>
  );
});

RatingCard.displayName = 'RatingCard';
