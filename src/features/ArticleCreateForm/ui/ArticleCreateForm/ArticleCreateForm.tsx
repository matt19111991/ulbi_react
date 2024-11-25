import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  ArticleBlockPicker,
  ArticleBlockType,
  ArticleFormBlock,
  ArticleType,
} from '@/entities/Article';

import type { Article, ArticleBlock } from '@/entities/Article';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoaderV2 } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';

import type { TabItem } from '@/shared/types/ui';

import {
  getCreateArticleFormError,
  getCreateArticleFormIsLoading,
} from '../../model/selectors/createArticleFormSelectors';

import { createArticle } from '../../model/services/createArticle/createArticle';

import {
  createArticleFormActions,
  createArticleFormReducer,
} from '../../model/slice/createArticleFormSlice';

import type { CreateArticleForm } from '../../model/types/createArticleFormSchema';

import classes from './ArticleCreateForm.module.scss';

type Inputs = Pick<CreateArticleForm, 'img' | 'subtitle' | 'title'>;

export interface ArticleCreateFormProps {
  /**
   * Внешний класс
   */
  className?: string;
}

const reducers: ReducersList = {
  createArticleForm: createArticleFormReducer,
};

const ArticleCreateForm = ({ className }: ArticleCreateFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const error = useSelector(getCreateArticleFormError);
  const isLoading = useSelector(getCreateArticleFormIsLoading);

  const blockTabs = useMemo<TabItem[]>(
    () => [
      { content: t('Код'), value: ArticleBlockType.CODE },
      { content: t('Изображение'), value: ArticleBlockType.IMAGE },
      { content: t('Текст'), value: ArticleBlockType.TEXT },
    ],
    [t],
  );

  const typeTabs = useMemo<TabItem[]>(
    () => [
      { content: t('Айти'), value: ArticleType.IT },
      { content: t('Наука'), value: ArticleType.SCIENCE },
      { content: t('Экономика'), value: ArticleType.ECONOMICS },
    ],
    [t],
  );

  const [inputs, setInputs] = useState<Inputs>({
    img: '',
    subtitle: '',
    title: '',
  });

  const [selectedBlock, setSelectedBlock] = useState<ArticleBlockType | string>('');

  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

  const [type, setType] = useState(ArticleType.IT);

  /**
   * Обработчик для изменения основных полей формы статьи
   */
  const onArticleInputsChange = useCallback(
    (value: string, name: string) => {
      if (error?.length) {
        dispatch(createArticleFormActions.clearError());
      }

      setInputs((prev) => ({ ...prev, [name]: value }));
    },
    [dispatch, error?.length],
  );

  /**
   * Обработчик для изменения типа статьи
   */
  const onArticleTypeChange = useCallback(({ value }: TabItem) => {
    setType(value as ArticleType);
  }, []);

  /**
   * Обработчик для добавления (выбора) блока
   */
  const onArticleBlockClick = useCallback(({ value }: TabItem) => {
    setSelectedBlock((prev) => (prev === value ? '' : value));
  }, []);

  /**
   * Обработчик для добавления блока
   */
  const onAddBlock = useCallback(
    (newBlock: ArticleBlock) => {
      const newBlocks = [...blocks, newBlock];

      setBlocks(() => newBlocks.map((block, idx) => ({ ...block, id: `${idx + 1}` })));

      setSelectedBlock('');
    },
    [blocks],
  );

  /**
   * Обработчик для удаления блока
   */
  const onRemoveBlock = useCallback(
    (id: string) => () => {
      setBlocks((prev) =>
        prev
          .filter((block) => block.id !== id)
          .map((block, idx) => ({ ...block, id: `${idx + 1}` })),
      );
    },
    [],
  );

  /**
   * Обработчик для создания статьи
   */
  const onCreateArticle = useCallback(async () => {
    const form: CreateArticleForm = {
      blocks,
      ...inputs,
      type: [type],
    };

    const response = await dispatch(createArticle(form));

    if (response.meta.requestStatus === 'fulfilled') {
      const { id } = response.payload as Article;

      navigate(getRouteArticleDetails(id));
    }
  }, [blocks, dispatch, inputs, navigate, type]);

  /**
   * Функция для отрисовки блоков
   */
  const renderBlocks = () =>
    blocks.map((block) => {
      const articleBlockClass =
        block.type === ArticleBlockType.CODE
          ? `${classes.block} ${classes.codeBlock}`
          : classes.block;

      return (
        <HStack className={classes.blockContainer} key={block.id} max>
          <ArticleBlockPicker block={block} className={articleBlockClass} />

          <AppLink className={classes.removeBlockIcon} onClick={onRemoveBlock(block.id)} to=''>
            <Text text='x' variant='error' />
          </AppLink>
        </HStack>
      );
    });

  return (
    <DynamicModuleLoaderV2 reducers={reducers} removeAfterUnmount>
      <Card
        border='partial'
        className={classNames(classes.ArticleCreateForm, { [classes.loading]: isLoading }, [
          className,
        ])}
        data-testid='CreateArticleForm'
        max
        padding='24'
      >
        <VStack align='start' className={classes.formContainer} gap='16'>
          <Text
            className={classNames('', { [classes.errorIndents]: !error?.length })}
            title={t('Создание новой статьи')}
          />

          {error?.length ? (
            <Text
              data-testid='CreateArticleForm.Error'
              text={t('Заполните полностью форму')}
              variant='error'
            />
          ) : null}

          <Input
            data-testid='CreateArticleForm.Input.Title'
            fullWidth
            label={t('Название статьи')}
            name='title'
            onChange={onArticleInputsChange}
            placeholder={t('Введите название статьи')}
            value={inputs.title}
            verticalLabel
          />

          <TextArea
            data-testid='CreateArticleForm.Input.Subtitle'
            fullWidth
            label={t('Подзаголовок статьи')}
            name='subtitle'
            onChange={onArticleInputsChange}
            placeholder={t('Введите подзаголовок статьи')}
            value={inputs.subtitle}
            verticalLabel
          />

          <Input
            data-testid='CreateArticleForm.Input.Image'
            fullWidth
            label={t('Изображение для статьи')}
            name='img'
            onChange={onArticleInputsChange}
            placeholder={t('Укажите ссылку на изображение для статьи')}
            value={inputs.img}
            verticalLabel
          />

          <Text text={t('Тип статьи')} />

          <Tabs
            className={classes.articleTypes}
            direction='row'
            onTabClick={onArticleTypeChange}
            tabs={typeTabs}
            value={type}
          />

          {renderBlocks()}

          <Text text={t('Добавить блок')} />

          <Tabs
            className={classes.blockTypes}
            direction='row'
            onTabClick={onArticleBlockClick}
            tabs={blockTabs}
            value={selectedBlock}
          />

          {selectedBlock.length ? (
            <ArticleFormBlock onSubmit={onAddBlock} type={selectedBlock as ArticleBlockType} />
          ) : null}
        </VStack>

        <HStack className={classes.sendContainer} justify='end'>
          <Button
            data-testid='CreateArticleForm.Button'
            disabled={!inputs.title.length}
            onClick={onCreateArticle}
            variant='outline'
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoaderV2>
  );
};

export default memo(ArticleCreateForm);
