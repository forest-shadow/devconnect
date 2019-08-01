import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { AppState } from '../../store'
import { PostState } from '../../reducers/post'

interface Props {
  getPosts: CallableFunction
  post: PostState
}

const Posts: React.FC<Props> = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return <div></div>
}

const mapStateToProps = (state: AppState) => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
