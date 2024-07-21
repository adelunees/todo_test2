import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Marquee from './components/Marquee';
import './App.css';

function App() {
  // Инициализация состояния задач из локального хранилища
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Состояние для фильтрации и сортировки задач
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState(''); // Состояние для выбранной категории

  // Список категорий
  const categories = ['General', 'Work', 'Personal'];

  // Сохранение задач в локальное хранилище при изменении списка задач
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Добавление новой задачи
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Удаление задачи по идентификатору
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Редактирование существующей задачи
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Фильтрация задач в зависимости от выбранного фильтра и категории
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'incomplete' && task.completed) return false;
    if (selectedCategory && task.category !== selectedCategory) return false;
    return true;
  });

  // Сортировка задач по дате завершения
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
  });

  return (
      <div className="app">
        <div className="header_task">
          <h1>EASY TASK</h1>
        </div>
        <Marquee text="Добро пожаловать в EASY TASK! Управляйте своими задачами легко и эффективно." />
        <TaskForm addTask={addTask} />
        <div className="controls">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">Все</option>
            <option value="completed">Завершенные</option>
            <option value="incomplete">Незавершенные</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Сортировать по дате (возр.)</option>
            <option value="desc">Сортировать по дате (убыв.)</option>
          </select>
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="">Все категории</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="task-list">
          <TaskList tasks={sortedTasks} deleteTask={deleteTask} editTask={editTask} />
        </div>
      </div>
  );
}

export default App;
