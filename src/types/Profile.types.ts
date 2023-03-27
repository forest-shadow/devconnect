import { Schema } from 'mongoose'
import { User } from '../interfaces/user'

export interface Profile {
  user: string|User|Schema.Types.ObjectId,
  company: string,
  website: string,
  location: string,
  status: string,
  skills: string,
  bio: string,
  githubUsername: string,
  experience: [Experience],
  education: [Education],
  social: SocialLinks,
  date: Date
}

export interface Experience {
  id?: string,
  title: string
  company: string,
  location?: string
  from: Date,
  to?: Date,
  current: boolean,
  description?: string
}

export interface Education {
  id?: string,
  school: string,
  degree: string,
  fieldOfStudy: string,
  from: Date,
  to?: Date,
  current: boolean,
  description?: string
}

export interface SocialLinks {
  [index: string]: string
}