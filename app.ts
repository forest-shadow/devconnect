import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from 'passport'

import { RouteConfigs } from './config/routes'

dotenv.config()

// TODO: extract mongoose configuration to `./config`
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

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