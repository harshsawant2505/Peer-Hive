'use client'
import React, { useEffect, useState } from 'react';
import { CheckSquare, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axios from 'axios';

const TodoSection = ({name}) => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Meeting @6PM", description: "Discuss about budget", completed: false },
    { id: 2, title: "Member Discussion", description: "AI-general members want a session on blockchain", completed: false },
    { id: 3, title: "Meeting Tomorrow", description: "Plan upcoming events", completed: false }
  ]);

  const fetchTodos = async () => {
    const res=await axios.post('/api/getTodos', {name})
    if(res.data.todos){
      setTodos(res.data.todos);
    }

    
  }
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const setTodosToDB = async () => {
    try {
      const response = await axios.post('/api/setTodos', {
        todos, name
      });
      console.log(response.data);
    } catch (error) {
      console.log('Failed to set todos:', error);
    }
  };

  

  const addTodo = () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTodo.title,
          description: newTodo.description,
          completed: false
        }
      ]);
      setNewTodo({ title: '', description: '' });
      setIsAdding(false);
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Card className="bg-slate-800/50 border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CheckSquare size={20} /> To-Do List
        
        </CardTitle>
        <div className='flex justify-center items-center'>

        
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 hover:bg-blue-500/30 rounded-full transition"
        >
          <Plus size={20} />
        </button>
        <div className='bg-green-500 px-2 py-1 rounded-lg' onClick={()=>setTodosToDB()}>Save</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {isAdding && (
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
              <input
                
                type="text"
                placeholder="Todo title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                className="w-full bg-transparent border-b border-blue-500/30 mb-2 p-2 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                className="w-full bg-transparent border-b border-blue-500/30 mb-4 p-2 focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 text-sm hover:bg-red-500/20 rounded transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  className="px-3 py-1 text-sm bg-blue-500/20 hover:bg-blue-500/30 rounded transition"
                >
                  Add Todo
                </button>
              </div>
            </div>
          )}
          
          {todos.map((todo) => (
            <div
              key={todo.id || Math.random()*20}
              className={`bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 transition ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`font-semibold ${todo.completed ? 'line-through' : ''}`}>
                    {todo.title}
                  </h3>
                  <div className={`text-gray-300 text-sm ${todo.completed ? 'line-through' : ''}`}>
                    {todo.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`p-1 rounded-full transition ${
                      todo.completed ? 'bg-green-500/20' : 'hover:bg-blue-500/30'
                    }`}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 hover:bg-red-500/20 rounded-full transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoSection;