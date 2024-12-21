"use client";
import React, { useState, useEffect } from "react";
import "./note.css";

export default function Notes1() {
  const [NoteTitle, setNoteTitle] = useState("");
  const [NoteDetails, setNoteDetails] = useState("");
  const [Tag, setTag] = useState("");
  const [tempTags, setTempTags] = useState([]);
  const [Color, setColor] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [Edit, setEdit] = useState(null);
  const [SearchTag, setSearchTag] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);

  const colors = [
    "#4A593D",
    "#6C8672",
    "#8BA382",
    "#D99E73",
    "#F2C78F",
    "#FF5E57",
    "#D9534F",
    "#A9C1A9",
  ];

  useEffect(() => {
    fetchNotes();
    console.log(Notes);
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost/web_project_bfcai/getNotes.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      title: NoteTitle,
      details: NoteDetails,
      tags: tempTags.join(","),
      color: Color,
    };

    try {
      if (Edit !== null) {
        newNote.Nid = Notes[Edit].Nid;
        await fetch("http://localhost/web_project_bfcai/updateNote.php", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });
      } else {
        await fetch("http://localhost/web_project_bfcai/addNote.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });
      }

      fetchNotes();
      resetForm();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNote = async (index) => {
    const Nid = Notes[index].Nid;
    try {
      await fetch("http://localhost/web_project_bfcai/deleteNote.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nid }),
      });

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (index) => {
    const note = Notes[index];
    setNoteTitle(note.title);
    setNoteDetails(note.details);
    setTempTags(note.tags.split(","));
    setColor(note.color);
    setEdit(index);
    setModalOpen(true);
  };

  const resetForm = () => {
    setNoteTitle("");
    setNoteDetails("");
    setTag("");
    setTempTags([]);
    setColor(null);
    setEdit(null);
  };

  const ButtonTag = () => {
    if (Tag) {
      setTempTags([...tempTags, Tag]);
      setTag("");
    }
  };

  const deleteTempTag = (tagIndex) => {
    setTempTags(tempTags.filter((_, index) => index !== tagIndex));
  };

  const filteredNotes = Notes.filter((note) =>
    note.tags.toLowerCase().includes(SearchTag.toLowerCase())
  );

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
        <button
          className="open-modal-button"
          onClick={() => setModalOpen(true)}
        >
          Add New Note
        </button>
      </div>

      {ModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
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
                placeholder="Add Details of Note..."
                className="details"
              />
              <div className="tags">
                <input
                  type="text"
                  value={Tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Tag #.."
                  className="add-tag"
                />
                <button
                  type="button"
                  onClick={ButtonTag}
                  className="tag-button"
                >
                  Add Tag
                </button>
              </div>
              <div className="tag-list">
                {tempTags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => deleteTempTag(index)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="palette ">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setColor(color)}
                    style={{
                      backgroundColor: color,
                      border: Color === color ? "3px solid black" : "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
              <div className="edit-buttons">
                <button
                  className=" bg-red-400 py-2 px-4 font-bold  rounded-lg hover:bg-red-500 hover:text-white duration-[0.5s]"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Back
                </button>
                <button
                  className="bg-emerald-500 font-bold hover:bg-emerald-700 duration-[0.5s] py-2 px-4 rounded-lg "
                  type="submit"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className=" grid grid-cols-5">
        {filteredNotes.map((note, index) => (
          <div
            key={index}
            style={{ backgroundColor: note.color }}
            className="card"
          >
            <h2>{note.title}</h2>
            <p>{note.details}</p>
            <div className=" inline">
              {note.tags.split(",").map((tag, i) => (
                <span key={i}>#{tag} </span>
              ))}
            </div>
            <div className=" flex justify-center">
              <button onClick={() => editNote(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
