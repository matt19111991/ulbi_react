import { User } from 'entities/User';

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  code: string;
  type: ArticleBlockType.CODE;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  src: string;
  title: string;
  type: ArticleBlockType.IMAGE;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  paragraphs: Array<string>;
  title?: string;
  type: ArticleBlockType.TEXT;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
  ECONOMICS = 'ECONOMICS',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
}

export interface Article {
  id: string;
  blocks: Array<ArticleBlock>;
  createdAt: string;
  img: string;
  subtitle: string;
  title: string;
  type: Array<ArticleType>;
  user: User;
  views: number;
}

export enum ArticleView {
  LIST = 'list', // BIG
  PLATE = 'plate', // SMALL
}
