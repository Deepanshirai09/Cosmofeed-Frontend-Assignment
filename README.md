
---

## Setup and Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the application with `npm start`.

---

## Application Workflow

### Adding a Task

1. Click the **Add Task** button to open the modal.
2. Fill in the details (summary, description, priority, and due date).
3. Use the React Quill editor for a rich text description.
4. Save the task to see it in the **Pending** and **All Tasks** tabs.

### Editing a Task

1. Click the **Edit** icon next to a task.
2. Modify the task fields and save the changes.

### Deleting a Task

1. Click the **Delete** icon next to a task.
2. Confirm the deletion in the pop-up.

### Managing Tasks

- **Mark as Completed**: Click the **Done** button; the task moves to the **Completed** tab.
- **Reopen a Task**: Click the **Reopen** button; the task moves back to **Pending**.

### Search and Sort

- Use the global search bar to filter tasks by title or description.
- Click column headers to sort tasks by the selected attribute.

### Group By

- Use the dropdown to group tasks by priority, created date, or due date.

---

## Key Implementations

### State Management with Redux

- Used Redux Thunk to simulate asynchronous actions for CRUD operations.
- Tasks stored in a global Redux store, ensuring seamless communication across components.

### Rich Text Editor

- Integrated React Quill for task descriptions, providing a modern text-editing experience.

### Modular Design

- Components such as `AddTaskModal`, `TaskList`, and `Tabs` ensure code reusability and maintainability.

### Accessibility and Usability

- Modals close with the **Escape** key.
- Implemented keyboard shortcuts for enhanced user experience.

### Sorting and Searching

- Configurable attributes (defined in `config.js`) determine sort and search behaviors dynamically.

### Bulk Actions

- Checkbox selection for multiple tasks to perform bulk operations like delete and state changes.

---

## Known Issues or Limitations

- **Styling Conflicts**: Some minor inconsistencies in modal alignment on smaller screens.
- **API Integration**: Current CRUD operations are simulated using `setTimeout` (no real API integration).

