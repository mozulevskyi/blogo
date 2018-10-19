import React, { Component } from 'react';

class FormErrors extends Component {
  render() {
    return(
      <div className='formErrors'>
        {Object.keys(formErrors).map((name, i) => {
          if (formErrors[name].length > 0) {
            return (
              <p key={i}>{name} {formErrors[fieldName]}</p>
            )
          } else {
            return '';
          }
        })}
      </div>
    )
  }
}

export default FormErrors;