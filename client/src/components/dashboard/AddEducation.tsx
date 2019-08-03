import React, { useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { addEducation } from '../../actions/profile'
import { HTMLFormInputElements } from '../../interfaces/form'

interface Props extends RouteComponentProps {
  addEducation: CallableFunction
}

export interface AddEducationForm {
  school: string
  degree: string
  fieldOfStudy: string
  from: string
  to: string
  current: boolean
  description: string
}

const initialState: AddEducationForm = {
  school: '',
  degree: '',
  fieldOfStudy: '',
  from: '',
  to: '',
  current: false,
  description: ''
}

const AddEducation: React.FC<Props> = ({ addEducation, history }) => {
  const [formData, setFormData] = useState(initialState)
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData

  const [dateToDisabled, toggleDisabled] = useState(false)

  const onChange = (e: React.FormEvent<HTMLFormInputElements>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you have offended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault()
          addEducation(formData, history)
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldOfStudy"
            value={fieldOfStudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current.toString()}
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current })
                toggleDisabled(!dateToDisabled)
              }}
            />{' '}
            Current
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={dateToDisabled}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols={30}
            rows={5}
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={ROUTES.DASHBOARD}>
          Go Back
        </Link>
      </form>
    </>
  )
}

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation))
