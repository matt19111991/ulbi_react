import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import type {
  ArticleBlock,
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
} from '../../model/types/article';

import classes from './ArticleFormBlock.module.scss';

export interface CommonForm {
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

  const [blockData, setBlockData] = useState<CommonForm>({
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
    setParagraphs((prev) => [...prev.slice(0, prev.length - 1), value]);
  }, []);

  /**
   * Обработчик для удаления параграфа
   */
  const onRemoveParagraph = useCallback(
    (text: string) => () => {
      setParagraphs((prev) => prev.filter((paragraph) => paragraph !== text));
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
    const codeBlock: Partial<ArticleCodeBlock> = {};
    const imageBlock: Partial<ArticleImageBlock> = {};
    const textBlock: Partial<ArticleTextBlock> = {};

    switch (type) {
      case ArticleBlockType.CODE:
        codeBlock.code = blockData.text;
        codeBlock.type = type;
        onSubmit(codeBlock as ArticleCodeBlock);
        break;

      case ArticleBlockType.IMAGE:
        imageBlock.src = blockData.text;
        imageBlock.title = blockData.title;
        imageBlock.type = type;
        onSubmit(imageBlock as ArticleImageBlock);
        break;

      case ArticleBlockType.TEXT:
        textBlock.paragraphs = paragraphs;
        textBlock.title = blockData.title;
        textBlock.type = type;
        onSubmit(textBlock as ArticleTextBlock);
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
            className={classes.input}
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
            className={classes.input}
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
            className={classes.input}
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
            className={classes.input}
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
            <HStack className={classes.paragraph} key={idx} justify='between' max>
              <AppLink
                className={classes.removeParagraphIcon}
                onClick={onRemoveParagraph(paragraph)}
                to=''
              >
                <Text text='x' variant='error' />
              </AppLink>

              <TextArea
                className={classes.input}
                data-testid='ArticleFormBlock.Paragraph'
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
