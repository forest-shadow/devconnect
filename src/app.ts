import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from 'passport'
import path from 'path'

// TODO: think about default config declaration
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '..', 'src', 'config')

import connectDB from './config/db'
import defineRoutes from './config/routes'

dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

import passportConfig from './config/passport'
passportConfig(passport)

defineRoutes(app)

export default app