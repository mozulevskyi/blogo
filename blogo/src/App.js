import React, { Component } from 'react';
import './App.css';
import CategoriesContainer from './components/categoriesContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Blogo</h1>
        </div>
        <CategoriesContainer />
      </div>
    );
  }
}

export default App;

