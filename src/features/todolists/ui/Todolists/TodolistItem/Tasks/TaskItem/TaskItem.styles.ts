import { SxProps } from "@mui/material"

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: "8px 0",
  justifyContent: "space-between",
  alignItems: "center",
  opacity: isDone ? 0.6 : 1,
  borderRadius: "8px",
  transition: "background-color 0.2s, opacity 0.2s",
  "&:hover": {
    backgroundColor: "action.hover",
  },
  "& .MuiCheckbox-root": {
    padding: "4px 8px",
  },
})
