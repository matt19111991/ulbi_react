import { ArticleBlock, ArticleType } from '@/entities/Article';

export interface EditArticleForm {
  blocks: Array<ArticleBlock>;
  img: string;
  subtitle: string;
  title: string;
  type: Array<ArticleType>;
}

export interface EditArticleFormSchema {
  error?: string;
  isLoading: boolean;
}
