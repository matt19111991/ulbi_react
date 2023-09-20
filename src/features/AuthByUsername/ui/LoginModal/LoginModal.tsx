import { memo, Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '@/shared/ui/deprecated/Loader';

import { Modal } from '@/shared/ui/redesigned/Modal';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = memo(({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal className={classNames('', {}, [className])} isOpen={isOpen} lazy onClose={onClose}>
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
));

LoginModal.displayName = 'LoginModal';
