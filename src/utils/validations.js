export const validateTitle = (title) => {
    return title.length >= 10 && title.length <= 140;
  };
  
  export const validateDescription = (description) => {
    return description.length <= 500;
  };
  