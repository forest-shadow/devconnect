import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
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

export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  avatar: string,
  date: string
}

const User = mongoose.model<User>('users', UserSchema)

export default User