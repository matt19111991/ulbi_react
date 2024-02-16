import { Component, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { PageError } from '@/widgets/PageError';

interface ErrorBoundaryProps {
  /**
   * Содержимое предохранителя
   */
  children: ReactNode;
}

interface ErrorBoundaryState {
  /**
   * Наличие ошибки
   */
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // обновляем 'state' и следующий рендер покажет резервный 'UI' c ошибкой

    // eslint-disable-next-line no-console
    console.log(`--- getDerivedStateFromError error: ${error} ---`);

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // можно отправить информацию об ошибках на сервис для логирования

    // eslint-disable-next-line no-console
    console.log('--- The error has been sent to log service');
    // eslint-disable-next-line no-console
    console.log('error', error);
    // eslint-disable-next-line no-console
    console.log('errorInfo', errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    // резервный 'UI' ошибки
    if (hasError) {
      // '<Suspense />' для переводов
      return (
        <Suspense fallback=''>
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
