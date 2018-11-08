import React, { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.post.name,
      content: this.props.post.content,
    }
  }

  handleInputName = (e) => {
    this.setState({name: e.target.value})
  };

  handleInputContent = (e) => {
    this.setState({content: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const post = {name: this.state.name, content: this.state.content}
    axios.put(`http://localhost:3001/categories/${this.props.category.id}/posts/${this.props.post.id}`, {post: post})
      .then(response => {
        console.log(response)
        this.props.updatePost(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form>
          <input className="input" type="text" name="name" placeholder="Enter name of the post"
            value={this.state.name} onChange={this.handleInputName}
            ref={this.props.nameRef} />
          <input className="input" name="content" placeholder="Enter content"
            value={this.state.content} onChange={this.handleInputContent} />
          <button type="submit" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default PostForm;

