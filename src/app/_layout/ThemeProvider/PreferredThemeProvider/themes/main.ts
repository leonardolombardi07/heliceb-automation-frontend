"use client";

import { Roboto } from "next/font/google";
import { enUS } from "@mui/material/locale";
import { createResponsiveThemes } from "./utils";

const font = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const { light: MAIN_THEME, dark: DARK_MAIN_THEME } =
  createResponsiveThemes(
    {
      typography: {
        fontFamily: font.style.fontFamily,
      },
      palette: {
        mode: "light",
        primary: {
          main: "#4b1f68",
        },
        secondary: {
          main: "#00a3e0",
        },
      },
    },
    enUS
  );
