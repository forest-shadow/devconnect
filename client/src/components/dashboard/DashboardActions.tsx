import React from 'react'
import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'

const DashboardActions = () => (
  <div className="dash-buttons">
    <Link to={ROUTES.PROFILE.EDIT} className="btn btn-light">
      <i className="fas fa-user-circle text-primary"></i> Edit Profile
    </Link>
    <Link to={ROUTES.PROFILE.ADD_EXPERIENCE} className="btn btn-light">
      <i className="fab fa-black-tie text-primary"></i> Add Experience
    </Link>
    <Link to={ROUTES.PROFILE.ADD_EDUCATION} className="btn btn-light">
      <i className="fas fa-graduation-cap text-primary"></i> Add Education
    </Link>
  </div>
)

export default DashboardActions
