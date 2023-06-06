const express = require('express')
const app = express()
const env = require('dotenv')
env.config()
const port = process.env.port
const connectDB = require("./config/db")
const cors = require("cors")

connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"))

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

