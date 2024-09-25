import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../Feature/taskSlice';

const Edit = ({ task, onClose }) => {
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskStatus, setTaskStatus] = useState(task.status);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create the updated task object
        const updatedTask = {
            id: task.id,
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
        };

        // Dispatch the editTask action with the updated task
        dispatch(editTask(updatedTask));
        onClose(); // Close the modal after submitting
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-md shadow-md w-96'>
                <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
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
                    <div className='flex justify-between'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                        >
                            Update Task
                        </button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
