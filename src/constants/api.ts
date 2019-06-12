const API_BASE = '/api'
const PROFILE = API_BASE + '/profile'
const POSTS = API_BASE + '/posts'
const USER = API_BASE + '/user'

export default {
  POSTS: {
    BASE: POSTS,
    TEST: '/test',
  },
  PROFILE: {
    BASE: PROFILE,
    TEST: '/test',
  },
  USER: {
    BASE: USER,
    TEST: '/test',
    REGISTER: '/register',
    AUTH: '/auth',
    CURRENT: '/current'
  }
}
