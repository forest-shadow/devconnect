import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { posts, users, profile } from './routes/api'

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

const app = express()

// routes
app.get('/', (req, res) => res.send('Hello'))
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users', users)

export default app