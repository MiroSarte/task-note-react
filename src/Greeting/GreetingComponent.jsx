
import { useEffect, useState } from 'react';
import './Greeting.css'
function GreetingComponent(){


    const[greet, setGreet]=useState("Good morning, Miro Sarte!");
    const[message, setMessage]=useState("Get ready to dive in—here's your task for today!");
    let date = new Date();
    let hours = date.getHours("Get ready to dive in—here's your task for today!");

    useEffect(()=>{
          if(hours < 12){
            setGreet("Good morning, Miro Sarte!");
            setMessage("Get ready to dive in—here's your task for today!")
          }
          else if(hours > 18){
            setGreet("Good evening, Miro Sarte!");
            setMessage("The day may be ending, but your determination shines bright. Let’s finish strong!");
   
          }
          else if(hours > 12){
            setGreet("Good afternoon, Miro Sarte!");
            setMessage("You can do it! We still have time to finish your task today.");
          }
    },[hours])
    function handleGreeting(){
        
    }
    return(
        <div className='greeting-container'>
              <p className="greeting">{greet}</p>
              <p className='message'>{message}</p>
        </div>
    )
}

export default GreetingComponent