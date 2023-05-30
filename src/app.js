import express from 'express'
import mongoose from "mongoose"
import dotenv from  'dotenv' 
dotenv.config()

import routes from './routes.js'


const URL =  `mongodb+srv://${process.env.loginDb}:${process.env.passwordDb}@cluster0.volwej5.mongodb.net/scheduler?retryWrites=true&w=majority`

await mongoose
  .connect(URL)
  .then(()=>console.log('connect to mongoDB'))
  .catch(e=>console.log('connect to mongoDB termninated with fail:', e))

const app = express()

app.use(express.json())

const port = process.env.PORT||3001

app.use("/", routes)

app.listen(port, (err) => {
  err ? 
    console.log('App was started unsuccessfully, error:', err) :
    console.log(`App listening on port ${port}`)
})