import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import { loadUser } from './utils/auth'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

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
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes}/>
          </Switch>
        </>
      </Router>
    </Provider>
  )
}

export default App
