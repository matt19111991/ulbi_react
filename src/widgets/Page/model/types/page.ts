type ScrollSchema = Record<string, number>; // 'Record<адрес страницы, позиция скролла>'

export interface PageScrollSchema {
  scroll: ScrollSchema;
}
