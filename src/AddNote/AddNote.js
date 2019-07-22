import React from 'react';
import ValidationError from './ValidationError';
import './AddNote.css';
import config from '../config';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },

      content: {
        value: '',
        touched:false
      },

      folder: {
        value: '',
        touched: false
      }

    };
  }

  updateNote(name) {
    this.setState({name: {value: name, touched: true}});
  }


  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }

  handleNewNote = (event) => {
    event.preventDefault();
    const { name } = this.state;
   
    console.log('Name: ', name.value);
  
    fetch(`${config.API_ENDPOINT},/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok)
          return response.json().then(e => Promise.reject(e))
        return response.json()
      })
      .then(() => {
        this.context.addNote({ name })
        // allow parent to perform extra behaviour
        this.props.onAddNote({ name })
      })
      .catch(error => {
        console.error({ error })
      })
  }
  
  render() {
    return (
      
      <form className="addFolder" onSubmit={e => this.handleNewNote(e)}>
      <h2>Create a New Note</h2>
   
      <div className="form-group">
        <label htmlFor="name">Name of Note</label>
        <input 
          type="text" 
          className="addFolder__control"
          name="name" 
          id="name" 
          onChange={e => this.updateNote(e.target.value)} />
          {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
          )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Content</label>
        <input 
          type="text" 
          className="addFolder__control"
          name="name" 
          id="name" 
          onChange={e => this.updateNote(e.target.value)} />
          {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
          )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Destination Folder</label>
        <input 
          type="text" 
          className="addFolder__control"
          name="name" 
          id="name" 
          onChange={e => this.updateNote(e.target.value)} />
          {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
          )}
      </div>

      <div className="addNote__button__group">
       <button 
          type="submit" 
          className="submit__button"
          disabled={this.validateName()}
          onClick={this.handleNewNote}
       >
           Create
       </button>
      </div>
    </form>

    
    
    );
  };
}

export default AddNote;