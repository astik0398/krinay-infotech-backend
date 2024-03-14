const express = require('express')
const app = express()
require('dotenv').config()
const {connection} = require('./db')
const {todoRouter} = require('./routes/todo.routes')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/', todoRouter)

app.listen(process.env.PORT, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log(`server running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})