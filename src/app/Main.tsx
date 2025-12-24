import { CreateItemForm } from "@/common/components"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "calc(100vh - 200px)",
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth={"lg"}
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            mb: { xs: 3, sm: 4 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "800px" },
            boxSizing: "border-box",
          }}
        >
          <CreateItemForm onCreateItem={addTodolist} />
        </Box>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            width: "100%",
            maxWidth: "100%",
            m: 0,
            boxSizing: "border-box",
          }}
        >
          <Todolists />
        </Grid>
      </Container>
    </Box>
  )
}
