import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
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

interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
  avatar: string
  date: string
}

const UserModel = mongoose.model<UserDocument>('user', UserSchema)

export default UserModel