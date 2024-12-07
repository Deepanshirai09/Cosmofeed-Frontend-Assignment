import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    searchQuery: '',
    groupBy: 'none',
    sortBy: 'createdOn',
    isOrderAsc:false,
    filteredTasks : []
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks= [];
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskState: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) state.tasks[index].done = !state.tasks[index].done;
    },

    setSortBy: (state, action) => {
      const { key } = action.payload;
    
      state.tasks.sort((a, b) => {
        let comparison = 0;
    
        // Handle date fields
        if (key === "createdOn" || key === "dueDate") {
          const dateA = new Date(a[key]);
          const dateB = new Date(b[key]);
          comparison = dateA - dateB;
        } 
        // Handle other fields
        else {
          if (a[key] < b[key]) comparison = -1;
          if (a[key] > b[key]) comparison = 1;
        }
    
        // Adjust for ascending or descending order
        return state.isOrderAsc ? comparison : -comparison;
      });
    },
    updateSortOrder : (state,action)=>{
      const {isOrderAsc}=action.payload;
      state.isOrderAsc=isOrderAsc;
    },
    bulkAction: (state, action) => {
      const { ids, actionType } = action.payload;
      state.tasks.forEach(task => {
        if (ids.includes(task.id)) {
          if (actionType === 'delete') {
            state.tasks = state.tasks.filter(t => t.id !== task.id);
          } else if (actionType === 'toggle') {
            task.done = !task.done;
          }
        }
      });
    },
    setSearchQuery: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.searchQuery = searchQuery;
    
      if (searchQuery.trim() === '') {
        // Reset filteredTasks to the original tasks or grouped tasks
        state.filteredTasks = state.groupBy === 'none' ? [...state.tasks] : state.filteredTasks;
      } else {
        // Filter tasks based on the search query
        const tasksToFilter = state.groupBy === 'none' ? state.tasks : state.filteredTasks;
        state.filteredTasks = tasksToFilter.filter(task => {
          return task.title.toLowerCase().includes(searchQuery) ||
                 task.priority.toLowerCase().includes(searchQuery) ||
                 (task.status && task.status.toLowerCase().includes(searchQuery)) ||
                 (task.description && task.description.toLowerCase().includes(searchQuery));
        });
      }
    },
    
    setGroupBy: (state, action) => {
      const groupByKey = action.payload; // Get the key to group by
      state.groupBy = groupByKey;
    
      if (groupByKey === 'none') {
        // Reset filteredTasks to ungrouped tasks
        state.filteredTasks = [...state.tasks];
      } else {
        // Group tasks by the specified key
        const groupedTasks = state.tasks.reduce((groups, task) => {
          const key = task[groupByKey] || 'Uncategorized'; // Handle missing values
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(task);
          return groups;
        }, {});
    
        // Convert groupedTasks into a flattened array for rendering
        state.filteredTasks = Object.values(groupedTasks).flat();
      }
    },    
    
   
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskState,
  bulkAction,
  setSearchQuery,
  setGroupBy,
  setSortBy,
  updateSortOrder
} = tasksSlice.actions;
export default tasksSlice.reducer;
