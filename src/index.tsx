import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/app/providers/ForceUpdate';
import { StoreProvider } from '@/app/providers/StoreProvider';
// import { ThemeProvider } from '@/app/providers/ThemeProvider';

import App from '@/app/App';

// import i18n from '@/shared/config/i18n/i18n' - возможна ошибка 'i18n.changeLanguage is not a function'
import '@/shared/config/i18n/i18n';

import './app/styles/index.scss';

/*
  Ошибка 'Uncaught Error: useNavigate() may be used only in the context of a <Router> component.',
  если 'StoreProvider' находится в дереве выше чем 'BrowserRouter' и попытаться использовать навигацию в
  'async thunks'
*/

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать React приложение');
}

/*
  Ошибка при деструктуризации: 'const { render } = createRoot(container);'
  'Uncaught TypeError: Cannot read properties of undefined (reading '_internalRoot')'
*/

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          {/*
            можно использовать 'ThemeProvider':
              <ThemeProvider>
                <App />
              </ThemeProvider>,

            или же 'HOC' 'withTheme' в 'App.tsx'
          */}

          <App />
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
