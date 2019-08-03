import React, { useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { addExperience } from '../../actions/profile'
import { HTMLFormInputElements } from '../../interfaces/form'

interface Props extends RouteComponentProps {
  addExperience: CallableFunction
}

export interface AddExperienceForm {
  company: string
  title: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
}

const initialState: AddExperienceForm = {
  company: '',
  title: '',
  location: '',
  from: '',
  to: '',
  current: false,
  description: ''
}

const AddExperience: React.FC<Props> = ({ addExperience, history }) => {
  const [formData, setFormData] = useState(initialState)
  const { company, title, location, from, to, current, description } = formData

  const [dateToDisabled, toggleDisabled] = useState(false)

  const onChange = (e: React.FormEvent<HTMLFormInputElements>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault()
          addExperience(formData, history)
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            placeholder="Job Description"
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
  { addExperience }
)(withRouter(AddExperience))
