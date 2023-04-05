import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Alert from '../layout/Alert'
import ROUTES from '../../constants/routes'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../dashboard/Dashboard'
import ProfileCreate from '../dashboard/ProfileCreate'
import ProfileEdit from '../dashboard/ProfileEdit'
import AddExperience from '../dashboard/AddExperience'
import AddEducation from '../dashboard/AddEducation'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'

interface Props {}

const Routes: React.FC<Props> = props => (
  <section className="container">
    <Alert />
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.REGISTER} component={Register} />
      <Route exact path={ROUTES.PROFILES} component={Profiles} />
      <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute
        exact
        path={ROUTES.PROFILE.CREATE}
        component={ProfileCreate}
      />
      <PrivateRoute exact path={ROUTES.PROFILE.EDIT} component={ProfileEdit} />
      <PrivateRoute
        exact
        path={ROUTES.PROFILE.ADD_EXPERIENCE}
        component={AddExperience}
      />
      <PrivateRoute
        exact
        path={ROUTES.PROFILE.ADD_EDUCATION}
        component={AddEducation}
      />
      <Route exact path={ROUTES.PROFILE.ITEM()} component={Profile} />
      <PrivateRoute exact path={ROUTES.POSTS} component={Posts} />
      <PrivateRoute exact path={ROUTES.POST.ITEM()} component={Post} />
      <Route component={NotFound} />
    </Switch>
  </section>
)

export default Routes
