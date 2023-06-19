import { lazy } from 'react';

/*
Чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
по умолчанию: export default AboutPage;
*/

export const AboutPageAsync = lazy(() => import('./AboutPage'));
