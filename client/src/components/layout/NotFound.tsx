import React from 'react'

const NotFound: React.FC = () => (
  <>
    <h1 className="x-large text-primary">
      <i className="fas fa-exclamation-triangle"/>
      <span>Page Not Found</span>
    </h1>
    <p className="large">Sorry, this page does not exist</p>
  </>
)

export default NotFound
