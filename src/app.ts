import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import path from 'path'

// TODO: think about default config declaration
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '..', 'src', 'config')

import connectDB from './config/db'
import defineRoutes from './config/routes'

dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

import passportConfig from './config/passport'
passportConfig(passport)

defineRoutes(app)

export default app