import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Feature/taskSlice';
import {v4 as uuid4} from 'uuid'

const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('pending'); // Default status

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle || !taskDescription) {
            alert('Please fill in all fields');
            return;
        }

        // Create the task object
        const newTask = {
            id: uuid4(), // Simple unique ID
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
        };

        dispatch(addTask(newTask)); // Corrected action name
        setTaskTitle('');
        setTaskDescription('');
        setTaskStatus('pending');
    };

    return (
        <div className='max-w-md mx-auto p-4 bg-white rounded-md shadow-md'>
            <h2 className='text-xl font-bold mb-4'>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-1' htmlFor='taskTitle'>Task Name</label>
                    <input
                        type='text'
                        id='taskTitle'
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-1' htmlFor='taskDescription'>Task Description</label>
                    <textarea
                        id='taskDescription'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-1' htmlFor='taskStatus'>Status</label>
                    <select
                        id='taskStatus'
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    >
                        <option value='pending'>To Do</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
