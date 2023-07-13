import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Select } from 'shared/ui/Select/Select';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  onChange?: (value: Currency) => void;
  readOnly?: boolean;
  value?: Currency;
}

/* Если 'options' определить в 'JSX' разметке, то при изменении 'CurrencySelect', дочерний 'Select'
   будет перендериваться каждый раз, т.к. ссылка на массив каждый раз будет создаваться новая:
   '<Select options={[{ content: '', value: '' }, ...]} />'

   Чтобы избежать лишних перерендеров, можно:
   - обернуть 'options' в 'useMemo'
   - вынести 'options' вне компонента (т.к. 'options' статичны и не будут изменяться)
*/

const options = [
  { content: Currency.USD, value: Currency.USD },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.RUB, value: Currency.RUB },
];

export const CurrencySelect = memo(({
  className,
  onChange,
  readOnly,
  value,
}: CurrencySelectProps) => {
  const { t } = useTranslation('profile');

  const onChangeHandler = useCallback((currencyValue: string) => {
    onChange?.(currencyValue as Currency);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      onChange={onChangeHandler}
      options={options}
      readOnly={readOnly}
      value={value}
    />
  );
});

CurrencySelect.displayName = 'CurrencySelect';
