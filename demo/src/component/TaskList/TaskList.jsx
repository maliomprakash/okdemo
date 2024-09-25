import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, fetchtodo } from '../../Feature/taskSlice';
import AddTask from './AddTask';
import Edit from './Edit.jsx';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);
    const dispatch = useDispatch();
    const [editingTask, setEditingTask] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    useEffect(() => {
        dispatch(fetchtodo());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Task List</h1>
            <AddTask />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className='bg-gray-50 p-4 rounded-md shadow-sm flex justify-between mb-2'>
                        <div>
                            <h3 className='text-lg font-medium text-gray-800'>{task.title}</h3>
                            {task.description && <p className='text-gray-600'>{task.description}</p>}
                            <p className='mt-1 text-sm font-semibold'>Status: <span className='italic underline'>{task.status}</span></p>
                        </div>
                        <div className='flex space-x-2'>
                            <button 
                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                                onClick={() => setEditingTask(task)}
                            >
                                Edit
                            </button>
                            <button 
                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingTask && <Edit task={editingTask} onClose={() => setEditingTask(null)} />}
        </div>
    );
};

export default TaskList;
