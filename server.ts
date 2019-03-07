import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

console.warn(process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

const app = express();

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log(`http://localhost:${port}`)
  }
);