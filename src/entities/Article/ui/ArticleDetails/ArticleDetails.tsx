import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

interface ArticleDetailsProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className }: ArticleDetailsProps) => (
  <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <div className={classNames('', {}, [className])}>
      ArticleDetails
    </div>
  </DynamicModuleLoader>
));

ArticleDetails.displayName = 'ArticleDetails';
