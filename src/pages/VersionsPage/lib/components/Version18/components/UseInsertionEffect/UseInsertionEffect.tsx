import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const UseInsertionEffect = () => {
  const { t } = useTranslation();

  return (
    <VStack align='start'>
      <Text
        text={t(
          "Хук предназначен для авторов библиотек 'CSS-in-JS'. Если вы не работаете над такой, вам вероятно понадобится 'useEffect' или 'useLayoutEffect'. 'useInsertionEffect' позволяет добавлять элементы в 'DOM' до срабатывания эффектов, вызванных 'useLayoutEffect' и 'useEffect'",
        )}
      />
    </VStack>
  );
};
