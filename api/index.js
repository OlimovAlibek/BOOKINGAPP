import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

const app = express()

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB");
        
    } catch (error) {
        throw error; 
    }
}

app.listen(8800, () => {
    connect()
    console.log("connected to backend");
})

app.get('/', (req, res) => {
    res.send('hello world')
})

//middlewares

app.use(express.json())

app.use('/auth', authRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Smth is wrong, man"
    return res.status(errorStatus).json(errorMessage)
})


