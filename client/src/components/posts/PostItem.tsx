import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'
import { IPost } from '../../interfaces/post'
import { AuthState } from '../../reducers/auth'
import { AppState } from '../../store'

import { likePost, unlikePost } from '../../actions/post'

interface Props {
  post: IPost
  auth: AuthState
  likePost: CallableFunction
  unlikePost: CallableFunction
}

const PostItem: React.FC<Props> = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  likePost,
  unlikePost
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button onClick={() => likePost(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button onClick={() => unlikePost(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={ROUTES.POST.ITEM(_id)} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && auth.user && user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { likePost, unlikePost }
)(PostItem)
