import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getPosts } from '../../actions/post'
import { AppState } from '../../store'
import { PostState } from '../../reducers/post'

import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

interface Props {
  getPosts: CallableFunction
  post: PostState
  isAuthenticated: boolean
}

const Posts: React.FC<Props> = ({
  post: { posts, loading },
  isAuthenticated,
  getPosts
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getPosts()
    }
  }, [getPosts, isAuthenticated])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} showActions />
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
