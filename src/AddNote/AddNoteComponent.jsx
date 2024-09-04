import { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import './AddNote.css'
function AddNoteComponent(props){
    const statusNote = props.statusNote;
    const setStatusNote = props.setStatusNote;
    const note = props.note;
    const setNote = props.setNote;
    const selectedNav = props.selectedNav;
    const[color, setColor] = useState("light-gray");
    const[text, setText] = useState("");

    let date = new Date();
                let month = date.getMonth() + 1;
                let today = date.getDate()
                let year = date.getFullYear()
    let dateToday = `${year}/${String(month).padStart(2, "0")}/${String(today).padStart(2, "0")}`;
           
    function handleColor(event){
                const allColors = document.querySelectorAll(".color");
                const selectedColor = event.target;
                let nameOfColor = selectedColor.getAttribute("class");
                nameOfColor = nameOfColor.split(" ")

                allColors.forEach((colorItem)=>{
                    colorItem.classList.remove("selected-color-add")
                })

                selectedColor.classList.add("selected-color-add");
                setColor(nameOfColor[1])
            }

            function handleText(event){
                const text = event.target.value
                setText(text);   
            }
           

            function handleAddNote(){
                const allColors = document.querySelectorAll(".color");
                const id = "id" + Math.random().toString(16).slice(2);
                const newNote = {
                    "text":text,
                    "date":dateToday,
                    "id": id,
                    "color":color
                }
                
                allColors.forEach((colorItem, index)=>{
                    if(index === 0){
                        colorItem.classList.add("selected-color-add")
                    }
                    else{
                        colorItem.classList.remove("selected-color-add")
                    }

                })
                setNote(prev => [...prev, newNote]);
               
                
            }
          function close(){
            setStatusNote("hideAddNote")
          }

    useEffect(()=>{
        setStatusNote("hideAddNote")
        setText("");
        setColor("lightgray");
    },[selectedNav,note])
   

    return(<div className={`add-note-container ${statusNote}`}>
        <div className='notes-option'>
            <span className='close-icon' onClick={close}><IoClose /></span>
               <div className='color-option'>
                    <span className='select-color'>Select color:</span>
                    <span className='selected-color-add color lightgray' onClick={handleColor}></span>
                    <span className='color skyblue' onClick={handleColor}></span>
                    <span className='color cherry' onClick={handleColor}></span>
                    <span className='color green' onClick={handleColor}></span>
                    <span className='color violet' onClick={handleColor}></span>
                </div>
              
        </div>
        <textarea type='text' className='input-note-text' placeholder='Enter Note...' value={text} onChange={handleText}/>
        <div className='button-save-container'>
                <button onClick={handleAddNote}>
                    Save
                </button>
        </div>
    </div>)
}
export default AddNoteComponent