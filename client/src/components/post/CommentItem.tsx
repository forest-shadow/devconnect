import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import ROUTES from '../../constants/routes'
import { deleteComment } from '../../actions/post'
import { PostComment } from '../../interfaces/post'
import { AppState } from '../../store'
import { AuthState } from '../../reducers/auth'

interface Props {
  postId: string
  comment: PostComment
  deleteComment: CallableFunction
  auth: AuthState
}

const CommentItem: React.FC<Props> = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  deleteComment,
  auth
}) => {
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={ROUTES.PROFILE.ITEM(user)}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YYY">{date}</Moment>
          </p>
          {!auth.loading && auth.user && user === auth.user._id && (
            <button
              onClick={() => deleteComment(postId, _id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
