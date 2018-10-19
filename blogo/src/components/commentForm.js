import React, { Component } from 'react';
import axios from "axios";

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.comment.author,
      content: this.props.comment.content,
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  handleBlur = () => {
    const comment = {author: this.state.author, content: this.state.content}
    axios.put(`http://localhost:3001/api/v1/comments/${this.props.comments.id}`, {comment: comment})
      .then(response => {
        console.log(response)
        this.props.updateComment(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className="input" type="text" name="author" placeholder="Enter name of the post"
                 value={this.state.author} onChange={this.handleInput}
                 ref={this.props.nameRef} />
          <textarea className="input" name="content" placeholder="Enter content"
                    value={this.state.content} onChange={this.handleInput} ></textarea>
        </form>
      </div>
    );
  }

}

export default CommentForm;