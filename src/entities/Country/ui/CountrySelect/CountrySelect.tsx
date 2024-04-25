import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import type { DropdownDirection, ListBoxItem } from '@/shared/types/ui';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';

import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Направление местоположения
   */
  direction?: DropdownDirection;

  /**
   * Обработчик изменения значения страны
   */
  onChange?: (value: Country) => void;

  /**
   * Только для чтения
   */
  readOnly?: boolean;

  /**
   * Текущее значение страны
   */
  value?: Country;
}

const options: ListBoxItem[] = [
  { content: Country.USA, value: Country.USA },
  { content: Country.Russia, value: Country.Russia },
  { content: Country.Belarus, value: Country.Belarus },
  { content: Country.Ukraine, value: Country.Ukraine },
  { content: Country.Armenia, value: Country.Armenia },
];

export const CountrySelect = memo(
  ({ className, direction = 'bottom-left', onChange, readOnly, value }: CountrySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (countryValue: string) => {
        // 'onChange?.()' => функция не будет вызвана, если не будет передана
        onChange?.(countryValue as Country);
      },
      [onChange],
    );

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <ListBoxRedesigned
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите страну')}
            direction={direction}
            items={options}
            label={t('Укажите страну')}
            onChange={onChangeHandler}
            readonly={readOnly}
            stack='horizontal'
            value={value}
          />
        }
        off={
          <ListBoxDeprecated
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите страну')}
            direction={direction}
            items={options}
            label={t('Укажите страну')}
            onChange={onChangeHandler}
            readonly={readOnly}
            value={value}
          />
        }
      />
    );
  },
);

CountrySelect.displayName = 'CountrySelect';
