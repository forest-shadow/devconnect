import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { Education } from '../../interfaces/profile'
import { deleteEducation } from '../../actions/profile'

interface Props {
  education: Array<Education>
  deleteEducation: CallableFunction
}

const DashboardEducation: React.FC<Props> = ({
  education,
  deleteEducation
}) => {
  const educationRows = education.map(education => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td className="hide-sm">{education.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{education.from}</Moment> —{' '}
        {education.to === null ? (
          'Now'
        ) : (
          <Moment format="DD/MM/YYYY">{education.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(education._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationRows}</tbody>
      </table>
    </>
  )
}

export default connect(
  null,
  { deleteEducation }
)(DashboardEducation)
