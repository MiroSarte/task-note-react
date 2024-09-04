import './Search.css'
import { IoEllipsisVerticalSharp } from "react-icons/io5";
function SearchComponent(props){
  const setStatus = props.setStatus;
  const status = props.status

  function MakeActiveStatus(){
    setStatus("active");
  }


  return(
    <div className='search-container'>

        <div className="input-search-container">
                <input
                    className='input-search'  
                    type="text" 
                    placeholder='Search Task...'/>
        </div>
        <button className='add-task-btn' onClick={MakeActiveStatus}>
            Add Task
        </button>
        <span className='option-sort'>
           <IoEllipsisVerticalSharp />
        </span>

        
        
    </div>
  )
}
export default SearchComponent