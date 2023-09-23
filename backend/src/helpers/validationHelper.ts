import {z} from 'zod'

const messageSchema = z.object({
    message : z.string()
})