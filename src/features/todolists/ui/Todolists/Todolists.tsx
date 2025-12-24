import { cardSx, skeletonContainerSx } from "@/common/styles"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <TodolistSkeleton />
            </Grid>
          ))}
      </>
    )
  }

  if (!todolists || todolists.length === 0) {
    return (
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: "text.secondary",
            fontStyle: "italic",
            width: "100%",
          }}
        >
          Нет списков задач. Создайте первый список!
        </Box>
      </Grid>
    )
  }

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id} item xs={12} sm={6} md={4}>
          <Paper sx={cardSx}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
