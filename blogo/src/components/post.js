import React, { Component } from 'react';
// import CommentsContainer from "./commentsContainer";

class Post extends Component {
  handleClick = () => { this.props.onClick(this.props.post.id) }

  handleDelete = () => { this.props.onDelete(this.props.post.id) }

  render() {
    return(
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{this.props.post.name}</h4>
        <p onClick={this.handleClick}>{this.props.post.content}</p>
        {/*<CommentsContainer />*/}
      </div>
    )
  }
}

export default Post;