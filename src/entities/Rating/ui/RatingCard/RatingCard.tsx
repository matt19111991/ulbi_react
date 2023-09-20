import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text } from '@/shared/ui/deprecated/Text';

import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

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

export const RatingCard = memo(
  ({
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

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);

        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
      setIsModalOpen(false);

      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
      setIsModalOpen(false);

      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    useEffect(() => {
      setStarsCount(rate);
    }, [rate]);

    const modalContent = (
      <>
        <Text title={feedbackTitle} />

        <Input
          data-testid='RatingCard.Input'
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
            <Button
              data-testid='RatingCard.Close'
              onClick={cancelHandler}
              theme={ButtonTheme.OUTLINE_RED}
            >
              {t('Закрыть')}
            </Button>

            <Button data-testid='RatingCard.Send' onClick={acceptHandler}>
              {t('Отправить')}
            </Button>
          </HStack>
        </VStack>
      </Modal>
    );

    const mobileContent = (
      <Drawer className={classes.mobile} isOpen={isModalOpen} lazy onClose={cancelHandler}>
        <VStack align='start' gap='32' max>
          {modalContent}

          <Button
            data-testid='RatingCard.Send'
            fullWidth
            onClick={acceptHandler}
            size={ButtonSize.L}
          >
            {t('Отправить')}
          </Button>
        </VStack>
      </Drawer>
    );

    if (storybookMobile) {
      return (
        <Card className={classNames('', {}, [className])} max>
          <VStack align='center' gap='8' max>
            <Text title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

            <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

            {mobileContent}
          </VStack>
        </Card>
      );
    }

    return (
      <Card className={classNames('', {}, [className])} data-testid='RatingCard' max>
        <VStack align='center' gap='8' max>
          <Text title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

          <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

          <BrowserView>{browserContent}</BrowserView>

          <MobileView>{mobileContent}</MobileView>
        </VStack>
      </Card>
    );
  },
);

RatingCard.displayName = 'RatingCard';
