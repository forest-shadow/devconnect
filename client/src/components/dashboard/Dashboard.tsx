import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { getCurrentProfile } from '../../actions/profile'
import { AuthState } from '../../reducers/auth'
import { ProfileState } from '../../reducers/profile'

interface DashboardProps {
  profile: ProfileState
  auth: AuthState
  getCurrentProfile: CallableFunction
}

const Dashboard: React.FC<DashboardProps> = ({
  getCurrentProfile,
  auth,
  profile
}) => {
  useEffect(() => {
    getCurrentProfile()
    // eslint-disable-next-line
  }, [])
  return <div>Dashboard</div>
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
