import React from 'react';
import ValidationError from '../ValidationError';
import './AddNote.css';
import config from '../config';
import NotefulContext from '../NotefulContext';


class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }
    };
    this.contentInput = React.createRef();
  }

  static contextType = NotefulContext;


  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Folder name is required';
    } 
  }

  handleNewNote = event => {
    event.preventDefault();
    const data = {
      name: this.state.name.value,
      content: this.contentInput.current.value,
      folderId: event.target.folderClassId.value,
      modified: new Date()
  };
   
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(!response.ok)
        return response.json().then(e => Promise.reject(e))
        return response.json()
    })
    .then((response) => {
      this.context.addNote(response)
    })
    .then(() => {
      this.props.history.push('/')
    })
      .catch(error => {
        console.error(error)
      })
  }

  
  render() {
    const { folders=[] } = this.context;
    return (
      <form className="addNote" onSubmit={e => this.handleNewNote(e)}>
      <h2>Create a New Note</h2>
   
      <div className="form-group">
        <label htmlFor="name">Name of Note</label>
        <input 
          type="text" 
          className="noteName"
          name="name" 
          id="name" 
          onChange={e => this.updateName(e.target.value)} />
          {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
          )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Content</label>
        <input 
          type="text" 
          className="addNote__control"
          name="Content" 
          id="Content" 
          ref= {this.contentInput} />
      </div>

      <div className="form-group">
        <label htmlFor="folderClass">Destination Folder</label>
        <select id="folderClassId" name="folderClassId" >
           {folders.map((folder) => 
            <option key={folder.id} value={folder.id}>
                {folder.name}
            </option>
            )}
        </select>
      </div>

      <div className="addNote__button__group">
          <button 
            disabled={this.validateName()}
            type="submit" 
            className="submit__button"
          >
           Create
          </button>
     
      </div>
    </form>

    
    
    );
  };
}

export default AddNote;