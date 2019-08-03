import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { Experience } from '../../interfaces/profile'
import { deleteExperience } from '../../actions/profile'

interface Props {
  experience: Array<Experience>
  deleteExperience: CallableFunction
}

const DashboardExperience: React.FC<Props> = ({
  experience,
  deleteExperience
}) => {
  const experienceRows = experience.map(experience => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className="hide-sm">{experience.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{experience.from}</Moment> —{' '}
        {experience.to === null ? (
          'Now'
        ) : (
          <Moment format="DD/MM/YYYY">{experience.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(experience._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experienceRows}</tbody>
      </table>
    </>
  )
}

export default connect(
  null,
  { deleteExperience }
)(DashboardExperience)
