import React from 'react'
import Moment from 'react-moment'

import { Experience } from '../../interfaces/profile'

interface Props {
  experience: Experience
}

const ProfileExperience: React.FC<Props> = ({
  experience: { company, title, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> —{' '}
      {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
)

export default ProfileExperience
