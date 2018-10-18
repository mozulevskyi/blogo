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
      editingPostId: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/posts.json' )
    .then(response => {
      this.setState({ posts: response.data });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  };

  addNewPost = () => {
    axios.post('http://localhost:3001/api/v1/posts', {post: {name: '', content: ''}})
      .then(response => {
        const posts = update(this.state.posts, { $splice: [[0, 0, response.data]]})
        this.setState({posts: posts, editingPostId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updatePost = (post) => {
    const postIndex = this.state.posts.findIndex(x => x.id === post.id)
    const posts = update(this.state.posts, {[postIndex]: {$set: post }})
    this.setState({posts: posts})
  }

  render() {
    return (
      <div>
        <div>
          <button className="newPostButton" onClick={this.addNewPost}>
            New Post
          </button>
        </div>
        {this.state.posts.map((post) => {
          if(this.state.editingPostId === post.id) {
            return(<PostForm post={post} key={post.id} updatePost={this.updatePost}/>)
          } else {
            return (<Post post={post} key={post.id}/>)
          }
        })}
      </div>
    );
  }
}

export default PostsContainer;