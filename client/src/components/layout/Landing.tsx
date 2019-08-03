import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { AppState } from '../../store'

interface LandingProps {
  isAuthenticated: boolean
}

const Landing: React.FC<LandingProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to={ROUTES.DASHBOARD} />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to={ROUTES.REGISTER} className="btn btn-primary">
              Sign Up
            </Link>
            <Link to={ROUTES.LOGIN} className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
