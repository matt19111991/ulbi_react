// скрипт для автоматического перехода от импортов 'entities/Article' к '@/entities/Article'

import { Project } from 'ts-morph';

const project = new Project({}); // проект для работы с AST деревом

project.addSourceFilesAtPaths('src/**/*.ts');  // добавляем все '.ts' файлы
project.addSourceFilesAtPaths('src/**/*.tsx'); // добавляем все '.tsx' файлы

const files = project.getSourceFiles(); // получаем все эти файлы

files.forEach((sourceFile) => {
  sourceFile.getImportStringLiterals();
});
