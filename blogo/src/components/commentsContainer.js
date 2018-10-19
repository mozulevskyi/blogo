import React, { Component } from 'react';
import axios from 'axios';
import Comment from "./comment";
import update from 'immutability-helper'
import CommentForm from "./commentForm";

class CommentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      editingCommentId: null,
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/posts/${this.state.posts.id}/comments.json`)
      .then(response => {
        this.setState({comments: response.data});
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewComment = () => {
    axios.post('http://localhost:3001/api/v1/comments', {comment: {author: '', content: ''}})
      .then(response => {
        const comments = update(this.state.comments, { $splice: [[0, 0, response.data]]})
        this.setState({comments: comments})
      })
      .catch(error => console.log(error))
  };

  updateComment = (comment) => {
    const commentIndex = this.state.comments.findIndex(x => x.id === comment.id)
    const comments = update(this.state.comments, {[commentIndex]: {$set: comment }})
    this.setState({comments: comments})
  };

  render() {
    return (
      <div>
        <button className="newCommentButton" onClick={this.addNewComment}>
          add new comment
        </button>
        {this.state.comments.map((comment) => {
          if(this.state.editingCommentId === comment.id) {
            return(<CommentForm comment={comment} key={comment.id} updateComment={this.updateComment} />)
          } else {
            return (<Comment comment={comment} key={comment.id} />)
          }
        })}
      </div>
    );
  }

}
export default CommentsContainer;