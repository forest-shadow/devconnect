import React from 'react'
import Moment from 'react-moment'

import { Education } from "../../interfaces/profile";

interface Props {
  education: Education
}

const ProfileEducation: React.FC<Props> = ({
  education: { school, degree, fieldOfStudy, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> —{' '}
      {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field of study: </strong> {fieldOfStudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
)

export default ProfileEducation
