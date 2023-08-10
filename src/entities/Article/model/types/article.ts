import { User } from '@/entities/User';

import { ArticleBlockType, ArticleType } from '../consts/articleConsts';

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
