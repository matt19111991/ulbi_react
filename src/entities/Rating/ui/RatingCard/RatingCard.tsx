import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input as InputRedesigned } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './RatingCard.module.scss';

interface RatingCardProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Заголовок для фидбэка
   */
  feedbackTitle?: string;

  /**
   * Наличие фидбэка
   */
  hasFeedback?: boolean;

  /**
   * Обработчик для выставления рейтинга
   */
  onAccept?: (starsCount: number, feedback?: string) => void;

  /**
   * Обработчик для отмены выставления рейтинга
   */
  onCancel?: (starsCount: number) => void;

  /**
   * Существующая оценка пользователя
   */
  rate?: number;

  /**
   * Активация мобильного режима для storybook
   */
  storybookMobile?: boolean;

  /**
   * Заголовок
   */
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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack align='start' gap='16' max>
            <TextRedesigned title={feedbackTitle} />

            <InputRedesigned
              data-testid='RatingCard.Input'
              fullWidth
              onChange={setFeedback}
              placeholder={t('Ваш отзыв')}
              value={feedback}
            />
          </VStack>
        }
        off={
          <>
            <TextDeprecated title={feedbackTitle} />

            <InputDeprecated
              className={classes.fullWidth}
              data-testid='RatingCard.Input'
              onChange={setFeedback}
              placeholder={t('Ваш отзыв')}
              value={feedback}
            />
          </>
        }
      />
    );

    const browserContent = (
      <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
        <VStack align='start' gap='32' max>
          {modalContent}

          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <HStack gap='16' justify='end' max>
                <ButtonRedesigned data-testid='RatingCard.Close' onClick={cancelHandler}>
                  {t('Закрыть')}
                </ButtonRedesigned>

                <ButtonRedesigned data-testid='RatingCard.Send' onClick={acceptHandler}>
                  {t('Отправить')}
                </ButtonRedesigned>
              </HStack>
            }
            off={
              <HStack gap='16' justify='end' max>
                <ButtonDeprecated
                  data-testid='RatingCard.Close'
                  onClick={cancelHandler}
                  theme={ButtonTheme.OUTLINE_RED}
                >
                  {t('Закрыть')}
                </ButtonDeprecated>

                <ButtonDeprecated data-testid='RatingCard.Send' onClick={acceptHandler}>
                  {t('Отправить')}
                </ButtonDeprecated>
              </HStack>
            }
          />
        </VStack>
      </Modal>
    );

    const mobileContent = (
      <Drawer className={classes.mobile} isOpen={isModalOpen} onClose={cancelHandler}>
        <VStack align='start' gap='32' max>
          {modalContent}

          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <HStack justify='end' max>
                <ButtonRedesigned data-testid='RatingCard.Send' onClick={acceptHandler} size='m'>
                  {t('Отправить')}
                </ButtonRedesigned>
              </HStack>
            }
            off={
              <ButtonDeprecated
                data-testid='RatingCard.Send'
                fullWidth
                onClick={acceptHandler}
                size={ButtonSize.L}
              >
                {t('Отправить')}
              </ButtonDeprecated>
            }
          />
        </VStack>
      </Drawer>
    );

    if (storybookMobile) {
      return (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <CardRedesigned
              border='partial'
              className={classNames('', {}, [className])}
              max
              padding='24'
            >
              <VStack align='center' gap='8' max>
                <TextRedesigned title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

                <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

                {mobileContent}
              </VStack>
            </CardRedesigned>
          }
          off={
            <CardDeprecated className={classNames('', {}, [className])} max>
              <VStack align='center' gap='8' max>
                <TextDeprecated title={starsCount ? `${t('Спасибо за оценку')}!` : title} />

                <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

                {mobileContent}
              </VStack>
            </CardDeprecated>
          }
        />
      );
    }

    const content = (
      <VStack align='center' gap='8' max>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<TextRedesigned title={starsCount ? `${t('Спасибо за оценку')}!` : title} />}
          off={<TextDeprecated title={starsCount ? `${t('Спасибо за оценку')}!` : title} />}
        />

        <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

        <BrowserView>{browserContent}</BrowserView>

        <MobileView>{mobileContent}</MobileView>
      </VStack>
    );

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <CardRedesigned
            border='partial'
            className={classNames('', {}, [className])}
            data-testid='RatingCard'
            max
            padding='24'
          >
            {content}
          </CardRedesigned>
        }
        off={
          <CardDeprecated className={classNames('', {}, [className])} data-testid='RatingCard' max>
            {content}
          </CardDeprecated>
        }
      />
    );
  },
);

RatingCard.displayName = 'RatingCard';
