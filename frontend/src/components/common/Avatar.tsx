import React from 'react'
import { Box } from '@mui/material'

interface Props {
    src: string,
    height: string,
    width: string,
    alt?: string
}

const Avatar: React.FC<Props> = ({ src, alt, height, width }) => {
    return (
        <Box
            component={'img'}
            src={src}
            alt={alt ? alt : 'Avatar'}
            sx={{
                borderRadius: '100%',
                height: height,
                width: width
            }}
        />
    )
}

export default Avatar