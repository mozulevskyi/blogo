import React, { Component } from 'react';
import PostsContainer from "./postsContainer";

class Category extends Component {
  handleClick = () => { this.props.onClick(this.props.category.id) }

  handleDelete = () => { this.props.onDelete(this.props.category.id) }

  render() {
    return(
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{this.props.category.name}</h4>
        <p onClick={this.handleClick}>{this.props.category.description}</p>
        <div>
          <PostsContainer category={this.props.category} />
        </div>
      </div>
    )
  }
}

export default Category;