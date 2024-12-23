import { useOptimistic, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './UseOptimistic.module.scss';

interface FormValues {
  message: string;
}

interface Message {
  id: number | string;
  pending: boolean;
  text: string;
}

const sendMessage = async (message: FormValues['message']) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 2000);
  });

export const UseOptimistic = () => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prevMessages, newMessageText: FormValues['message']) => [
      ...prevMessages,
      {
        id: 'pending',
        pending: true,
        text: newMessageText,
      },
    ],
  );

  const formAction = async (formData: FormData) => {
    const formDataMessage = formData.get('message') as FormValues['message'];

    if (formDataMessage.length) {
      addOptimisticMessage(formDataMessage);

      const message = (await sendMessage(formDataMessage)) as FormValues['message'];

      const newMessage: Message = {
        id: Date.now(),
        pending: false,
        text: message,
      };

      setMessages((prev) => [...prev, newMessage]);

      formRef.current?.reset();
    }
  };

  return (
    <form action={formAction} ref={formRef}>
      <VStack align='start' gap='24'>
        <Input name='message' />

        <Button type='submit'>{t('Подтвердить')}</Button>

        <ul>
          {optimisticMessages.map((message) => (
            <li key={message.id}>
              <HStack align='center' gap='8'>
                {message.id === 'pending' ? null : <Text text={`ID ${message.id}: `} />}

                <Text text={`'${message.text}'`} />

                {message.pending ? (
                  <Text className={classes.adding} size='s' text={t('Добавление')} />
                ) : null}
              </HStack>
            </li>
          ))}
        </ul>
      </VStack>
    </form>
  );
};
