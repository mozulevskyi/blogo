import React, { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.post.name,
      content: this.props.post.content,
      // formErrors: {name: ''},
      // nameValid: false,
      // formValid: false
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  };

  handleBlur = () => {
    const post = {name: this.state.name, content: this.state.content}
    axios.put(`http://localhost:3001/api/v1/posts/${this.props.post.id}`, {post: post})
      .then(response => {
        console.log(response)
        this.props.updatePost(response.data)
      })
      .catch(error => console.log(error))
  }


    render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className="input" type="text" name="name" placeholder="Enter name of the post"
            value={this.state.name} onChange={this.handleInput}
            ref={this.props.nameRef} />
          <textarea className="input" name="content" placeholder="Enter content"
            value={this.state.content} onChange={this.handleInput} ></textarea>
        </form>
      </div>
    );
  }
}

export default PostForm;

