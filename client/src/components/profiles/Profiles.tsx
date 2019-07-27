import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import { AppState } from '../../store'
import { ProfileState } from '../../reducers/profile'
import ProfileItem from './ProfileItem'

interface Props {
  profile: ProfileState
  getProfiles: CallableFunction
}

const Profiles: React.FC<Props> = ({
  profile: { profiles, loading },
  getProfiles
}) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
