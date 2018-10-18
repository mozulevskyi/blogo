import React, { Component } from 'react';
import './App.css';
import PostsContainer from './components/postsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Test Blog</h1>
        </div>
        <PostsContainer />
      </div>
    );
  }
}

export default App;

