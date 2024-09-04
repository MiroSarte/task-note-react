import './Note.css'
import { IoAdd } from "react-icons/io5";    
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
function NoteComponent(props){
    const notes = props.note;
    const setNote = props.setNote;
    const setStatusNote = props.setStatusNote;
    const setSelectedNote = props.setSelectedNote;
    const setEditNoteStatus = props.setEditNoteStatus;
  

    function handleStatusNote(){
        setStatusNote("showAddNote");
    }
   function deleteNote(index){
      const updateNotes = notes.filter((noteItem, i)=> i !== index);
      setNote(updateNotes);
   }
   function updateNote(index){
    const noteItem = notes[index];
     setSelectedNote(noteItem);
     setEditNoteStatus("showEditNote");
   }
   
    return(
        <div className="note-container">
                <h3>
                    My Notes
                </h3>
                        <ul className='note-list'>
                            {
                                notes.map((noteItem, index)=>
                                    <li className={`note-item ${noteItem.color}`} key={noteItem.id}>
                                       <p className='note-text'>{noteItem.text.length > 200? noteItem.text.slice(0, 190)+"...": noteItem.text}</p>
                                            <span className='note-bottom-container'>
                                                <span className='note-date'>{noteItem.date}</span>
                                                <IoPencil className='note-item-icons edit' onClick={()=> updateNote(index)}/>
                                            <IoTrashOutline className='note-item-icons remove' onClick={()=>deleteNote(index)}/></span>
                                        </li>)
                            }
                           
                            <div className='add-notes' onClick={handleStatusNote}>
                               <IoAdd className='add-icon'/>
                            </div>
                        </ul>
        </div>
    )
}
export default NoteComponent;