const API_BASE = '/api'

const PROFILE = API_BASE + '/profile'
const PROFILE_EXPERIENCE = PROFILE + '/experience'
const PROFILE_EDUCATION = PROFILE + '/education'

const POST = API_BASE + '/post'
const appendBaseUrl = (base: string) => (url: string) => `${base}/${url}`
const appendPostUrl = appendBaseUrl(POST)
const getPostIdUrl = (postId: string) => appendPostUrl(postId)
const getPostCommentUrl = (postId: string) => getPostIdUrl(postId) + '/comment'

const USER = API_BASE + '/user'

export default {
  POST: {
    GET: getPostIdUrl,
    DELETE: getPostIdUrl,
    ASSESS: {
      LIKE: (postId: string) => getPostIdUrl(postId) + '/like',
      UNLIKE: (postId: string) => getPostIdUrl(postId) + '/unlike'
    },
    COMMENT: {
      ADD: getPostCommentUrl,
      DELETE: (postId: string, commentId: string) =>
        `${getPostCommentUrl(postId)}/${commentId}`
    }
  },
  PROFILE: {
    BASE: PROFILE,
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
