import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType } from '../../model/consts/articleConsts';
import type { ArticleBlock } from '../../model/types/article';

import classes from './ArticleFormBlock.module.scss';

interface CommonBlockFields {
  /**
   * Заголовок
   */
  title: string;

  /**
   * Описание
   */
  text: string;
}

export interface ArticleFormBlockProps {
  /**
   * Обработчик для подтверждения создания блока
   */
  onSubmit: (newBlock: ArticleBlock) => void;

  /**
   * Тип блока
   */
  type: ArticleBlockType;
}

export const ArticleFormBlock = memo(({ onSubmit, type }: ArticleFormBlockProps) => {
  const { t } = useTranslation();

  const [blockData, setBlockData] = useState<CommonBlockFields>({
    title: '',
    text: '',
  });

  const [paragraphs, setParagraphs] = useState<string[]>([]);

  /**
   * Обработчик для изменения полей блока
   */
  const onBlockInputsChange = useCallback((value: string, name: string) => {
    setBlockData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Обработчик для создания параграфа
   */
  const onCreateParagraph = useCallback(() => {
    setParagraphs((prev) => [...prev, '']);
  }, []);

  /**
   * Обработчик для изменения полей параграфа
   */
  const onChangeParagraph = useCallback((value: string) => {
    setParagraphs((prev) => [...prev.slice(0, -1), value]);
  }, []);

  /**
   * Обработчик для удаления параграфа
   */
  const onRemoveParagraph = useCallback(
    (text: string) => () => {
      let finishRemove = false;

      setParagraphs((prev) =>
        prev.filter((paragraph) => {
          if (finishRemove) {
            return true;
          }

          if (paragraph === text) {
            finishRemove = true;

            return false;
          }

          return true;
        }),
      );
    },
    [],
  );

  /**
   * Функция для очистки инпутов при создании блока
   */
  const onResetBlock = () => {
    setBlockData({
      title: '',
      text: '',
    });
  };

  /**
   * Обработчик создания блока
   */
  const onCreateBlock = useCallback(() => {
    const id = 'new';

    switch (type) {
      case ArticleBlockType.CODE:
        onSubmit({ code: blockData.text, id, type });
        break;

      case ArticleBlockType.IMAGE:
        onSubmit({ id, src: blockData.text, title: blockData.title, type });
        break;

      case ArticleBlockType.TEXT:
        onSubmit({ id, paragraphs, title: blockData.title, type });
        break;

      default:
        break;
    }

    onResetBlock();
  }, [blockData.text, blockData.title, onSubmit, paragraphs, type]);

  useEffect(() => {
    onResetBlock();
  }, [type]);

  switch (type) {
    case ArticleBlockType.CODE:
      return (
        <VStack align='start' className={classes.ArticleFormBlock} gap='16' max>
          <TextArea
            data-testid='ArticleFormBlock.Text'
            fullWidth
            label={t('Разметка')}
            name='text'
            onChange={onBlockInputsChange}
            placeholder={t('Вставьте HTML')}
            rows={8}
            value={blockData.text}
            verticalLabel
          />

          <Button
            data-testid='ArticleFormBlock.Button'
            disabled={!blockData.text.length}
            onClick={onCreateBlock}
            variant='outline'
          >
            {t('Добавить блок')}
          </Button>
        </VStack>
      );

    case ArticleBlockType.IMAGE:
      return (
        <VStack align='start' className={classes.ArticleFormBlock} gap='16' max>
          <Input
            data-testid='ArticleFormBlock.Title'
            fullWidth
            label={t('Название изображения')}
            name='title'
            onChange={onBlockInputsChange}
            placeholder={t('Введите название изображения')}
            value={blockData.title}
            verticalLabel
          />

          <Input
            data-testid='ArticleFormBlock.Text'
            fullWidth
            label={t('Ссылка на изображение')}
            name='text'
            onChange={onBlockInputsChange}
            placeholder={t('Вставьте ссылку на изображение')}
            value={blockData.text}
            verticalLabel
          />

          <Button
            data-testid='ArticleFormBlock.Button'
            disabled={!blockData.text.length || !blockData.title.length}
            onClick={onCreateBlock}
            variant='outline'
          >
            {t('Добавить блок')}
          </Button>
        </VStack>
      );

    case ArticleBlockType.TEXT:
      return (
        <VStack align='start' className={classes.ArticleFormBlock} gap='16' max>
          <Input
            data-testid='ArticleFormBlock.Title'
            fullWidth
            label={t('Название блока')}
            name='title'
            onChange={onBlockInputsChange}
            placeholder={t('Введите название блока')}
            value={blockData.title}
            verticalLabel
          />

          {paragraphs.map((paragraph, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <HStack className={classes.paragraph} key={idx} max>
              <AppLink
                className={classes.removeParagraphIcon}
                onClick={onRemoveParagraph(paragraph)}
                to=''
              >
                <Text text='x' variant='error' />
              </AppLink>

              <TextArea
                data-testid='ArticleFormBlock.Paragraph'
                disabled={idx < paragraphs.length - 1}
                fullWidth
                label={`${t('Параграф')} ${idx + 1}`}
                onChange={onChangeParagraph}
                placeholder={t('Вставьте текст')}
                value={paragraph}
                verticalLabel
              />
            </HStack>
          ))}

          <AppLink data-testid='ArticleFormBlock.AddParagraph' onClick={onCreateParagraph} to=''>
            <Text text={`+ ${t('Добавить новый параграф')}`} variant='accent' />
          </AppLink>

          <Button
            data-testid='ArticleFormBlock.Button'
            disabled={!blockData.title.length || paragraphs.some((paragraph) => !paragraph.length)}
            onClick={onCreateBlock}
            variant='outline'
          >
            {t('Добавить блок')}
          </Button>
        </VStack>
      );

    default:
      return null;
  }
});

ArticleFormBlock.displayName = 'ArticleFormBlock';
