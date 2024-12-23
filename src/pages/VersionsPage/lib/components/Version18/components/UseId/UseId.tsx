import { useId } from 'react';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const UseId = () => {
  const id1 = useId();
  const id2 = useId();

  return (
    <HStack gap='24'>
      <VStack align='start'>
        <Text size='l' text='ID 1' />
        <Text size='m' text={id1} />
      </VStack>

      <VStack align='start'>
        <Text size='l' text='ID 2' />
        <Text size='m' text={id2} />
      </VStack>
    </HStack>
  );
};
