import {
    ThemeOptions,
    createTheme,
    responsiveFontSizes,
  } from "@mui/material/styles";
  
  export const defaultTheme = customizeTheme();
  
  export const lightTheme = responsiveFontSizes(
    customizeTheme({
      palette: {},
    })
  );
  export const darkTheme = responsiveFontSizes(
    customizeTheme({
      palette: {
        mode: "dark",
        common: { black: "#101418" },
        primary: {
          light: "#CCECFD",
          main: "#2160fd",
          contrastText: "#FFFFFF",
        },
        secondary: {
          light: "#1d242a",
          main: "#b0b8c4",
          contrastText: "#FFFFFF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#b0b8c4",
        },
        success: {
          main: "#F0FDF4",
          light: "#DCFCE7",
          dark: "#22C55E",
          contrastText: "#15803D",
          //...defaultTheme.palette.success,
        },
        warning: {
          ...defaultTheme.palette.warning,
        },
      },
    })
  );
  
  export function customizeTheme(theme?: ThemeOptions) {
    return createTheme({
      ...theme,
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
      shape: {
        borderRadius: 8,
      },
      typography: {
        fontFamily: ["'Inter'", "sans-serif"].join(),
        button: {
          textTransform: "none",
        },
      },
      components: {
        MuiIcon: {
          defaultProps: {
            baseClassName: "material-symbols-outlined",
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 16,
            },
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            variant: "contained",
          },
        },
      },
    });
  }
  