import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { AppState } from '../../store'
import { logout } from '../../actions/auth'
import { AuthState } from '../../reducers/auth'

interface NavbarProps {
  auth: AuthState
  logout: CallableFunction
}

const Navbar: React.FC<NavbarProps> = ({
  auth: { isAuthenticated, loading },
  logout
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to={ROUTES.DASHBOARD}>
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={() => logout()} to="/">
          <i className="fas fa-sign-out"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinkgs = (
    <ul>
      <li>
        <Link to="profiles.html">Developers</Link>
      </li>
      <li>
        <Link to={ROUTES.REGISTER}>Register</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Login</Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinkgs}</>}
    </nav>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
