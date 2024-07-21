import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, editTask }) {
    return (
        <>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </>
    );
}

export default TaskList;
