import type { ThemeMode } from "@/app/app-slice"
import { createTheme } from "@mui/material/styles"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
        light: "#4A90E2",
        dark: "#005A87",
      },
      secondary: {
        main: "#764ba2",
        light: "#9B6FC7",
        dark: "#5A2E7D",
      },
      background: {
        default: themeMode === "dark" ? "#121212" : "#e0e0e0",
        paper: themeMode === "dark" ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: themeMode === "dark" ? "#ffffff" : "#212121",
        secondary: themeMode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  })
}
