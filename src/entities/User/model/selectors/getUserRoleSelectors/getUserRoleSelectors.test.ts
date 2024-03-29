import type { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '../../consts';

import { getUserRoles, isUserAdmin, isUserManager } from './getUserRoleSelectors';

describe('getUserRoleSelectors', () => {
  describe('isUserAdmin', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        user: {
          authData: {
            id: '1',
            roles: [UserRole.ADMIN, UserRole.MANAGER],
            username: 'Jack',
          },
        },
      };

      expect(isUserAdmin(state as StateSchema)).toBeTruthy();
    });

    test('should return false', () => {
      const state: DeepPartial<StateSchema> = {
        user: {
          authData: {
            id: '1',
            roles: [UserRole.MANAGER],
            username: 'Jack',
          },
        },
      };

      expect(isUserAdmin(state as StateSchema)).toBeFalsy();
    });

    test('should work with empty state data', () => {
      const state: DeepPartial<StateSchema> = {
        user: {},
      };

      expect(isUserAdmin(state as StateSchema)).toBeFalsy();
    });
  });

  describe('isUserManager', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        user: {
          authData: {
            id: '1',
            roles: [UserRole.MANAGER, UserRole.USER],
            username: 'Jack',
          },
        },
      };

      expect(isUserManager(state as StateSchema)).toBeTruthy();
    });

    test('should return false', () => {
      const state: DeepPartial<StateSchema> = {
        user: {
          authData: {
            id: '1',
            roles: [UserRole.USER],
            username: 'Jack',
          },
        },
      };

      expect(isUserManager(state as StateSchema)).toBeFalsy();
    });

    test('should work with empty state data', () => {
      const state: DeepPartial<StateSchema> = {
        user: {},
      };

      expect(isUserManager(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getUserRoles', () => {
    test('should return roles', () => {
      const state: DeepPartial<StateSchema> = {
        user: {
          authData: {
            id: '1',
            roles: [UserRole.ADMIN, UserRole.MANAGER],
            username: 'Jack',
          },
        },
      };

      expect(getUserRoles(state as StateSchema)).toHaveLength(2);
      expect(getUserRoles(state as StateSchema)).toContain(UserRole.ADMIN);
      expect(getUserRoles(state as StateSchema)).toContain(UserRole.MANAGER);
    });

    test('should work with empty state data', () => {
      const state: DeepPartial<StateSchema> = {
        user: {},
      };

      expect(getUserRoles(state as StateSchema)).toBeUndefined();
    });
  });
});
