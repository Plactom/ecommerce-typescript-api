import express, { Application, Request, Response, NextFunction } from "express"
import routes from './router/auth'
import { createConnection } from 'typeorm'

require('dotenv/config')

createConnection({
    type: 'postgres',
    url: 'postgres://tqykeeyh:ke7nyaXxWW67RMLLTaABmUzZGEDxrnxt@ruby.db.elephantsql.com:5432/tqykeeyh',
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
