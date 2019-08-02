import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

interface Props {
  addPost: CallableFunction
}

const PostForm: React.FC<Props> = ({ addPost }) => {
  const [text, setText] = useState('')
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault()
          addPost({ text })
          setText('')
        }}
      >
        <textarea
          name="text"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

export default connect(
  null,
  { addPost }
)(PostForm)
