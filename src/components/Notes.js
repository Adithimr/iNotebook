import React, { useContext, useEffect, useRef,useState} from "react";
import { Noteitem } from "./Noteitem";
import { AddNote } from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNote,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote,id) => {
      ref.current.click();
      // updateNote(note.id, note.etitle, note.edescription, note.etag)
      setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    };

  const addClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully","success")
  }
  const onChange = (e) =>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"

        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
              onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription" name="edescription" value={note.edescription}
             onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag" name="etag" value={note.etag}
              onChange={onChange} minLength={3} required/>
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button" ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3}  onClick={addClick} type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};
 export default Notes;