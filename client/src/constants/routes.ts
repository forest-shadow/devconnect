const PROFILE = '/profile'
const POST = '/post'

export default {
  REGISTER: '/register',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: {
    ROOT: PROFILE,
    ITEM: (id: string = ':id') => PROFILE + `/${id}`,
    CREATE: PROFILE + '/create',
    EDIT: PROFILE + '/edit',
    ADD_EXPERIENCE: PROFILE + '/add-experience',
    ADD_EDUCATION: PROFILE + '/add-education'
  },
  PROFILES: '/profiles',
  POSTS: '/posts',
  POST: {
    ITEM: (id: string = ':id') => POST + `/${id}`
  }
}
