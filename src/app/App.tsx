import { Suspense, useCallback, useState } from 'react';

import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';

import { classNames } from 'shared/lib/classNames/classNames';

import { Modal } from 'shared/ui/Modal/Modal';

import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''> {/* <Suspense /> для переводов */}
        <Navbar />

        <button onClick={() => setIsOpen(true)}>
          toggle
        </button>

        <Modal
          isOpen={isOpen}
          onClose={useCallback(() => setIsOpen(false), [])}
        >
          Modal content text
        </Modal>

        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
