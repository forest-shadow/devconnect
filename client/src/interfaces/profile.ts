import { IUser } from './user'

export interface IProfile {
  _id: string
  user: IUser
  company: string
  website: string
  location: string
  status: string
  skills: string[]
  bio: string
  githubUsername: string
  experience: Array<Experience>
  education: Array<Education>
  social: SocialLinks
  date: Date
}

export interface Experience {
  _id?: string
  title: string
  company: string
  location?: string
  from: string
  to?: string
  current: boolean
  description?: string
}

export interface Education {
  _id?: string
  school: string
  degree: string
  fieldOfStudy: string
  from: string
  to?: string
  current: boolean
  description?: string
}

export interface SocialLinks {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
}