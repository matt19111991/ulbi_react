import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
  describe('getQueryParams', () => {
    test('test with 1 param', () => {
      const query = getQueryParams({
        test: 'value',
      });

      expect(query).toBe('?test=value');
    });

    test('test with multiple params', () => {
      const query = getQueryParams({
        id: '1',
        role: 'admin',
        test: 'value',
      });

      expect(query).toBe('?id=1&role=admin&test=value');
    });

    test('test with undefined', () => {
      const query = getQueryParams({
        id: '1',
        role: 'admin',
        test: undefined,
      });

      expect(query).toBe('?id=1&role=admin');
    });
  });
});
