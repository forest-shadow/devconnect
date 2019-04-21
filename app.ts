import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from 'passport'

import { posts, users, profile } from './routes/api'

dotenv.config()

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
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users', users)

export default app