import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { DropdownDirection } from '@/shared/types/ui';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';

import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Направление местоположения
   */
  direction?: DropdownDirection;

  /**
   * Обработчик изменения значения валюты
   */
  onChange?: (value: Currency) => void;

  /**
   * Только для чтения
   */
  readOnly?: boolean;

  /**
   * Текущее значение валюты
   */
  value?: Currency;
}

/*
  Если 'options' определить в 'JSX' разметке, то при изменении 'CurrencySelect', дочерний 'ListBox'
  будет перендериваться каждый раз, т.к. ссылка на массив каждый раз будет создаваться новая:
  '<ListBox items={[{ content: '', value: '' }, ...]} />'

  Чтобы избежать лишних перерендеров, можно:
    - обернуть 'options' в 'useMemo'
    - вынести 'options' вне компонента (т.к. 'options' статичны и не будут изменяться)
*/

const options = [
  { content: Currency.USD, value: Currency.USD },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.RUB, value: Currency.RUB },
];

export const CurrencySelect = memo(
  ({ className, direction = 'bottom-left', onChange, readOnly, value }: CurrencySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (currencyValue: string) => {
        onChange?.(currencyValue as Currency);
      },
      [onChange],
    );

    const props = {
      className: classNames('', {}, [className]),
      defaultValue: t('Укажите валюту'),
      direction,
      items: options,
      label: t('Укажите валюту'),
      onChange: onChangeHandler,
      readonly: readOnly,
      stack: 'horizontal' as const,
      value,
    };

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />
    );
  },
);

CurrencySelect.displayName = 'CurrencySelect';
