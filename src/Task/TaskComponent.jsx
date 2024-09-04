
import { useEffect, useLayoutEffect, useState } from "react";
import "./Task.css";
import { IoCheckmark } from "react-icons/io5";  
import { IoTrashBin } from "react-icons/io5";
function TaskComponent(props){
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let hours = date.getHours();
    let minutes =  String(date.getMinutes()).padStart(2, '0');
    let timeSuffix = hours > 12? "pm" : "am"
    let timeNow = `${hours > 12? hours-12:hours}:${minutes} ${timeSuffix}`;
    let dateToday = `${yyyy}/${mm}/${dd} ${timeNow}`;
    let dateToInt = Date.parse(dateToday);

    const allTask = props.taskList;
    const setTaskList = props.setTaskList;

    let todayTask = allTask.filter((taskItem)=>{
       let schedule = Date.parse(taskItem.schedule.slice(0, -8).trim())
       
       let dateOnly = Date.parse(dateToday.slice(0, -8).trim());
       if(dateOnly === schedule){
         return taskItem;
       }else{
       }
    });

    let upcomingTask = allTask.filter((taskItem)=>{
        let schedule = Date.parse(taskItem.schedule.slice(0, -8).trim());
        if(dateToInt < schedule){
          return taskItem;
        }else{
        }
     });

     let overDueTask = allTask.filter((taskItem)=>{
        let schedule = Date.parse(taskItem.schedule);

        if(dateToInt > schedule){
          return taskItem;
        }else{
        }
     });


     const category =  props.selectedTaskCategory
     const[filterTask, setFilterTask] = useState([]);

     useLayoutEffect(() => {
        switch (category) {
            case "task-upcoming":
                setFilterTask([...upcomingTask]);
                break;
            case "task-overdue":
                setFilterTask([...overDueTask]);
                break;
            case "all-task":
                setFilterTask([...allTask]);
                break;
            default:
                setFilterTask([...todayTask]);
                break;
        }
    }, [category, allTask]);
   
      



    const sortedTask = filterTask.sort((a, b)=>{
       /* return Date.parse('1970/01/01 ' + a.schedule.slice(0, -2) + ' ' + a.schedule.slice(-2)) // parse convert the string format date into milliseconds since 1970
             - Date.parse('1970/01/01 ' + b.schedule.slice(0, -2) + ' ' + b.schedule.slice(-2))*/ 
             return Date.parse( a.schedule)
                   -Date.parse( b.schedule)
     });

    const setTask = props.setTaskList
    const [doneTask, setDoneTask] = useState([]);

    function deleteTask(index){
        const selectedTaskId = sortedTask[index].id;
        console.log(selectedTaskId)
        const updatedTask = props.taskList.filter((taskItem, index)=>{
          if(taskItem.id !== selectedTaskId){
              return taskItem
          }else{

          }
        })
        setTaskList(updatedTask);
    }
    
    function deleteDoneTask(index){
        const selectedTaskId = doneTask[index].id;
        console.log(selectedTaskId);
        const updatedTask = props.taskList.filter((taskItem, index)=>{
          if(taskItem.id !== selectedTaskId){
              return taskItem
          }else{

          }
        })
        setTask(updatedTask);
        removeDoneTask(index);
    }


    function removeDoneTask(index){
        const updatedTask = doneTask.filter((_, i) => i !== index);
        setDoneTask(updatedTask);
    }

    function checkedList(index){
        const checkedItem = sortedTask[index]; 
        deleteTask(index);
        setDoneTask(prev => [...prev, checkedItem]);
    }
    function uncheckedList(index){
        const uncheckedItem = doneTask[index]; 
        console.log(uncheckedItem);
        
        removeDoneTask(index);
        setTask(prev => [...prev, uncheckedItem]);
    }

   

    return(
        <div className="today-task-container">
            <div className="task-header-container">
                <span className="task-name">Task</span>
                <span className="task-priority">Priority</span>
                <span className="task-label">Label</span>
                <span className="task-schedule">Schedule</span>
                <span className="header-remove"></span>
            </div>
                <ul className="task-list">
                     {
                           sortedTask.map((taskItem, index)=> 
                           <li className="taskItem" key={index}>
                           <span className="name">
                              <label className="checkbox-wrapper">
                                  <input type="checkbox" className="checkbox-input" onChange={()=>checkedList(index)} checked={false}/>
                                   <span className="checkmark"><IoCheckmark className="check"/></span>
                                   </label>
                              <span className="text">
                                  {taskItem.task}</span>
                           </span>
                           <span className="priority">{taskItem.priority}</span>
                           <span className="label">{taskItem.label}</span>
                           <span className="schedule">{taskItem.schedule}</span>
                           <span className="delete" onClick={()=>deleteTask(index)}><IoTrashBin/></span>
                    </li>
                        )
                     }
                </ul>
                <ul className="completed-list">
                    {
                        doneTask.map((taskItem, index)=>  
                        <li className="taskItem" key={index}>
                        <span className="name">
                           <label className="checkbox-wrapper">
                               <input type="checkbox" className="checkbox-input" onChange={()=> uncheckedList(index)} checked={true}/>
                                <span className="checkmark"><IoCheckmark className="check"/></span>
                                </label>
                           <span className="text">
                               {taskItem.task}</span>
                        </span>
                        <span className="priority">{taskItem.priority}</span>
                        <span className="label">{taskItem.label}</span>
                        <span className="schedule">{taskItem.schedule}</span>
                        <span className="delete" onClick={()=>deleteDoneTask(index)}><IoTrashBin/></span>
                 </li>
                        )
                    }

                </ul>


        </div>
    )
}

export default TaskComponent