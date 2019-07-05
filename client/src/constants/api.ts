const API_BASE = '/api'

const PROFILE = API_BASE + '/profile'
const PROFILE_EXPERIENCE = PROFILE + '/experience'
const PROFILE_EDUCATION = PROFILE + '/education'

const POST = API_BASE + '/post'
const USER = API_BASE + '/user'

export default {
  POST: {
    GET: (postId: string) => `${POST}/${postId}`,
    DELETE: (postId: string) => `${POST}/${postId}`,
    ASSESS: {
      LIKE: (postId: string) => `${POST}/${postId}/like`,
      UNLIKE: (postId: string) => `${POST}/${postId}/unlike`
    },
    COMMENT: {
      ADD: (postId: string) => `${POST}/${postId}/comment`,
      DELETE: (postId: string, commentId: string) =>
        `${POST}/${postId}/comment/${commentId}`
    }
  },
  PROFILE: {
    CURRENT: PROFILE + '/current',
    UPDATE: PROFILE + '/update',
    GET: (userId: string) => `${PROFILE}/user/${userId}`,
    EXPERIENCE: {
      ADD: PROFILE_EXPERIENCE,
      DELETE_BY_ID: (experienceId: string) =>
        `${PROFILE_EXPERIENCE}/${experienceId}`
    },
    EDUCATION: {
      ADD: PROFILE_EDUCATION,
      DELETE_BY_ID: (educationId: string) =>
        `${PROFILE_EDUCATION}/${educationId}`
    },
    GITHUB: {
      GET_USER_REPOS: (username: string) => `${PROFILE}/github/${username}`
    }
  },
  USER: {
    REGISTER: USER + '/register',
    AUTH: USER + '/auth',
    LOGIN: USER + '/login'
  }
}
