import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const UseSyncExternalStore = () => {
  const { t } = useTranslation();

  return (
    <VStack align='start'>
      <Text
        text={t(
          "По возможности мы рекомендуем использовать встроенное состояние 'React' с 'useState' и 'useReducer'. 'API useSyncExternalStore' в основном полезен, если вам нужно интегрироваться с существующим не-'React'-кодом",
        )}
      />
    </VStack>
  );
};
