/*
   '@testing-library/jest-dom' добавит методы для тестов такие, как toBeInTheDocument(), toHaveStyle() и т.д:
   expect(screen.getByText('Test')).toBeInTheDocument();
*/

import '@testing-library/jest-dom';

/* Поддержка
   React v.18+ <=> @testing-library/react v.13+
   React v.17- <=> @testing-library/react v.12.1.5-
*/

/* ReferenceError: React is not defined =>
   в babel.config.json нужно добавить: ["@babel/preset-react", { "runtime": "automatic" }]
*/

/* ReferenceError: regenerator is not defined => в setupTests нужно добавить:
   import 'regenerator-runtime/runtime';
*/
