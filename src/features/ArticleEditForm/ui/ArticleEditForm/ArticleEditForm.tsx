import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  ArticleBlockPicker,
  ArticleBlockType,
  ArticleFormBlock,
  ArticleType,
  fetchArticleById,
} from '@/entities/Article';

import type { Article, ArticleBlock } from '@/entities/Article';

import type { User } from '@/entities/User';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { DynamicModuleLoaderV2 } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { article } from '@/shared/lib/generators/articles';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';

import type { TabItem } from '@/shared/types/ui';

import { getEditArticleFormError } from '../../model/selectors/editArticleFormSelectors';

import { editArticle } from '../../model/services/editArticle/editArticle';

import {
  editArticleFormActions,
  editArticleFormReducer,
} from '../../model/slice/editArticleFormSlice';

import type { EditArticleForm } from '../../model/types/editArticleFormSchema';

import classes from './ArticleEditForm.module.scss';

type Inputs = Pick<EditArticleForm, 'img' | 'subtitle' | 'title'>;

export interface ArticleEditFormProps {
  /**
   * 'ID' статьи
   */
  articleId: string;

  /**
   * Внешний класс
   */
  className?: string;
}

const reducers: ReducersList = {
  editArticleForm: editArticleFormReducer,
};

const ArticleEditForm = ({ articleId, className }: ArticleEditFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const error = useSelector(getEditArticleFormError);

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

  const [loading, setLoading] = useState(true);

  const [selectedBlock, setSelectedBlock] = useState<ArticleBlockType | string>('');

  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

  const [createdAt, setCreatedAt] = useState<Article['createdAt']>('');

  const [type, setType] = useState(ArticleType.IT);

  const [userData, setUserData] = useState<User>({
    id: '',
    username: '',
  });

  const [views, setViews] = useState<Article['views']>(0);

  /**
   * Обработчик для изменения основных полей формы статьи
   */
  const onArticleInputsChange = useCallback(
    (value: string, name: string) => {
      if (error?.length) {
        dispatch(editArticleFormActions.clearError());
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
   * Обработчик для обновления статьи
   */
  const onEditArticle = useCallback(async () => {
    const form: Article = {
      blocks,
      createdAt,
      id: articleId,
      ...inputs,
      type: [type],
      user: userData,
      views,
    };

    const response = await dispatch(editArticle(form));

    if (response.meta.requestStatus === 'fulfilled') {
      navigate(getRouteArticleDetails(articleId));
    }
  }, [articleId, blocks, createdAt, dispatch, inputs, navigate, type, userData, views]);

  useEffect(() => {
    (async () => {
      let response: { payload: Article };

      if (__PROJECT__ === 'storybook') {
        response = { payload: article };
      } else {
        response = (await dispatch(fetchArticleById(articleId))) as { payload: Article };
      }

      if (response && response.payload) {
        const {
          createdAt: articleCreatedAt,
          blocks: articleBlocks,
          img,
          subtitle,
          title,
          type: articleType,
          user,
          views: articleViews,
        } = response.payload;

        setBlocks(articleBlocks);

        setCreatedAt(articleCreatedAt);

        setInputs({ img, subtitle, title });

        setLoading(false);

        setType(articleType[0]);

        setUserData(user);

        setViews(articleViews);
      }
    })();
  }, [articleId, dispatch]);

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
        className={classNames(classes.ArticleEditForm, { [classes.loading]: loading }, [className])}
        data-testid='EditArticleForm'
        max
        padding='24'
      >
        <VStack align='start' className={classes.formContainer} gap='16'>
          <Text
            className={classNames('', { [classes.errorIndents]: !error?.length })}
            title={`${t('Редактирование статьи с ID')} ${articleId}`}
          />

          {error?.length ? (
            <Text
              data-testid='EditArticleForm.Error'
              text={t('Заполните полностью форму')}
              variant='error'
            />
          ) : null}

          {loading ? (
            <>
              <Skeleton height={70} width='100%' />
              <Skeleton height={120} width='100%' />
              <Skeleton height={70} width='100%' />
              <Skeleton height={90} width='100%' />
            </>
          ) : (
            <>
              <Input
                data-testid='EditArticleForm.Input.Title'
                fullWidth
                label={t('Название статьи')}
                name='title'
                onChange={onArticleInputsChange}
                placeholder={t('Введите название статьи')}
                value={inputs.title}
                verticalLabel
              />

              <TextArea
                data-testid='EditArticleForm.Input.Subtitle'
                fullWidth
                label={t('Подзаголовок статьи')}
                name='subtitle'
                onChange={onArticleInputsChange}
                placeholder={t('Введите подзаголовок статьи')}
                value={inputs.subtitle}
                verticalLabel
              />

              <Input
                data-testid='EditArticleForm.Input.Image'
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
            </>
          )}
        </VStack>

        {!loading && (
          <HStack className={classes.sendContainer} justify='end'>
            <Button data-testid='EditArticleForm.Button' onClick={onEditArticle} variant='outline'>
              {t('Отправить')}
            </Button>
          </HStack>
        )}
      </Card>
    </DynamicModuleLoaderV2>
  );
};

export default memo(ArticleEditForm);
