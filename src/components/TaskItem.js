import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

function TaskItem({ task, deleteTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);

    // Обработка редактирования задачи
    const handleEdit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            title,
            description,
            dueDate
        };
        editTask(updatedTask);
        setIsEditing(false);
    };

    // Переключение статуса завершения задачи
    const toggleComplete = () => {
        const updatedTask = {
            ...task,
            completed: !task.completed
        };
        editTask(updatedTask);
    };

    // Форматирование даты
    const formattedDueDate = format(new Date(dueDate), 'd MMMM yyyy', { locale: ru });

    return (
        <div className={`task-item ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
                <form onSubmit={handleEdit} className="task-form">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="task-actions">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
                    </div>
                </form>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Дата завершения: {formattedDueDate}</p>
                    <p>Категория: {task.category}</p>
                    <div className="task-completed">
                        <span>Завершено</span>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={toggleComplete}
                        />
                    </div>
                    <div className="task-actions">
                        <button onClick={() => setIsEditing(true)}>Редактировать</button>
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskItem;
