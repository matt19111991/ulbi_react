import { memo, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router';
import type { To } from 'react-router';
import { useTranslation } from 'react-i18next';

import { getRouteOutlet, getRouteOutletFirst, getRouteOutletLast } from '@/shared/const/router';

import { getFeatureFlag } from '@/shared/lib/features';

import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';

import { AppLink as AppLinkRedesigned } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { Page } from '@/widgets/Page';

import classes from './OutletPage.module.scss';

/*
  компонент '<OutletPage />' отрисуется сам по '/outlet' урлу и отрисует один из дочерних
  компонентов по вложенному урлу:
    - '<OutletFirst />' => по урлу '/outlet/first'
    - '<OutletLast />'  => по урлу '/outlet/last'
    - 'null'            => ничего не будет отрисовано по всем неуказанным вложенным урлам
*/
export const OutletPage = memo(() => {
  const { t } = useTranslation();

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const renderLink = useCallback(
    (to: To, text: string): JSX.Element =>
      isAppRedesigned ? (
        <AppLinkRedesigned activeClassName={classes.active} className={classes.link} to={to}>
          {text}
        </AppLinkRedesigned>
      ) : (
        <AppLinkDeprecated className={classes.link} to={to}>
          {text}
        </AppLinkDeprecated>
      ),
    [isAppRedesigned],
  );

  const links = useMemo<JSX.Element>(
    () => (
      <>
        {renderLink(getRouteOutlet(), t('Аутлет главная'))}
        {renderLink(getRouteOutletFirst(), t('Первый компонент'))}
        {renderLink(getRouteOutletLast(), t('Последний компонент'))}
      </>
    ),
    [renderLink, t],
  );

  return (
    <Page className={classes.OutletPage} data-testid='OutletPage'>
      <VStack align='start' gap='8'>
        {t('Аутлет страница')}

        <HStack className={classes.links} gap='16'>
          {links}
        </HStack>

        <Outlet />
      </VStack>
    </Page>
  );
});

OutletPage.displayName = 'OutletPage';
