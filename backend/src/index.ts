import express, { json } from 'express'
import { dbConnect } from './db/dbConnect'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route'
import cookieParser from 'cookie-parser'
import contentRoutes from './routes/content.routes'
import cors from 'cors'


const app = express()
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,               // allow cookies / headers
}));
app.use(cookieParser())
app.use(json())
dotenv.config()
const port =3000

app.use('/api/auth',authRoutes)
app.use('/api/v1',contentRoutes)


app.listen(port,()=>{
    dbConnect()
    console.log(`server is running on port ${port}` )
})


