import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const MessageContext = createContext({ message: 'по умолчанию' });

interface Props {
  title: string;
}

export const ChildComponent = ({ title }: Props) => {
  const { message } = useContext(MessageContext);

  return (
    <HStack gap='24'>
      <VStack align='start'>
        <Text size='l' text={title} />
        <Text size='m' text={message} />
      </VStack>
    </HStack>
  );
};

export const Context = () => {
  const { t } = useTranslation();

  return (
    <VStack align='start' gap='24'>
      <ChildComponent title={t('Без контекста')} />

      {/* устарело */}
      <MessageContext.Provider value={{ message: 'с провайдером' }}>
        <ChildComponent title={'<Context.Provider />'} />
      </MessageContext.Provider>

      {/* 'React v.19' */}
      <MessageContext value={{ message: 'без провайдера' }}>
        <ChildComponent title={'<Context />'} />
      </MessageContext>
    </VStack>
  );
};
