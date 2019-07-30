import React from 'react'
import { IProfile } from '../../interfaces/profile'

interface Props {
  profile: IProfile
}

const ProfileAbout: React.FC<Props> = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">{name.split(' ')[0]}s Bio</h2>
          <p>{bio}</p>
        </>
      )}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.slice(0, 4).map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fa fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileAbout
