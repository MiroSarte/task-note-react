
import { useState } from 'react'
import SearchComponent from './Search/SearchComponent.jsx';
import GreetingComponent from './Greeting/GreetingComponent.jsx';
import NavigationComponent from './Navigation/NavComponent.jsx'
import TaskComponent from './Task/TaskComponent.jsx'
import AddTaskComponent from './AddTask/AddTaskComponent.jsx';
import NoteComponent from './Note/NoteComponent.jsx';
import AddNoteComponent from './AddNote/AddNoteComponent.jsx';
import EditNoteComponent from './EditNote/EditNoteComponent.jsx';
function App() {
 const[status, setStatus] = useState("inactive");
 const[statusNote, setStatusNote] = useState("hideAddNote");
 const [selectedNav, setSelectedNav] = useState("task");
 const [selectedTaskCategory, setSelectedTaskCategory] = useState("task-today");
 const [task, setTask] = useState([]);
 const[note, setNote] = useState([]);
 const[selectedNote, setSelectedNote]= useState({});
 const[editNoteStatus, setEditNoteStatus]= useState("hideEditNote");
  return (
    <div className='root-container'>
          <NavigationComponent setSelectedNav={setSelectedNav}
                                selectedNav={selectedNav}
                                setSelectedTaskCategory={setSelectedTaskCategory}/>
          <div className='container'>
            
            <div className={selectedNav === "task"? "activeNav" : "inactiveNav"}>
              <GreetingComponent/>
              <SearchComponent setStatus={setStatus}
                                status={status}/>
                <TaskComponent  taskList={task}
                                setTaskList={setTask}
                                selectedTaskCategory={selectedTaskCategory}
                             />
            </div>
            <div className={selectedNav === "nav-notes"? "activeNav" : "inactiveNav"}>
                <NoteComponent note={note}
                               setNote={setNote}
                               statusNote={statusNote}
                               setStatusNote={setStatusNote}
                               setEditNoteStatus={setEditNoteStatus}
                               setSelectedNote={setSelectedNote}/>
                               
            </div>
            <EditNoteComponent editNoteStatus={editNoteStatus}
                               setEditNoteStatus={setEditNoteStatus}
                               selectedNote={selectedNote}
                               note={note}
                               setNote={setNote}
                               setSelectedNote={setSelectedNote}
/>
            <AddNoteComponent note={note}
                              setNote={setNote}
                              statusNote={statusNote}
                              selectedNav={selectedNav}
                              setStatusNote={setStatusNote}
                              />
           <AddTaskComponent setStatus={setStatus}
                             status={status}
                             taskList={task}
                             selectedNav={selectedNav}
                             setTaskList={setTask}/>

          </div>
          
        
    </div>
  )
}

export default App
