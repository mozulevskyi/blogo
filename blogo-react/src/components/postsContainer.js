import React, { Component } from 'react';
import axios from 'axios';
import Post from "./post";
import PostForm from "./postForm";
import update from 'immutability-helper'

class PostsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      editingPostId: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/categories/${this.props.category.id}/posts.json` )
    .then(response => {
      this.setState({ posts: response.data });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  };

  addNewPost = () => {
    axios.post(`http://localhost:3001/categories/${this.props.category.id}/posts`, {post: {name: '', content: ''}})
      .then(response => {
        const posts = update(this.state.posts, { $splice: [[0, 0, response.data]]})
        this.setState({posts: posts, editingPostId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updatePost = (post) => {
    const postIndex = this.state.posts.findIndex(x => x.id === post.id)
    const posts = update(this.state.posts, {[postIndex]: {$set: post }})
    this.setState({posts: posts, editingPostId: false})
  };

  enableEditing = (id) => {
    this.setState({editingPostId: id}, () => { this.name.focus() })
  };

  deletePost = (id) => {
    axios.delete(`http://localhost:3001/categories/${this.props.category.id}/posts/${id}`)
      .then(response => {
        const postIndex = this.state.posts.findIndex(x => x.id === id)
        const posts = update(this.state.posts, { $splice: [[postIndex, 1]]})
        this.setState({posts: posts})
      })
      .catch(error => console.log(error))
  };

  render() {
    return (
      <div>
        {this.state.posts.map((post) => {
          if(this.state.editingPostId === post.id) {
            return(<PostForm category={this.props.category} post={post} key={post.id} updatePost={this.updatePost}
                             nameRef={input => this.name = input} />)
          } else {
            return (<Post category={this.props.category} post={post} key={post.id} onClick={this.enableEditing}
                          onDelete={this.deletePost} />)
          }
        })}
        <div>
          <button className="newPostButton" onClick={this.addNewPost}>
            New Post
          </button>
        </div>
      </div>
    );
  }
}

export default PostsContainer;