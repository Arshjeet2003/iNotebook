import { useState } from "react";
import NoteContext from './noteContext';  

const NoteState = (props)=>{

    const host = "http://localhost:5000"

    const [notes,setNotes] = useState([]);

    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMTY1MTZlNGE1NzViNzNlYzc0ZTEwIn0sImlhdCI6MTY5Nzc4NDk3OH0.xXh0sowFbxLsN9xjKsdn-zDJ7Ls8tqupAKTMVk_IpK4'
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMTY1MTZlNGE1NzViNzNlYzc0ZTEwIn0sImlhdCI6MTY5Nzc4NDk3OH0.xXh0sowFbxLsN9xjKsdn-zDJ7Ls8tqupAKTMVk_IpK4'
            },
            body: JSON.stringify({title,description,tag})
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMTY1MTZlNGE1NzViNzNlYzc0ZTEwIn0sImlhdCI6MTY5Nzc4NDk3OH0.xXh0sowFbxLsN9xjKsdn-zDJ7Ls8tqupAKTMVk_IpK4'
            }
        });
        const json =  await response.json();
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
    }

    const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMTY1MTZlNGE1NzViNzNlYzc0ZTEwIn0sImlhdCI6MTY5Nzc4NDk3OH0.xXh0sowFbxLsN9xjKsdn-zDJ7Ls8tqupAKTMVk_IpK4'
            },
            body: JSON.stringify({title,description,tag})
        });
        const json =  await response.json();
        let newNotes = await JSON.parse(JSON.stringify(notes))
        for(let index=0; index<newNotes.length; index++){
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;