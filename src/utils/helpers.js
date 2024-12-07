export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const validateTask = (task) => {
    return task.title.trim() !== '' && task.description.trim() !== '';
  };
  