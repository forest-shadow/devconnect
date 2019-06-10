import { Router } from 'express'
import API from '../constants/api'
import * as RoutesMiddleware from '../routes/api'

interface RouteConfig {
  path: string
  middleware: Router
}

export const RouteConfigs: RouteConfig[] = [
  {
    path: API.USERS.BASE,
    middleware: RoutesMiddleware.users
  },
  {
    path: API.POSTS.BASE,
    middleware: RoutesMiddleware.posts,
  },
  {
    path: API.PROFILE.BASE,
    middleware: RoutesMiddleware.posts,
  }
]
