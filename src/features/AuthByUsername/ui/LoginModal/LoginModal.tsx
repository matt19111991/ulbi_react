import { memo, Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Modal } from '@/shared/ui/redesigned/Modal';

import { LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Состояние модального окна (открыто или закрыто)
   */
  isOpen: boolean;

  /**
   * Колбэк при закрытии модального окна
   */
  onClose: () => void;
}

export const LoginModal = memo(({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal className={classNames('', {}, [className])} isOpen={isOpen} lazy onClose={onClose}>
    <Suspense fallback=''>
      <LoginForm onSuccess={onClose} />
    </Suspense>
  </Modal>
));

LoginModal.displayName = 'LoginModal';
