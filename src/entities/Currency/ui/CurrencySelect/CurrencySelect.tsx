import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import type { DropdownDirection, ListBoxItem } from '@/shared/types/ui';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';

import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';

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
  если 'options' определить в 'JSX' разметке, то при изменении 'CurrencySelect', дочерний 'ListBox'
  будет перендериваться каждый раз, т.к. ссылка на массив каждый раз будет создаваться новая:
 '<ListBox items={[{ content: '', value: '' }, ...]} />'

  чтобы избежать лишних перерендеров, можно:
    - обернуть 'options' в 'useMemo()'
    - вынести 'options' вне компонента (т.к. 'options' статичны и не будут изменяться)
*/
const options: ListBoxItem[] = [
  { content: Currency.USD, value: Currency.USD },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.RUB, value: Currency.RUB },
];

export const CurrencySelect = memo(
  ({ className, direction = 'bottom-left', onChange, readOnly, value }: CurrencySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (currencyValue: string) => {
        // 'onChange?.()' => функция не будет вызвана, если не будет передана
        onChange?.(currencyValue as Currency);
      },
      [onChange],
    );

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <ListBoxRedesigned
            className={classNames('', {}, [className])}
            defaultValue={options[0].value}
            direction={direction}
            items={options}
            label={t('Укажите валюту')}
            onChange={onChangeHandler}
            readonly={readOnly}
            stack='horizontal'
            value={value}
          />
        }
        off={
          <ListBoxDeprecated
            className={classNames('', {}, [className])}
            defaultValue={options[0].value}
            direction={direction}
            items={options}
            label={t('Укажите валюту')}
            onChange={onChangeHandler}
            readonly={readOnly}
            value={value}
          />
        }
      />
    );
  },
);

CurrencySelect.displayName = 'CurrencySelect';
