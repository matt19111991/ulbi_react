import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { DropdownDirection } from '@/shared/types/ui';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';

import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  direction?: DropdownDirection;
  onChange?: (value: Country) => void;
  readOnly?: boolean;
  value?: Country;
}

const options = [
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
        onChange?.(countryValue as Country);
      },
      [onChange],
    );

    const props = {
      className: classNames('', {}, [className]),
      defaultValue: t('Укажите страну'),
      direction,
      items: options,
      label: t('Укажите страну'),
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

CountrySelect.displayName = 'CountrySelect';
