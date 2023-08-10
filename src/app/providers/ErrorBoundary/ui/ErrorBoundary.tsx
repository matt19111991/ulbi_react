import {
 Component, ErrorInfo, ReactNode, Suspense,
} from 'react';

import { PageError } from '@/widgets/PageError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
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
    // обновляем state и следующий рендер покажет резервный UI ошибки

    // eslint-disable-next-line no-console
    console.log('getDerivedStateFromProps error:', error);

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно отправить информацию об ошибках на сервис для логирования

    // eslint-disable-next-line no-console
    console.log(`---The error has been sent to log service: ${error}, ${errorInfo}---`);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) { // Резервный UI ошибки
      return (
        <Suspense fallback=''> {/* <Suspense /> для переводов */}
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
