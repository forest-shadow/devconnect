import gravatar from 'gravatar'
import * as GravatarModule from 'gravatar'

const iconOptions: GravatarModule.Options = {
  s: '200', // Size
  r: 'pg', // Rating
  d: 'mm' // Default
}

export const getGravatarIcon = (email: string) => gravatar.url(email, iconOptions)