import { Router } from "express"
import UserRouter from "./user.js"
const router =Router()

router.get('/',(req,res)=>{
    res.status(200).send(`<h1>welcome</h1>`)
})
router.use('/rooms',UserRouter)

export default router