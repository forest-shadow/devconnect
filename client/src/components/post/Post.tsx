import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { match, Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { getPost } from '../../actions/post'
import { AppState } from '../../store'
import { PostState } from '../../reducers/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'

interface Props {
  getPost: CallableFunction
  post: PostState
  match: match<{ id: string }>
}

const Post: React.FC<Props> = ({ post: { post, loading }, getPost, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to={ROUTES.POSTS}>Back To Posts</Link>
      <PostItem post={post} />
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
