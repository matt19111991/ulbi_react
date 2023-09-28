import { memo, MemoExoticComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Article,
  ArticleBlock,
  ArticleBlockType,
  ArticleCodeBlockComponent,
  ArticleFormBlock,
  ArticleImageBlockComponent,
  ArticleTextBlockComponent,
  ArticleType,
  fetchArticleById,
} from '@/entities/Article';

import { User } from '@/entities/User';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { article } from '@/shared/lib/generators/articles';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';

import { TabItem } from '@/shared/types/ui';

import {
  getEditArticleFormError,
  getEditArticleFormIsLoading,
} from '../../model/selectors/editArticleFormSelectors';

import { editArticle } from '../../model/services/editArticle/editArticle';

import {
  editArticleFormActions,
  editArticleFormReducer,
} from '../../model/slice/editArticleFormSlice';

import { EditArticleForm } from '../../model/types/editArticleFormSchema';

import classes from './ArticleEditForm.module.scss';

export interface ArticleEditFormProps {
  articleId: string;
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
  const isLoading = useSelector(getEditArticleFormIsLoading);

  const blockButtons = useMemo<TabItem[]>(
    () => [
      { content: t('Код'), value: ArticleBlockType.CODE },
      { content: t('Изображение'), value: ArticleBlockType.IMAGE },
      { content: t('Текст'), value: ArticleBlockType.TEXT },
    ],
    [t],
  );

  const types = useMemo<TabItem[]>(
    () => [
      { content: t('Айти'), value: ArticleType.IT },
      { content: t('Наука'), value: ArticleType.SCIENCE },
      { content: t('Экономика'), value: ArticleType.ECONOMICS },
    ],
    [t],
  );

  const [inputs, setInputs] = useState<Omit<EditArticleForm, 'blocks' | 'type'>>({
    img: '',
    subtitle: '',
    title: '',
  });

  const [loading, setLoading] = useState(true);

  const [selectedBlock, setSelectedBlock] = useState('');

  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

  const [createdAt, setCreatedAt] = useState('');

  const [type, setType] = useState(ArticleType.IT);

  const [userData, setUserData] = useState<User>({
    id: '',
    username: '',
  });

  const [views, setViews] = useState(0);

  const onArticleInputsChange = useCallback(
    (value: string, name: string) => {
      if (error?.length) {
        dispatch(editArticleFormActions.clearError());
      }

      setInputs((prev) => ({ ...prev, [name]: value }));
    },
    [dispatch, error],
  );

  const onArticleTypeChange = useCallback(({ value }: TabItem) => {
    setType(value as ArticleType);
  }, []);

  const onArticleBlockClick = useCallback(({ value }: TabItem) => {
    setSelectedBlock((prev) => (prev === value ? '' : (value as ArticleBlockType)));
  }, []);

  const onAddBlock = useCallback((newBlockData: ArticleBlock) => {
    setBlocks((prev) => [...prev, { ...newBlockData, id: `${prev.length + 1}` }]);

    setSelectedBlock('');
  }, []);

  const onRemoveBlock = useCallback(
    (id: string) => () => {
      setBlocks((prev) => prev.filter((block) => block.id !== id));
    },
    [],
  );

  const onEditArticle = useCallback(async () => {
    const form = {
      ...inputs,
      blocks,
      createdAt,
      id: articleId,
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
    const setInitialArticleData = async () => {
      let response;

      if (__PROJECT__ === 'storybook') {
        response = {
          payload: article,
        };
      } else {
        response = await dispatch(fetchArticleById(articleId));
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
        } = response.payload as Article;

        setBlocks(articleBlocks);

        setCreatedAt(articleCreatedAt);

        setInputs({ img, subtitle, title });

        setLoading(false);

        setType(articleType[0]);

        setUserData(user);

        setViews(articleViews);
      }
    };

    setInitialArticleData();
  }, [articleId, dispatch]);

  const renderBlocks = () =>
    blocks.map((block) => {
      let BlockComponent: MemoExoticComponent<any> = ArticleTextBlockComponent;

      switch (block.type) {
        case ArticleBlockType.CODE:
          BlockComponent = ArticleCodeBlockComponent;
          break;

        case ArticleBlockType.IMAGE:
          BlockComponent = ArticleImageBlockComponent;
          break;

        case ArticleBlockType.TEXT:
          BlockComponent = ArticleTextBlockComponent;
          break;

        default:
          break;
      }

      return (
        <HStack className={classes.blockContainer} key={block.id} max>
          <BlockComponent block={block} className={classes.block} />

          <AppLink className={classes.removeBlockIcon} onClick={onRemoveBlock(block.id)} to=''>
            <Text text='x' variant='error' />
          </AppLink>
        </HStack>
      );
    });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Card
        border='partial'
        className={classNames('', { [classes.loading]: isLoading }, [className])}
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

          <Input
            className={classes.input}
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
            className={classes.input}
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
            className={classes.input}
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
            className={classes.types}
            direction='row'
            onTabClick={onArticleTypeChange}
            tabs={types}
            value={type}
          />

          {renderBlocks()}

          <Text text={t('Добавить блок')} />

          <Tabs
            direction='row'
            onTabClick={onArticleBlockClick}
            tabs={blockButtons}
            value={selectedBlock}
          />

          {selectedBlock && (
            <ArticleFormBlock onSubmit={onAddBlock} type={selectedBlock as ArticleBlockType} />
          )}
        </VStack>

        <HStack className={classes.sendContainer} justify='end' max>
          <Button
            data-testid='EditArticleForm.Button'
            disabled={!inputs.title.length || loading}
            onClick={onEditArticle}
            variant='outline'
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleEditForm);
