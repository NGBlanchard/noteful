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
      },
      content: {
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

  updateContent(content) {
    this.setState({content: {value: content, touched: true}});
  }

  validateContent(fieldValue) {
    const content = this.state.content.value.trim();
    if (!content) {
      return 'Content  is required';
    } 
  }

  handleNewNote = event => {
    event.preventDefault();
    const data = {
      name: this.state.name.value,
      modified: new Date(),
      content: this.contentInput.current.value,
      folderid: event.target.folderClassId.value
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
          ref= {this.contentInput}
          onChange={e => this.updateContent(e.target.value)} />
          {this.state.content.touched && (
          <ValidationError message={this.validateContent()} />
          )}
      </div>

      <div className="form-group">
        <label htmlFor="folderClass">Destination Folder</label>
        <select id="folderClassId" name="folderClassId" >
           {folders.map((folder) => 
            <option key={folder.id} value={folder.id}>
                {folder.foldername}
            </option>
            )}
        </select>
      </div>

      <div className="addNote__button__group">
          <button 
            disabled={this.validateName() || this.validateContent()} 
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