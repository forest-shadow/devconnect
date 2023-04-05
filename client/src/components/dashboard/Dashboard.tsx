import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { AppState } from '../../store'
import { AuthState } from '../../reducers/auth'
import { ProfileState } from '../../reducers/profile'
import { deleteUser } from '../../actions/auth'
import { getCurrentProfile } from '../../actions/profile'

import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import DashboardExperience from './DashboardExperience'
import DashboardEducation from './DashboardEducation'

interface DashboardProps {
  profile: ProfileState
  auth: AuthState
  deleteUser: CallableFunction
  getCurrentProfile: CallableFunction
}

const Dashboard: React.FC<DashboardProps> = ({
  auth: { user },
  profile: { profile, loading },
  deleteUser,
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      {
        user && user.name ? (
          <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fas fa-user"></i> {user.name}
            </p>
          </>
        ) : <></>
      }
      
      {profile !== null ? (
        <>
          <DashboardActions />
          <DashboardExperience experience={profile.experience} />
          <DashboardEducation education={profile.education} />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link className="btn btn-primary my-1" to={ROUTES.PROFILE.CREATE}>
            Create Profile
          </Link>
        </>
      )}
      <div className="my-2">
        <button onClick={() => deleteUser()} className="btn btn-danger">
          <i className="fas fa-user-minus" /> Delete My Account
        </button>
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { deleteUser, getCurrentProfile })(Dashboard)
