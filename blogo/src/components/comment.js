import React, { Component } from 'react';

class Comment extends Component {

  render() {
    return(
      <div className="tile">
        <h4>{this.props.comment.author}</h4>
        <p>{this.props.comment.content}</p>
      </div>
    )
  }
}

export default Comment;