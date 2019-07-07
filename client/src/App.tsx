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
              <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
}

export default App
