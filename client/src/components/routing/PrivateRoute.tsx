import React, { ComponentPropsWithoutRef, ComponentType } from 'react'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { AppState } from '../../store'
import { AuthState } from '../../reducers/auth'
import { Redirect, Route } from 'react-router'

interface Props extends ComponentPropsWithoutRef<ComponentType<any>> {
  auth: AuthState
  component: ComponentType<any>
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to={ROUTES.LOGIN} />
      ) : (
        <Component {...props} />
      )
    }
  />
)

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
