export interface Profile {
  user: number,
  company: string,
  website: string,
  location: string,
  status: string,
  skills: string,
  bio: string,
  githubUsername: string,
  experience: [{[index: string]: string|Date|boolean}],
  education: [{[index: string]: string|Date|boolean}],
  social: SocialLinks,
  date: Date
}

export interface SocialLinks {
  [index: string]: string
}