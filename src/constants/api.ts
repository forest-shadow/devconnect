const API_BASE = '/api'
const PROFILE = API_BASE + '/profile'
const POSTS = API_BASE + '/posts'
const USERS = API_BASE + '/users'

export default {
  POSTS: {
    BASE: POSTS,
    TEST: '/test',
  },
  PROFILE: {
    BASE: PROFILE,
    TEST: '/test',
  },
  USERS: {
    BASE: USERS,
    TEST: '/test',
    REGISTER: '/register',
    LOGIN: '/login',
    CURRENT: '/current'
  }
}
