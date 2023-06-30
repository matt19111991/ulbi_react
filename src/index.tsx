import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';

import App from 'app/App';

/* Ошибка 'i18n.changeLanguage is not a function',
   если импортировать "import i18n from 'shared/config/i18n/i18n";

*/ import 'shared/config/i18n/i18n';

import './app/styles/index.scss';

render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
);
