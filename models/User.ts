import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UsersSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

interface UsersDocument extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  avatar: string,
  date: string
}

const User = mongoose.model<UsersDocument>('users', UsersSchema)

export default User