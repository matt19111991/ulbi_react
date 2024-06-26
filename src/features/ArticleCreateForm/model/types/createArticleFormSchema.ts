import { ArticleType } from '@/entities/Article';
import type { ArticleBlock } from '@/entities/Article';

export interface CreateArticleForm {
  blocks: Array<ArticleBlock>;
  img: string;
  subtitle: string;
  title: string;
  type: Array<ArticleType>;
}

export interface CreateArticleFormSchema {
  error?: string;
  isLoading: boolean;
}
