import { resolve } from 'path'; // объединяет все переданные сегменты пути вместе в абсолютный путь

// для удобства использования корня проекта и папки 'src'
export const resolveRoot = (...segments: string[]) =>
  // 'home/dmitry/WebstormProjects/ulbi_react/src/entities/test'
  resolve(__dirname, '..', '..', '..', 'src', ...segments);
