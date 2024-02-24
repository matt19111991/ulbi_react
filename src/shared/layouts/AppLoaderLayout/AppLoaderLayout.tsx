import { memo } from 'react';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { MainLayout } from '../MainLayout';

import classes from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => (
  <MainLayout
    className={classes.layout}
    content={
      <HStack align='start' className={classes.content} gap='16'>
        <Skeleton border='4px' height={88} width='100%' />
      </HStack>
    }
    header={
      <HStack className={classes.header}>
        <Skeleton border='50%' height={40} width={40} />
      </HStack>
    }
    sidebar={<Skeleton border='32px' className={classes.sidebar} height='100%' width={220} />}
  />
));

AppLoaderLayout.displayName = 'AppLoaderLayout';
