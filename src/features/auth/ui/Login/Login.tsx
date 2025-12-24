import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useGetCaptchaQuery, useLoginMutation } from "@/features/auth/api/authApi"
import { type LoginInputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [login, { data: loginData }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const { data: captchaUrl } = useGetCaptchaQuery(undefined, { skip: loginData?.resultCode !== 10 })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        reset()
      }
    })
  }

  return (
    <Grid container justifyContent={"center"} className={styles.formContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        style={{
          background: themeMode === "dark" ? "#1e1e1e" : "#f5f5f5",
          color: themeMode === "dark" ? "#ffffff" : "#212121",
        }}
      >
        <FormControl fullWidth>
          <FormLabel className={styles.formLabel}>
            <p>
              To login get registered 
              <a href="https://social-network.samuraijs.com" target="_blank" rel="noreferrer">
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup className={styles.formGroup}>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} fullWidth />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
              fullWidth
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

            {captchaUrl && (
              <>
                <Box
                  component={"img"}
                  className={styles.captchaImage}
                  sx={{
                    height: { xs: 150, sm: 200 },
                    width: { xs: "100%", sm: 300 },
                    maxWidth: 300,
                    alignSelf: "center",
                    objectFit: "contain",
                  }}
                  src={captchaUrl?.url}
                  alt="Captcha"
                />
                <TextField
                  type="text"
                  label="Captcha"
                  margin="normal"
                  error={!!errors.captcha}
                  {...register("captcha")}
                  fullWidth
                />
                {errors.captcha && <span className={styles.errorMessage}>{errors.captcha.message}</span>}
              </>
            )}

            <Button type="submit" variant="contained" color="primary" className={styles.submitButton} fullWidth>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
