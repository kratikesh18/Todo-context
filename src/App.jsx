import { useEffect , useState } from 'react';
import './App.css'
import { TodoProvider } from './Context'
import { TodoForm, TodoItem } from './Components';

function App() {

// storing data 
const [todos, setTodos] = useState([]);
  // creating functions 

const addTodo =(todo)=>{
    // setTodos(todo)
    setTodos((prev) => [...prev , {id: Date.now(), ...todo }])
}


const updateTodo =(id, todo)=>{
  setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id === id?todo:prevTodo)))
}

const deleteTodo=(id )=>{
  setTodos((prev)=> prev.filter((prevTodo => prevTodo.id != id)))
}


const toggleComplete= (id) =>{
  setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id? {...prevTodo , completed:!prevTodo.completed}:prevTodo ))
}


useEffect(()=>{
  const todos = JSON.parse(localStorage.getItem('todos'))
  if(todos && todos.length > 0){
      setTodos(todos)
  }
}, []) 

useEffect(()=>{
  localStorage.setItem('todos' , JSON.stringify(todos))
} , [todos])

// background: rgb(107,10,10);
//background: linear-gradient(324deg, rgba(107,10,10,1) 0%, rgba(73,11,108,1) 92%);

  return (
    <TodoProvider value={{todos, toggleComplete,addTodo, updateTodo,deleteTodo}}>

      <div className="bg-gradient-custom  min-h-screen w-full py-8">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Tasks</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>


          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=> (
              <div key = {todo.id}  className='w-full'>
                <TodoItem todo={todo}/> 

              </div>
            ))}
          </div>
        </div>
        <div><h1 className='text-[0.79rem] text-white '>&copy;Kartikesh</h1></div>
      </div>

    </TodoProvider>
  )
}

export default App
