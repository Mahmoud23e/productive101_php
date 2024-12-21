'use client';
import React, { useState } from "react";
import './note.css';

export default function Notes1() {
  const [NoteTitle, setNoteTitle] = useState('');
  const [NoteDetails, setNoteDetails] = useState('');
  const [Tag, setTag] = useState('');
  const [tempTags, setTempTags] = useState([]); // Temporary tag storage
  const [Color, setColor] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [Edit, setEdit] = useState(null);
  const [SearchTag, setSearchTag] = useState('');
  const [ModalOpen, setModalOpen] = useState(false); // Control modal state

  const colors = [  
    '#4A593D', 
    '#6C8672',
    '#8BA382',  
    '#D99E73', 
    '#F2C78F',
    '#FF5E57',
    '#D9534F', 
    '#A9C1A9'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title: NoteTitle,
      details: NoteDetails,
      tags: tempTags, // Add tempTags to the note
      color: Color,
      time: new Date().toLocaleTimeString(), 
    };

    if (Edit !== null) {
      const updatedNotes = Notes.map((note, index) =>
        index === Edit ? newNote : note
      );
      setNotes(updatedNotes);
      setEdit(null);
    } else {
      setNotes([...Notes, newNote]);
    }

    // Clear fields after submission
    setNoteTitle('');
    setNoteDetails('');
    setTag('');
    setColor(null);
    setTempTags([]); // Clear tempTags after saving the note
    setModalOpen(false); // Close modal after submission
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const deleteNote = (index) => {
    const newNotes = Notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index) => {
    const note = Notes[index];
    setNoteTitle(note.title);
    setNoteDetails(note.details);
    setTempTags(note.tags); // Set tags for editing
    setColor(note.color);
    setEdit(index);
    setModalOpen(true); // Open modal for editing
  };

  const filteredNotes = Notes.filter(note =>
    note.tags.some(tag => tag.toLowerCase().includes(SearchTag.toLowerCase()))
  );

  const ButtonTag = () => {
    if (Tag) {
      setTempTags([...tempTags, Tag]); // Add to tempTags
      setTag(''); // Clear the input field after adding the tag
    }
  };

  const deleteTempTag = (tagIndex) => {
    setTempTags(tempTags.filter((_, index) => index !== tagIndex));
  };

  return (
    <>
      <div className="search-bar"> 
        <input 
          className="search" 
          type="text" 
          placeholder="Search by Tag" 
          value={SearchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        />
        <button className="open-modal-button" onClick={() => setModalOpen(true)}>Add New Note</button>
      </div>

      {ModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="all">
                <input 
                  type="text" 
                  value={NoteTitle} 
                  onChange={(e) => setNoteTitle(e.target.value)} 
                  placeholder="Note Title..." 
                  className="note-title" 
                />
                <textarea 
                  value={NoteDetails} 
                  onChange={(e) => setNoteDetails(e.target.value)} 
                  placeholder="Add Details of Note.." 
                  className="details"
                />
              </div>

              <div className="tags">
                <input 
                  type="text" 
                  value={Tag} 
                  onChange={(e) => setTag(e.target.value)} 
                  placeholder="Tag #.." 
                  className="add-tag" 
                />
                <button type="button" 
                  className="tag-button"
                  onClick={ButtonTag}
                >
                  Add Tag
                </button>

                {/* Display the tempTags */}
                <div className="tag-list">
                  {tempTags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="tag-item">
                      <span>#{tag}</span>
                      <button type="button" onClick={() => deleteTempTag(tagIndex)}>X</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="palette">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    onClick={() => handleColor(color)}
                    style={{
                      backgroundColor: color,
                      border: Color === color ? '3px solid black' : 'none',
                      width: '40px', 
                      height: '40px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'inline-block'
                    }}
                  />
                ))}
              </div>

              <div className="edit-buttons">
                <button type="button" className="close" onClick={() => setModalOpen(false)}>Back</button>
                <button type="submit" className="done">Done</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {filteredNotes.map((note, index) => (
          <div key={index} style={{ backgroundColor: note.color }} className="card">
            <h2 className="h2">{note.title}</h2>
            <hr className="divide"/>
            <p className="p">{note.details}</p>
            <div>
              {note.tags.map((tag, tagIndex) => (
                <span key={tagIndex} style={{ marginRight: "10px", fontWeight: "normal"}}>
                  #{tag} 
                </span>
              ))}
            </div>
            <div className="div2">
              <div className="time">
                <p>{note.time}</p> 
              </div>
              <div className="But-ED">
                <button className="delete" onClick={() => deleteNote(index)}>Delete</button>
                <button className="edit" onClick={() => editNote(index)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
