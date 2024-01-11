import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import { useCheckLoginQuery } from "../features/Auth/authApiSlice"
import React from "react"
import { Link } from "react-router-dom"
import { setUser } from "../features/Auth/authSlice"
import { useDispatch } from "react-redux"

const MainLayout: React.FC = () => {

  const dispath = useDispatch();

  const { data, isLoading, isSuccess, isError } = useCheckLoginQuery({});

  if (isLoading) {
    return <Box component={'main'}> Loading...  </Box>
  }
  
  if (isSuccess) {
    console.log("Dispatching the user");
    dispath(setUser(data.user))
  }

  if (isError) return (
    <Box component={'main'}>
      <Box component={'p'}> Unable to fetch user</Box>
      <Link to={'/login'}>Please login</Link>
    </Box>
  )

  return (
    <Box component={'main'}>
      <Outlet />
    </Box>
  )
}

export default MainLayout