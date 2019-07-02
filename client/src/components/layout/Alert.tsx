import React from 'react'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import { IAlert } from '../../interfaces/alert'

interface AlertProps {
  alerts: IAlert[]
}

const Alert: React.FC<AlertProps> = ({ alerts }) => {
  return alerts !== null && alerts.length > 0 ? (
    <>
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      ))}
    </>
  ) : (
    <></>
  )
}

const mapStateToProps = (state: AppState) => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
