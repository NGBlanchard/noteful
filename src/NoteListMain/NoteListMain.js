import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import { getNotesForFolder } from '../notes-helpers'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;
  
  render() {
    const error = this.context.error
          ? <div className="noteful_app__error">{this.context.error}</div> : "";

          const { folderid } = this.props.match.params
          const { notes=[] } = this.context
          const notesForFolder = getNotesForFolder(notes, folderid)
  return (
    <section className='NoteListMain'>
      <div className="error_message">
        {error}
      </div>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
              content={note.content}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
}}

NoteListMain.defaultProps = {
  notes: [],
}

NoteListMain.propTypes = {
  value: PropTypes.array,
}