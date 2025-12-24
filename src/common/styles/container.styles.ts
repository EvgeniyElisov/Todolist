import { SxProps, Theme } from "@mui/material"

export const containerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
}

export const cardSx: SxProps<Theme> = (theme) => ({
  p: { xs: 2, sm: 2.5, md: 3 },
  borderRadius: 3,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
  border:
    theme.palette.mode === "dark"
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.06)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 30px rgba(0, 0, 0, 0.4)"
        : "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
})

export const skeletonContainerSx: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  gap: { xs: 2, sm: 3, md: 4 },
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  justifyContent: "center",
}
