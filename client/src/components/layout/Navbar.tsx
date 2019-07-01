import React from 'react'
import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
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
    </nav>
  )
}

export default Navbar
