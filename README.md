# Holiday Planner Application

Welcome to the Holiday Planner Application! This application helps users plan their holidays by providing various features such as adding new holiday plans, searching for existing plans, and deleting plans.

## Features

- **Add New Plan**: Users can add new holiday plans with details like destination, dates, and activities.
- **Search**: Users can search for existing holiday plans by entering keywords.
- **Delete Plan**: Users can delete existing holiday plans.

## Technologies Used

- **React**: The front-end of the application is built using React library.
- **React Router**: Used for routing and navigation within the application.
- **Testing Library**: Utilized for unit testing React components.
- **Node.js**: The server-side runtime environment.
- **Express.js**: Used for building the backend server.
- **Supabase**: A cloud-based database service, used for storing holiday plans.

## Getting Started

To get started with the Holiday Planner Application, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/holiday-planner.git`
2. Navigate to the project directory: `cd holiday-planner`
3. Create a `.env` file in the root of your project with the following content:

   ```plaintext
   REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
   REACT_APP_SUPABASE_KEY=your-supabase-key

Replace `your-supabase-url` and `your-supabase-key` with your actual Supabase URL and key.

## Running Tests

To run the tests for the application, use the following command:

```bash
npm test

## Test Coverage
The test coverage report provides insights into the effectiveness of the tests. To generate and view the coverage report, run the following command:

npm test -- --coverage
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
