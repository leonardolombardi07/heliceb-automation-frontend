import { PreferredTheme } from "../constants";
import { MAIN_THEME, DARK_MAIN_THEME } from "./main";

export const THEMES: {
  [key in PreferredTheme["name"]]: {
    [key in PreferredTheme["mode"]]: typeof MAIN_THEME;
  };
} = {
  ["main"]: {
    light: MAIN_THEME,
    dark: DARK_MAIN_THEME,
  },
} as const;
