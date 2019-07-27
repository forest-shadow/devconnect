const PROFILE = '/profile'

export default {
  REGISTER: '/register',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: {
    ROOT: PROFILE,
    ITEM: (id: string) => PROFILE + `/${id}`,
    CREATE: PROFILE + '/create',
    EDIT: PROFILE + '/edit',
    ADD_EXPERIENCE: PROFILE + '/add-experience',
    ADD_EDUCATION: PROFILE + '/add-education'
  },
  PROFILES: '/profiles'
}
