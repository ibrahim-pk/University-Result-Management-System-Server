import {z} from 'zod'
const deptZodValidation=z.object({
   body:z.object({
    deptCode:z.string({
        required_error:"dept code is require"
    }),
    deptName:z.string({
        required_error:'dept name is require'
    }),
    // deptRank:z.number().optional()
   })
})

export default deptZodValidation