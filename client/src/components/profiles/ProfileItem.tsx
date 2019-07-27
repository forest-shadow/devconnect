import React from 'react'
import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { IProfile } from '../../interfaces/profile'

interface Props {
  profile: IProfile
}

const ProfileItem: React.FC<Props> = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => (
  <div className="profile bg-light">
    <img src={avatar} alt="" className="round-img" />
    <div>
      <h2>{name}</h2>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      <Link to={ROUTES.PROFILE.ITEM(_id)} className="btn btn-primary">
        View Profile
      </Link>
    </div>
    <ul>
      {skills.slice(0, 4).map((skill, index) => (
        <li key={index} className="text-primary">
          <i className="fa fa-check" /> {skill}
        </li>
      ))}
    </ul>
  </div>
)

export default ProfileItem
