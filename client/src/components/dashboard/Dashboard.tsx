import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { AppState } from '../../store'
import { AuthState } from '../../reducers/auth'
import { ProfileState } from '../../reducers/profile'

import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'

interface DashboardProps {
  profile: ProfileState
  auth: AuthState
}

const Dashboard: React.FC<DashboardProps> = ({
  auth: { user },
  profile: { profile, loading }
}) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link className="btn btn-primary my-1" to={ROUTES.PROFILE.CREATE}>
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Dashboard)
