import { Express, Router } from 'express'

import API from '../constants/api'
import * as AppRoutesMiddleware from '../routes'

interface RouteConfig {
  path: string
  middleware: Router
}

const RouteConfigs: RouteConfig[] = [
  {
    path: API.USER.BASE,
    middleware: AppRoutesMiddleware.user
  },
  {
    path: API.POSTS.BASE,
    middleware: AppRoutesMiddleware.posts,
  },
  {
    path: API.PROFILE.BASE,
    middleware: AppRoutesMiddleware.posts,
  }
]

const defineRoutes = (app: Express) => {
  RouteConfigs.forEach((routeConfig) => {
    app.use(routeConfig.path, routeConfig.middleware)
  })
}


export default defineRoutes
