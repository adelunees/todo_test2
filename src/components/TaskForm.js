import React, { useState } from 'react';

function TaskForm({ addTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('General'); // Начальная категория

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && dueDate) {
            const newTask = {
                id: Date.now(),
                title,
                description,
                dueDate,
                category,
                completed: false,
            };
            addTask(newTask);
            // Очистка формы после добавления задачи
            setTitle('');
            setDescription('');
            setDueDate('');
            setCategory('General'); // Сброс категории
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Добавление новой задачи</h3>
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="General">Общие</option>
                <option value="Work">Работа</option>
                <option value="Personal">Личное</option>
            </select>
            <button type="submit">Добавить задачу</button>
        </form>
    );
}

export default TaskForm;
