import React, { Component } from 'react';
import PostsContainer from "./postsContainer";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

class Category extends Component {
  handleClick = () => { this.props.onClick(this.props.category.id) }

  handleDelete = () => { this.props.onDelete(this.props.category.id) }

  render() {
    return(
      <div>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <span className="catDelButton" onClick={this.handleDelete}>🗑</span>
              <h4 className="catName" onClick={this.handleClick}>{this.props.category.name}</h4>
              <p className="catDes" onClick={this.handleClick}>{this.props.category.description}</p>
            </AccordionItemTitle>
            <AccordionItemBody>
              <PostsContainer category={this.props.category} />
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}

export default Category;