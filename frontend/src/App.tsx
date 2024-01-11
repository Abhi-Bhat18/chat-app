import { useSelector } from "react-redux"
import { Box } from "@mui/material";
import { RootState } from "./app/api/store";

function App() {

  const user = useSelector(( state : RootState )=> state.auth.user);

  return (
    <Box component={'section'}>
      This is the home
      {user &&
        <Box component={'p'}>
          Welcome {user.fullName}
        </Box>
      }
    </Box>
  )
}

export default App
