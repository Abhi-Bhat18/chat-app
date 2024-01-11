import { Box, Input } from '@mui/material'
import { BiSearchAlt } from "react-icons/bi";
import { useState } from 'react';


const SearchConversation = () => {

  const [search, setSearch] = useState('');

  return (
    <Box component={'div'} sx={{
      backgroundColor: 'white',
      paddingX: '4px',
      paddingY: '6px',
      display: 'flex',
      alignItems: 'center',
      border: 'solid 1px',
      borderRadius: '5px'
    }}>
      <BiSearchAlt />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} type='text' sx={{ outline: 'none' }} />
    </Box>
  )
}

export default SearchConversation