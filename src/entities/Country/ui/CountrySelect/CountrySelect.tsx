import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Select } from 'shared/ui/Select/Select';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
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

export const CountrySelect = memo(({
  className,
  onChange,
  readOnly,
  value,
}: CountrySelectProps) => {
  const { t } = useTranslation('profile');

  const onChangeHandler = useCallback((countryValue: string) => {
    onChange?.(countryValue as Country);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      onChange={onChangeHandler}
      options={options}
      readOnly={readOnly}
      value={value}
    />
  );
});

CountrySelect.displayName = 'CountrySelect';
