import mongoose from 'mongoose'
import config from 'config'

const getDBUri = config.get<Function>('mongoURI')

const connectDB = async () => {
  const DB_URI = getDBUri(process.env.MONGODB_USER, process.env.MONGODB_USER_PASSWORD)

  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log('MongoDB Connected')
  } catch (error) {
    console.error(error.message)

    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
