import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { match, Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { AppState } from '../../store'
import { ProfileState } from '../../reducers/profile'
import { AuthState } from '../../reducers/auth'
import { IProfile } from '../../interfaces/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

interface Props {
  getProfileById: CallableFunction
  profile: ProfileState
  auth: AuthState
  match: match<{ id: string }>
}

const isProfileEditable = (auth: AuthState, profile: IProfile) =>
  auth.isAuthenticated &&
  auth.loading === null &&
  auth.user &&
  profile &&
  auth.user._id === profile.user._id

const Profile: React.FC<Props> = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    // TODO: Fix bugs with concurrent getting profile requests -> redesign user & profile states structure
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to={ROUTES.PROFILES} className="btn btn-light">
            Back to Profiles
          </Link>
          {isProfileEditable(auth, profile) && (
            <Link to={ROUTES.PROFILE.EDIT} className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <h4>No Experience credentials</h4>
              )}
            </div>
            <div className="profile-edueducation bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>No Experience credentials</h4>
              )}
            </div>
          </div>
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
  { getProfileById }
)(Profile)
