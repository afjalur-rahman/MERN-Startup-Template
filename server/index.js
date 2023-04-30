import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import connectDb from './config/connectdb.js'
import routes from './routes/userRoutes.js'
{/* 
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/}

const app=express()
const port=process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


//CORS Policy
app.use(cors())


connectDb(DATABASE_URL)

app.use(express.json())
app.use("/api/user",routes)

{/*

app.use(express.static(path.join(__dirname,"../client/build")))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
})
*/}


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})