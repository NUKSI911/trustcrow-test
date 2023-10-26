import { useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./ThemeConfig"
import useThemeMode from "@/hooks/useThemeMode"; 
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

export function AppThemeProvider(props: Partial<ThemeProviderProps>) {
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useThemeMode();

  const isDark =
    (themeMode === "media" && isSystemDark) || themeMode === "dark";

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (isDark) {
      // document.documentElement.classList.add("dark");
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.add("dark");
    } else {
      // document.documentElement.classList.remove("dark");
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.remove("dark");
    }
    type paletteKeys = keyof typeof theme.palette;
    (
      [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "common",
        "text",
        "background",
        "action",
      ] as paletteKeys[]
    ).forEach((palatteKey) => {
      Object.keys(theme.palette[palatteKey]).forEach((palatteKeyColor) => {
        document.documentElement.style.setProperty(
          `--color-${String(palatteKey)}-${palatteKeyColor}`,
          //@ts-ignore
          theme.palette[palatteKey][palatteKeyColor]
        );
      });
    });
  }, [isDark, theme, theme.palette]);
  return (
    <ThemeProvider theme={theme} {...props}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
