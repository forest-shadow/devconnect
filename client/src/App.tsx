import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import { loadUser } from './utils/auth'
import ROUTES from './constants/routes'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

import './App.css'
import ProfileCreate from './components/dashboard/ProfileCreate'
import ProfileEdit from './components/dashboard/ProfileEdit'
import AddExperience from './components/dashboard/AddExperience'
import AddEducation from './components/dashboard/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

const App: React.FC = () => {
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.REGISTER} component={Register} />
              <Route exact path={ROUTES.PROFILES} component={Profiles} />
              <Route exact path={ROUTES.PROFILE.ITEM()} component={Profile} />
              <PrivateRoute
                exact
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path={ROUTES.PROFILE.CREATE}
                component={ProfileCreate}
              />
              <PrivateRoute
                exact
                path={ROUTES.PROFILE.EDIT}
                component={ProfileEdit}
              />
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
              <PrivateRoute
                exact
                path={ROUTES.POSTS}
                component={Posts}
              />
              <PrivateRoute
                exact
                path={ROUTES.POST.ITEM()}
                component={Post}
              />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
}

export default App
