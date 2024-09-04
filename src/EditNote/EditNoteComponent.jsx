import { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import "./EditNote.css"
function EditNoteComponent(props){
    const editNoteStatus = props.editNoteStatus;
    const notes = props.note;
    const selectedNote = props.selectedNote;
    const setEditNoteStatus = props.setEditNoteStatus;
    const setSelectedNote = props.setSelectedNote;
    let date = new Date();
    let month = date.getMonth() + 1;
    let today = date.getDate()
    let year = date.getFullYear()
    let dateToday = `${year}/${String(month).padStart(2, "0")}/${String(today).padStart(2, "0")}`;
    const [text, setText] = useState("");
    const[color, setColor] = useState("");

    useEffect(()=>{
        setText(selectedNote.text);
        const allColors = document.querySelectorAll(".color-edit");

        allColors.forEach((colorItem)=>{
            colorItem.classList.remove("selected-color-edit");
        })
        allColors.forEach((colorItem)=>{
            const colorItemClassArr = colorItem.getAttribute("class").split(" ");
            const colorName = colorItemClassArr[1];
            if(colorName === selectedNote.color){
                   colorItem.classList.add("selected-color-edit");
            }
            
        })

    },[selectedNote])
    
    function handleEditText(event){
         setText(event.target.value);
    }
    function handleColor(event){
        const allColors = document.querySelectorAll(".color-edit");
        const selectedColor = event.target;
        let nameOfColor = selectedColor.getAttribute("class");
        nameOfColor = nameOfColor.split(" ")

        allColors.forEach((colorItem)=>{
            colorItem.classList.remove("selected-color-edit")
        })

        selectedColor.classList.add("selected-color-edit");
        setColor(nameOfColor[1])
    }
   
    function close(){
        console.log("close");
        setText("")
        setSelectedNote({});
        setEditNoteStatus("hideEditNote");
      }

      function handleEdit(){
       notes.forEach((noteItem)=>{
        console.log(noteItem.id)
            if (noteItem.id === selectedNote.id) {
                noteItem.text = text;
                noteItem.date = dateToday;
                noteItem.color = color;
            }
        })
        close()
      }
   
  

    return(<div className={`edit-note-container ${editNoteStatus}`}>
        <div className='notes-option'>
            <span className='close-icon' onClick={close}><IoClose /></span>
               <div className='color-option'>
                    <span className='select-color'>Select color:</span>
                    <span className='selected-color-edit color-edit lightgray' onClick={handleColor}></span>
                    <span className='color-edit skyblue' onClick={handleColor}></span>
                    <span className='color-edit cherry' onClick={handleColor} ></span>
                    <span className='color-edit green' onClick={handleColor} ></span>
                    <span className='color-edit violet'  onClick={handleColor}></span>
                </div>
              
        </div>
        <textarea type='text' className='input-note-text' placeholder='Enter Note...' value={text} onChange={handleEditText}/>
        <div className='button-save-container' >
                <button onClick={handleEdit}>
                    Save
                </button>
        </div>
    </div>)
}
export default EditNoteComponent