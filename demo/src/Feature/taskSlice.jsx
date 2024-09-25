import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    status: "All"
};

export const fetchtodo = createAsyncThunk('tasks/fetchTodo', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    return data.map(task => ({
        id: task.id,
        title: task.title,
        description: '',
        status: task.completed ? "Completed" : "TO DO" // Fixed spelling from complete to completed
    }));
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask:(state,action)=>{
            state.tasks = state.tasks.map(task =>(
                task.id === action.payload.id ? action.payload :task
            ))
        },
        deleteTask:(state,action)=>{
            state.tasks=state.tasks.filter(task => task.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchtodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchtodo.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchtodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default taskSlice.reducer;
export const { addTask , editTask,deleteTask } = taskSlice.actions;
