import express from "express"
import AppRoutes from "./Routes/index.js"

const PORT = process.env.PORT || 7002

const app =express()
app.use(express.json())
app.use(AppRoutes)




app.listen(PORT,()=>console.log(`App is Running in ${PORT}`))