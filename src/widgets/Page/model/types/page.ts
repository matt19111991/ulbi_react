// Record<адрес страницы, позиция скролла>
type ScrollSchema = Record<string, number>;

export interface PageScrollSchema {
  scroll: ScrollSchema;
}

export interface TestProps {
  'data-testid'?: string;
}
