import { changeThemeModeAC, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { baseApi } from "@/app/baseApi"
import { NavButton } from "@/common/components"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar
      position="static"
      sx={{
        mb: { xs: 2, sm: 3 },
        background: themeMode === "dark" ? "#1e1e1e" : "#f5f5f5",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderBottom: themeMode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth={"lg"}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
            width: "100%",
            maxWidth: "100%",
            px: 0,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {isLoggedIn && (
              <NavButton
                onClick={logoutHandler}
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Sign out
              </NavButton>
            )}
            <Switch color={"default"} onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress sx={{ height: 3 }} />}
    </AppBar>
  )
}
