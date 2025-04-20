import React, { useState } from 'react';

interface TodoFolderContentProps {
  onClose: () => void;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoFolderContent: React.FC<TodoFolderContentProps> = ({ onClose }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="folder-window">
      <div className="folder-header">
        <strong className="folder-title">Todo List</strong>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="todo-content">
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoFolderContent; 