import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { match, Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { getPost } from '../../actions/post'
import { AppState } from '../../store'
import { PostState } from '../../reducers/post'

import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

interface Props {
  getPost: CallableFunction
  post: PostState
  isAuthenticated: boolean
  match: match<{ id: string }>
}

const Post: React.FC<Props> = ({
  post: { post, loading },
  isAuthenticated,
  getPost,
  match
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getPost(match.params.id)
    }
  }, [getPost, match.params.id, isAuthenticated])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to={ROUTES.POSTS} className="btn btn-light">
        Back To Posts
      </Link>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
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
  { getPost }
)(Post)
