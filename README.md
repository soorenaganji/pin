Here's an updated `README.md` tailored to your project hosted on GitHub:

```markdown
# Pin: User Management App

This project is a user management application built with React. It allows users to manage and edit user data, featuring a multi-select option, sorting functionality, and a modal for adding or editing users. User data is persisted using the browser's local storage.

## Features

- **User List Display:** Shows a list of users with their names and emails.
- **Search Functionality:** Allows users to search for specific users by name or email.
- **Add/Edit Users:** Users can add new users or edit existing users' details.
- **Multi-Select Mode:** Enables selection of multiple users for bulk deletion.
- **Sorting:** Allows sorting of the user list by name or creation date.
- **Data Persistence:** User data is stored in local storage to maintain state across sessions.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/soorenaganji/pin.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pin
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding a New User
- Click the "Add User" button.
- Fill out the form fields: Name, Email, Job, and Phone Number.
- Click "Submit" to add the user.

### Editing an Existing User
- Click the edit icon next to the user you want to edit.
- Update the necessary fields in the form.
- Click "Submit" to save the changes.

### Deleting a User
- Click the trash icon next to the user you want to delete.

### Multi-Select Mode
- Click the multi-select icon in the header to enter multi-select mode.
- Select the users you want to delete using the checkboxes.
- Click the trash icon to delete the selected users.

### Sorting Users
- Click the sort button in the table header to sort users by name or creation date.

## Context API

The project uses React's Context API to manage the state for:
- **Search Queries:** Manages the state of the search input.
- **Multi-Select Mode:** Manages the selection and deletion of multiple users.

## Project Structure

```
src/
│
├── components/
│   ├── layout/              # Layout component for the application
│   ├── UsersTable.jsx       # Table component to display user data
│   └── FormModal.jsx        # Modal component for adding/editing users
│
├── context/
│   ├── MultiSelectContext.js # Context for managing multi-select mode
│   └── SearchContext.js      # Context for managing search state
│
├── App.jsx                  # Main application component
├── main.jsx                 # Entry point of the application
└── index.css                # Global CSS styles
```

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **React Icons:** Icon library for React.
- **Vite:** Build tool providing a fast development environment.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **React Hot Toast:** Notifications for the app.

## Live Demo

You can check out the live demo of the app [here](https://pin-urqq.vercel.app/).

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```

This `README.md` is specifically tailored for your GitHub repository, providing an overview of your project, installation steps, usage instructions, and more. It should help users and contributors understand and navigate your project easily.