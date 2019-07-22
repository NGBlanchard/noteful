import React from 'react';
import ValidationError from './ValidationError';
import './AddFolder.css';
import config from '../config';
import NotefulContext from '../NotefulContext';


class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }
    };
  }
  static contextType = NotefulContext;

  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Folde name is required';
    } else if (name.length < 3) {
      return 'Folder name must be at least 3 characters long';
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
   
    console.log('Name: ', data.name.value);
  
  fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name.value,
    })
  })
      .then(response => response.json())
      // .then(() => {
      //   this.context.addFolder(data.name.value)
      // //   //ADD NOTE TO CONTEXT OBJECT
      // })
      .catch(error => {
        console.error({ error })
      });
    }
  
  render() {
    return (
      
      <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
      <h2>Create a New Folder</h2>
   
      <div className="form-group">
        <label htmlFor="name">Name of Folder</label>
        <input 
          type="text" 
          className="addFolder__control"
          name="name" 
          id="name" 
          onChange={e => this.updateName(e.target.value)} />
          {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
          )}
      </div>

      <div className="addFolder__button__group">
       <button 
          type="submit" 
          className="submit__button"
          disabled={this.validateName()}
          onClick={this.handleSubmit}
       >
           Create
       </button>
      </div>
    </form>
  
    );
  };
}



export default AddFolder;