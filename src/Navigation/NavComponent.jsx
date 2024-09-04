import { useState } from 'react';
import './NavComponent.css';
import Profile from './Profiles/miro.jpg';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoNewspaper } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { IoExit } from "react-icons/io5";

function NavComponent(props){
    const setSelectedNav = props.setSelectedNav;
    const selectedNav = props.selectedNav;
    const setSelectedTaskCategory = props.setSelectedTaskCategory;

    function activeList(event) {
        const navItems = document.querySelectorAll('.nav-list li');
        const list = event.target.closest('li');
       // console.log(list.getAttribute('class')); get class name
            navItems.forEach(item =>{item.classList.remove("active")} );
            list.classList.add("active");  
            const getClass = list.getAttribute('class').split(' ')
            setSelectedNav(getClass[0]);
    }

    function activeTaskList(event) {
        const taskCategory = document.querySelectorAll('.task-category li');
        const list = event.target.closest('li');
            taskCategory.forEach(item=>{
               item.classList.remove('activeTaskFilter');
            });
            list.classList.add('activeTaskFilter');
            const getClass = list.getAttribute('class').split(' ')
            setSelectedTaskCategory(getClass[0]);
    }

 return(
 <div className="navigation-container">
    <h1 className='app-header'>
            ⚡Quick Organizer
        </h1>
    <div className="navigation-wrapper">
        <div className='profile-user-container'>
            
            <img src={Profile} 
            alt="My-profile" 
            className='profile' /> 
            <h3 className="users-name">Miro Ivan Sarte</h3>  
        </div>
        <ul className='nav-list'>
            <li className="
            task active" onClick={activeList}>
                <span className='li-icons'><IoToday /></span>
                <span className='nav-text'>My Task</span>
            </li>
            <div className={selectedNav === "task"? "show":"hide"}>
                <ul className='task-category'>
                    <li className='activeTaskFilter task-today' onClick={activeTaskList}>Today</li>
                    <li className='task-upcoming' onClick={activeTaskList}>Upcoming</li>
                    <li className='task-overdue' onClick={activeTaskList}>Overdue</li>
                    <li className='all-task' onClick={activeTaskList}>All Task</li>

                </ul>
            </div>
            <li className="nav-notes" onClick={activeList}>
                <span className='li-icons'><IoNewspaper />
                </span><span className='nav-text'>My Notes</span>
            </li>
            <li className='nav-setting'  onClick={activeList}>
                <span className='li-icons'><IoSettingsSharp />
                </span><span className='nav-text'>Setting</span>
            </li>
            <li className="nav-logout" onClick={activeList}>
                <span className='li-icons'><IoExit /></span>
                <span className='nav-text'>Logout</span>
            </li>

        </ul>
    </div>
      <footer><p>© 2024 MIDS Freelance</p></footer>
 </div>)
}
export default NavComponent