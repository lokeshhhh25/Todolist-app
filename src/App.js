import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css';
function App() {
  const [iscompletescreen,setIscompletescreeen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewtitle]=useState([]);
  const [newDescription,setNewDescription]=useState('');
  const[completedTodos,setcompletedTodos]=useState([]);

  const handleAddtodo=()=>{
    let newTodoitem={
      title:newTitle,
      description:newDescription
    }

    let updatedTodoarr=[...allTodos];
    updatedTodoarr.push(newTodoitem);
    setTodos(updatedTodoarr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoarr)) //store karega  string ki form me bina iske object ki form me ke rha tha 
    
  };

  const handleDeletetodo=(index)=>{
    let reducedTodo=[...allTodos]
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
    
  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy =now.getFullYear();
    let h = now.getHours(); 
    let m=now.getMinutes();
    let s=now.getSeconds();

        let completedOn=dd+'-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;
        let filteredItem={
          ...allTodos[index],
          completedOn:completedOn
        } 

        let updatedcompletedArr=[...completedTodos];
        updatedcompletedArr.push(filteredItem);
        setcompletedTodos(updatedcompletedArr);
       

        localStorage.setItem('completedTodos',JSON.stringify(updatedcompletedArr));
          handleDeletetodo(index);
  }

  const handleDeletecompletedtodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.pop(index);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setcompletedTodos(reducedTodo);

  }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
if(savedCompletedTodo){
  setcompletedTodos(savedCompletedTodo)
}

  },[])

  return (
    <div className="App">
      <h1>To Do Lists</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewtitle(e.target.value)} placeholder='write task to do....'></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='write Discription to do.....'></input>
          </div>
          <div className='todo-input-item'>
             <button type='button' onClick={handleAddtodo} className='primary-btn'>ADD</button>
          </div>
        </div>
        <div className='btn-area'>
          <button 
                  className={`secondarybtn ${iscompletescreen=== false && 'active'}`} 
                  onClick={()=>setIscompletescreeen(false)}>
                    Todo  
           </button>
          <button 
                      className={`secondarybtn ${iscompletescreen=== true && 'active'}`} 
                      onClick={()=>setIscompletescreeen(true)} >
                        Completed
                      
            </button>
        </div>

        <div className='todo-list'>

          {iscompletescreen===false && allTodos.map((item,index) => {
            return(

              <div className='todo-list-item' key={index}>
            <div>
               <h1>{item.title}</h1>
            <p>{item.description}</p>
            </div>
            <div>
           <MdDelete 
           className='icon' 
           onClick={()=>handleDeletetodo(index)} 
            title='delete'/>
           <FaCheck 
           className='check-icon' 
           onClick={()=>handleComplete(index)}  
           title='complete' />
           </div>
           </div>
          
          )
        }
          )}

{iscompletescreen===true && completedTodos.map((item,index) => {
            return(

              <div className='todo-list-item' key={index}>
            <div>
               <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p> Completed on : {item.completedOn}</p>
            </div>
            <div>
           <MdDelete 
           className='icon' 
           onClick={()=>handleDeletecompletedtodo(index)} 
            title='delete'/>
           
           </div>
           </div>
          
          )
        }
          )}


           
          
        </div>
        <div className='ownerinfo'>
           <small> Created By Lokesh</small>
        </div>
       
      </div>
      
    </div>
  );
}

export default App;
