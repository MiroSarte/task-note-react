import { IoCalendarNumber } from "react-icons/io5";
import { useEffect, useState } from 'react';
import './addTask.css'
function AddTaskComponent(props){
  let date = new Date();
  let month = date.getMonth();
  let today = date.getDate();
  let year = date.getFullYear();
  let day = date.getDay();
  const months = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
  const [scheduleDate, setScheduleDate] = useState(`${months[month]}/${today}/${year}`)
  const [hours, setHours] = useState(11);
  const [minutes, setMinutes] = useState(59);
  const [meridiem, setMeridiem] = useState("pm");
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newLabel, setNewLabel] = useState("Personal");


  const status = props.status;
  const setStatus = props.setStatus;
  const taskList = props.taskList;
  const setTaskList = props.setTaskList;
  
  function handleCancel(){
     setStatus("inactive");
  }
  function handleAdd(){
    let id = "id" + Math.random().toString(16).slice(2);
    let schedToArr = scheduleDate.split("/");
    let formatSelectedDate = `${schedToArr[2]}/${String(months.indexOf(schedToArr[0])+1).padStart(2, "0")}/${schedToArr[1]}` 
    let newSchedule =  `${formatSelectedDate} ${hours}:${String(minutes).padStart(2, "0")} ${meridiem}`;
    const newTaskItem = {
      "id":id,
      "task":newTask,
      "priority":newPriority,
      "label":newLabel,
      "schedule":newSchedule
    };

    console.log(newTaskItem);
    setTaskList([...taskList, newTaskItem]);
    setStatus("inactive");
    setHours(11);
    setMinutes(59)
    setMeridiem("pm")
    setNewTask("");
    setNewPriority("Medium");
    setNewLabel("Personal");
    console.log("Add task succesfully!")
 }

 function handleTask(event){
  setNewTask(event.target.value);
 }
 function handlePriority(event){
  setNewPriority(event.target.value);

 }

 function handleLabel(event){
  setNewLabel(event.target.value);
 }


  function handleDate(event){
      const selectedDate = event.target.value;
      const dateToday = `${year}-${month + 1}-${today}`
      if(Date.parse(selectedDate) >= Date.parse(dateToday)){
        let convertdateToArr = selectedDate.split("-")
        let getYearFromArr = convertdateToArr[0];
        let getMonthFromArr = convertdateToArr[1].replace(/^0+/,"");
        let getDateFromArr = convertdateToArr[2];
        setScheduleDate(`${months[getMonthFromArr-1]}/${getDateFromArr}/${getYearFromArr}`);
      }
      else{
        alert("Sorry you cant select previous dates")
      }
  }

  function HoursLimiter(event){
    const lengthOfInput = event.target.value.length
      if(event.target.value < 0 ) {
       setHours(0)
      }
      else if(event.target.value > 12 || lengthOfInput > 2) {
        setHours(12)
      }
      else{
        setHours(event.target.value)
      }
  }

  function MinutesLimiter(event){
    const lengthOfInput = event.target.value.length

    if(event.target.value < 0) {
      setMinutes(0)
    }
    else if(event.target.value > 59 || lengthOfInput > 2 || event.target.value.includes("e") ||  event.target.value.includes("+") ||  event.target.value.includes("-")) {
     setMinutes(59)
    }
    else{
      setMinutes(event.target.value)
    }
}
function handleMeridiem(event){
  setMeridiem(event.target.value);
}



return(
  <div className={`add-task-container ${status}`}>
        <div className='select-schedule-container'>
                <h2>Select Schedule</h2>
                <div className="select-schedule-wrapper">
                    <div className='date-container'>
                      <span className='date-display'>{scheduleDate}</span>
                      <input type="date" className="date-input" onChange={handleDate}/>
                      <span className="calendar"><IoCalendarNumber/></span>
                    </div>
                    <div className="time-container">
                      <div className="hours-wrapper">
                        <input type="number" 
                              className="hours" 
                               maxLength="2"
                               min={0}
                               max={12}
                               value={hours}
                              onChange={HoursLimiter}/>
                      </div>
                      <span className="colon">:</span>
                      <div className="minutes-wrapper">
                        <input type="number" 
                              className="minutes" 
                              maxLength="2"
                              value={minutes}
                              min={0}
                              max={59}
                              onChange={MinutesLimiter}
                             />
                         </div>
                         <select name="meridiem" className="meridiem" id="meridiem" value={meridiem} onChange={handleMeridiem}>
                          <option value="pm"  >PM</option>
                          <option value="am">AM</option>
                         </select>
                       </div>
                </div>

              
            </div>

            <div className="task-container">
                  <h2>Task</h2>
                  <div className="input-task">
                         <input type="text" placeholder="Task..." value={newTask} onChange={handleTask}/>
                  </div>
              </div>

              <div className="priority-container">
        <h2>Priority</h2>
        <form className="priority-wrapper">
          <label>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={newPriority === "Low"}
              onChange={handlePriority}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={newPriority === "Medium"}
              onChange={handlePriority}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={newPriority === "High"}
              onChange={handlePriority}
            />
            High
          </label>
        </form>
      </div>

      <div className="label-container">
        <h2>Label</h2>
        <form className="label-wrapper">
          <label>
            <input
              type="radio"
              name="label"
              value="Personal"
              checked={newLabel=== "Personal"}
              onChange={handleLabel}
            />
            Personal
          </label>
          <label>
            <input
              type="radio"
              name="label"
              value="Work"
              checked={newLabel === "Work"}
              onChange={handleLabel}
            />
            Work
          </label>
          <label>
            <input
              type="radio"
              name="label"
              value="Business"
              checked={newLabel === "Business"}
              onChange={handleLabel}
            />
            Business
          </label>
        </form>
</div>
              <div className="buttons-container">
                <button className="buttons-cancel" onClick={handleCancel}>Cancel</button>
                <button className="buttons-add" onClick={handleAdd}>Add</button>
              </div>

             
  </div>
);
}

export default AddTaskComponent