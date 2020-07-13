import express, { Application, Request, Response, NextFunction } from "express"
import authRoutes from './router/auth'
import productManagement from './router/productManagement'
import { createConnection } from 'typeorm'
import Helmet from "helmet"

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
    app.use(Helmet())
    app.use("/auth", authRoutes)
    app.use("/productManagement", productManagement)
    
    const PORT = process.env.PORT
    
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`)
    })
})
