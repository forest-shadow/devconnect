import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from 'passport'
import path from 'path'

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '..', 'src', 'config')

import connectDB from './config/db'
import { RouteConfigs } from './config/routes'

dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Passport Config
import passportConfig from './config/passport'
passportConfig(passport)

// routes
// TODO: wrap routes configuration into separate function
RouteConfigs.forEach((routeConfig) => { app.use(routeConfig.path, routeConfig.middleware) })

export default app