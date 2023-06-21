import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}> {/* <Suspense /> для роутинга */}
            <Routes>
                {Object.values(routeConfig).map(({ element, path }) => (
                    <Route
                        element={(<div className="page-wrapper">{element}</div>)}
                        key={path}
                        path={path}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
