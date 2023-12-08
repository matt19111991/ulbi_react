import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  ArticleBlock,
  ArticleBlockComponentMemoized,
  ArticleBlockType,
  ArticleCodeBlockComponent,
  ArticleFormBlock,
  ArticleImageBlockComponent,
  ArticleTextBlockComponent,
  ArticleType,
} from '@/entities/Article';

import { getRouteArticles } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

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
  getCreateArticleFormError,
  getCreateArticleFormIsLoading,
} from '../../model/selectors/createArticleFormSelectors';

import { createArticle } from '../../model/services/createArticle/createArticle';

import {
  createArticleFormActions,
  createArticleFormReducer,
} from '../../model/slice/createArticleFormSlice';

import { CreateArticleForm } from '../../model/types/createArticleFormSchema';

import classes from './ArticleCreateForm.module.scss';

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

  const [inputs, setInputs] = useState<Omit<CreateArticleForm, 'blocks' | 'type'>>({
    img: '',
    subtitle: '',
    title: '',
  });

  const [selectedBlock, setSelectedBlock] = useState('');

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
    [dispatch, error],
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
    setSelectedBlock((prev) => (prev === value ? '' : (value as ArticleBlockType)));
  }, []);

  /**
   * Обработчик для добавления блока
   */
  const onAddBlock = useCallback((newBlockData: ArticleBlock) => {
    setBlocks((prev) => [...prev, { ...newBlockData, id: `${prev.length + 1}` }]);

    setSelectedBlock('');
  }, []);

  /**
   * Обработчик для удаления блока
   */
  const onRemoveBlock = useCallback(
    (id: string) => () => {
      setBlocks((prev) => prev.filter((block) => block.id !== id));
    },
    [],
  );

  /**
   * Обработчик для создания статьи
   */
  const onCreateArticle = useCallback(async () => {
    const form = {
      ...inputs,
      blocks,
      type: [type],
    };

    const response = await dispatch(createArticle(form));

    if (response.meta.requestStatus === 'fulfilled') {
      navigate(getRouteArticles());
    }
  }, [blocks, dispatch, inputs, navigate, type]);

  /**
   * Функция для отрисовки блоков
   */
  const renderBlocks = () =>
    blocks.map((block) => {
      let BlockComponent = ArticleTextBlockComponent as ArticleBlockComponentMemoized;

      switch (block.type) {
        case ArticleBlockType.CODE:
          BlockComponent = ArticleCodeBlockComponent as ArticleBlockComponentMemoized;
          break;

        case ArticleBlockType.IMAGE:
          BlockComponent = ArticleImageBlockComponent as ArticleBlockComponentMemoized;
          break;

        case ArticleBlockType.TEXT:
          BlockComponent = ArticleTextBlockComponent as ArticleBlockComponentMemoized;
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
            className={classes.input}
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
            className={classes.input}
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
            className={classes.input}
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
            tabs={types}
            value={type}
          />

          {renderBlocks()}

          <Text text={t('Добавить блок')} />

          <Tabs
            className={classes.addBlockTypes}
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
            data-testid='CreateArticleForm.Button'
            disabled={!inputs.title.length}
            onClick={onCreateArticle}
            variant='outline'
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleCreateForm);
