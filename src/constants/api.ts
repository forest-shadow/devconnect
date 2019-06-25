const API_BASE = '/api'

const PROFILE = '/profile'
const PROFILE_EXPERIENCE = '/experience'
const PROFILE_EDUCATION = '/education'
const POST = '/post'
const USER = '/user'

const PROFILE_BASE = API_BASE + PROFILE
const POST_BASE = API_BASE + POST
const USER_BASE = API_BASE + USER

export default {
  POST: {
    BASE: POST_BASE,
    TEST: '/test',
  },
  PROFILE: {
    BASE: PROFILE_BASE,
    TEST: '/test',
    CURRENT: '/current',
    UPDATE: '/update',
    GET_BY_USER_ID: '/user/:user_id',
    EXPERIENCE: {
      ADD: PROFILE_EXPERIENCE,
      DELETE_BY_ID: PROFILE_EXPERIENCE + '/:experience_id'
    },
    EDUCATION: {
      ADD: PROFILE_EDUCATION,
      DELETE_BY_ID: PROFILE_EDUCATION + '/:education_id'
    },
    GITHUB: {
      GET_USER_REPOS: '/github/:username'
    }
  },
  USER: {
    BASE: USER_BASE,
    TEST: '/test',
    REGISTER: '/register',
    AUTH: '/auth',
    LOGIN: '/login',
  }
}
