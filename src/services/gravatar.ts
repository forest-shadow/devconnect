import gravatar, { Options } from 'gravatar'

const iconOptions: Options = {
  s: '200', // Size
  r: 'pg', // Rating
  d: 'mm' // Default
}

const getGravatarIcon = (email: string) => gravatar.url(email, iconOptions)
export default getGravatarIcon