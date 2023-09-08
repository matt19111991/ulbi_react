import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { DropdownDirection } from '@/shared/types/ui';

import { ListBox } from '@/shared/ui/deprecated/Popups';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  direction?: DropdownDirection;
  onChange?: (value: Currency) => void;
  readOnly?: boolean;
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

    return (
      <ListBox
        className={classNames('', {}, [className])}
        defaultValue={t('Укажите валюту')}
        direction={direction}
        items={options}
        label={t('Укажите валюту')}
        onChange={onChangeHandler}
        readonly={readOnly}
        value={value}
      />
    );
  },
);

CurrencySelect.displayName = 'CurrencySelect';
