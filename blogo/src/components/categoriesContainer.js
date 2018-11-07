import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Category from './category';
import CategoryForm from './categoryForm';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      editingCategoryId: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/categories.json' )
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewCategory = () => {
    axios.post('http://localhost:3001/categories', {category: {name: '', description: ''}})
      .then(response => {
        const categories = update(this.state.categories, { $splice: [[0, 0, response.data]]})
        this.setState({categories: categories, editingCategoryId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updateCategory = (category) => {
    const categoryIndex = this.state.categories.findIndex(x => x.id === category.id)
    const categories = update(this.state.categories, {[categoryIndex]: {$set: category }})
    this.setState({categories: categories, editingCategoryId: false})
  };

  enableEditing = (id) => {
    this.setState({editingCategoryId: id}, () => { this.name.focus() })
  };

  deleteCategory = (id) => {
    axios.delete(`http://localhost:3001/categories/${id}`)
      .then(response => {
        const categoryIndex = this.state.categories.findIndex(x => x.id === id)
        const categories = update(this.state.categories, { $splice: [[categoryIndex, 1]]})
        this.setState({categories: categories})
      })
      .catch(error => console.log(error))
  };

  render() {
    return (
      <div>
        {this.state.categories.map((category) => {
          if(this.state.editingCategoryId === category.id) {
            return(<CategoryForm category={category} key={category.id} updateCategory={this.updateCategory}
                             nameRef={input => this.name = input} />)
          } else {
            return (<Category category={category} key={category.id} onClick={this.enableEditing}
                          onDelete={this.deleteCategory} />)
          }
        })}
        <div>
          <button className="newCategoryButton" onClick={this.addNewCategory}>
            Add Category
          </button>
        </div>
      </div>
    );
  }
}

export default CategoriesContainer;

