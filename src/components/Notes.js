import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

//useRef to reference an element

const Notes = (props)=>{
    
    const context = useContext(noteContext);
    const { notes,getNotes,editNote } = context;

    const ref = useRef(null);
    const refClose = useRef(null);
    let navigate = useNavigate();

    const [note,setNote] = useState({id: "",etitle: "", edescription: "",etag: ""}) 
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    },[])

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag});
    }

    const handleClick = (e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
    Update Note
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" minLength={5} required id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"
                onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" minLength={5} required id="edescription" name="edescription" value={note.edescription}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">TAG</label>
                <input type="text" className="form-control" required id="etag" name="etag" value={note.etag}  onChange={onChange}/>
            </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary">Update Note</button>
        </div>
        </div>
    </div>
    </div>

    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container mx-2">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note)=>{
        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
      })}
    </div>
    </>
  )
}

export default Notes;
