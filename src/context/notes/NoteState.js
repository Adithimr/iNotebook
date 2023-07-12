import noteContext from "./noteContext";
import {useState} from "react"

const NoteState = (props) => {
  const host = "http://localhost:5000" 
  const notesInitial = []
const [notes, setNotes] = useState(notesInitial)

//Get a note
const getNote = async() =>{
  //API call
  const response = await fetch(`${host}/api/notes/fetchnotes`, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "auth-token":localStorage.getItem('token')
   },
 });
const json = await response.json();
 setNotes(json)
}


//Add a note
const addNote = async(title, description, tag) =>{
   //API call
   const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag}),
  });
const note = await response.json()
  setNotes(notes.concat(note))                             
}

//Delete a note
const deleteNote = async (id) =>{
  //API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify(),
  });
  const json =  response.json();
  console.log(json);
  const newNote = notes.filter((note)=>{return note._id !== id})
  setNotes(newNote)
}

//upate a note
const editNote = async (id, title, description, tag) => {
  //API fetch
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token'),
    },
    body: JSON.stringify({ title, description, tag }),
  });
  const json = await response.json();
  console.log(json)
  
  //to update the front end
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index]
    if(element._id === id){
      notes[index].title = title;
      notes[index].description = description;
      notes[index].tag = tag;
      break;
    }
  }
  getNote(notes);
}
return(
    <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
        {props.children}
    </noteContext.Provider>
)
}
export default NoteState;