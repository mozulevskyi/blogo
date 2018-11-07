import React, { Component } from 'react';
import axios from 'axios';

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.category.name,
      description: this.props.category.description,
    }
  }

  handleInputName = (e) => {
    this.setState({name: e.target.value})
  };

  handleInputCategory = (e) => {
    this.setState({description: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const category = {name: this.state.name, description: this.state.description}
    axios.put(`http://localhost:3001/categories/${this.props.category.id}`, {category: category})
      .then(response => {
        console.log(response)
        this.props.updateCategory(response.data)
      })
      .catch(error => console.log(error))
  };


  render() {
    return(
      <div className="tile">
        <form>
          <input className="input" type="text" name="name" placeholder="Enter name of the category"
                 value={this.state.name} onChange={this.handleInputName}
                 ref={this.props.nameRef} />
          <input className="input" name="description" placeholder="Enter description"
                 value={this.state.description} onChange={this.handleInputCategory} />
          <button type="submit" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default CategoryForm;