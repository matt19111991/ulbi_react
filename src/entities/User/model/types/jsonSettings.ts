import { Theme } from '@/shared/const/theme';

export interface JsonSettings {
  isArticlesPageHasBeenOpened?: boolean;
  isFirstVisit?: boolean;
  isSettingsPageHasBeenOpen?: boolean;
  theme?: Theme;
}
