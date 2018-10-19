import React, { Component } from 'react';
import axios from 'axios';
import Post from "./post";
import PostForm from "./postForm";
import update from 'immutability-helper'
import Notification from "./notification";

class PostsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      editingPostId: null,
      notification: '',
      transitionIn: false
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
    this.setState({posts: posts, notification: 'All changes saved', transitionIn: false})
  };

  resetNotification = () => {this.setState({notification: '',transitionIn: true})}

  enableEditing = (id) => {
    this.setState({editingPostId: id}, () => { this.name.focus() })
  };

  deletePost = (id) => {
    axios.delete(`http://localhost:3001/api/v1/posts/${id}`)
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
        <div>
          <button className="newPostButton" onClick={this.addNewPost}>
            New Post
          </button>
          <Notification in={this.transitionIn} notification={this.state.notification} />
        </div>
        {this.state.posts.map((post) => {
          if(this.state.editingPostId === post.id) {
            return(<PostForm post={post} key={post.id} updatePost={this.updatePost}
                             nameRef={input => this.name = input}
                             resetNotification={this.resetNotification}/>)
          } else {
            return (<Post post={post} key={post.id} onClick={this.enableEditing}
                          onDelete={this.deletePost} />)
          }
        })}
      </div>
    );
  }
}

export default PostsContainer;