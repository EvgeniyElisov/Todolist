import { Path } from "@/common/routing"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { Link } from "react-router"
import styles from "./PageNotFound.module.css"

export const PageNotFound = () => (
  <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 200px)",
      py: { xs: 4, sm: 6 },
      px: { xs: 2, sm: 3 },
    }}
  >
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button
      variant="contained"
      component={Link}
      to={Path.Main}
      sx={{
        width: { xs: "100%", sm: "330px" },
        maxWidth: "330px",
        mt: { xs: 3, sm: 4 },
      }}
    >
      Вернуться на главную
    </Button>
  </Container>
)
