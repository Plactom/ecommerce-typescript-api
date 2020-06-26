import express, { Application, Request, Response, NextFunction } from "express"
import routes from './router/auth'
import { createConnection } from 'typeorm'

require('dotenv/config')

createConnection().then(connection => {
    connection.synchronize()

    const app: Application = express()

    app.use(express.json())
    app.use("/", routes)
    
    const PORT = process.env.PORT
    
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`)
    })
})
