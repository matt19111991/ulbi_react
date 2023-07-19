import { AddCommentFormSchema } from '../types/addCommentFormSchema';

import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('addCommentFormSlice', () => {
  test('test set text', () => {
    const state: DeepPartial<AddCommentFormSchema> = {};

    const reducer = addCommentFormReducer(
      state as AddCommentFormSchema,
      addCommentFormActions.setText('New comment'),
    );

    expect(reducer).toEqual({ text: 'New comment' });
  });
});
