import React from 'react';
import ValidationError from '../ValidationError';
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
      return 'Folder name is required';
    } else if (name.length < 3) {
      return 'Folder name must be at least 3 characters long';
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
  
  fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        foldername: data.name.value,
    })
  })
      .then(response => {
        if(!response.ok)
        return response.json().then(err => {
          console.log(err)
          throw err
        })
        return response.json()
      })
      .then((response) => {
        this.context.addFolder(response)
      })
      .then(() => {
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
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
          className="folderName"
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
          className="addFolderButton"
          disabled={this.validateName()}
       >
           Create
       </button>
      </div>
    </form>
  
    );
  };
}



export default AddFolder;