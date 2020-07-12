import express, { Application, Request, Response, NextFunction } from "express"
import routes from './router/auth'
import { createConnection } from 'typeorm'
import * as helmet from "helmet"

require('dotenv/config')

createConnection({
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    entities: ["src/entity/*.ts"],
    logging: true
}).then(connection => {
    connection.synchronize()

    const app: Application = express()

    app.use(express.json())
    app.use("/", routes)
    
    const PORT = process.env.PORT
    
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`)
    })
})
