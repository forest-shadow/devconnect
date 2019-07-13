import { IUser } from './user'

export interface IProfile {
  user: string | IUser
  company: string
  website: string
  location: string
  status: string
  skills: string[]
  bio: string
  githubUsername: string
  experience: [Experience]
  education: [Education]
  social: SocialLinks
  date: Date
}

interface Experience {
  id?: string
  title: string
  company: string
  location?: string
  from: Date
  to?: Date
  current: boolean
  description?: string
}

export interface Education {
  id?: string
  school: string
  degree: string
  fieldOfStudy: string
  from: Date
  to?: Date
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
