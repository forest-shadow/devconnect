import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppState } from '../../store'
import { getCurrentProfile } from '../../actions/profile'
import { AuthState } from '../../reducers/auth'
import { ProfileState } from '../../reducers/profile'
import ROUTES from '../../constants/routes'

import Spinner from '../layout/Spinner'

interface DashboardProps {
  profile: ProfileState
  auth: AuthState
  getCurrentProfile: CallableFunction
}

const Dashboard: React.FC<DashboardProps> = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
    // eslint-disable-next-line
  }, [])
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {user && user.name}
      </p>
      {profile !== null ? (
        <>has</>
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
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
