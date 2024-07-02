# Employee-Review-System

Employee Review System is a sophisticated web application meticulously crafted to assist users in effectively managing employee performance reviews. Whether you're an administrator handling employee records or an employee providing feedback, the Employee Review System offers seamless functionality. Users can effortlessly add and manage employees, assign performance reviews, and review feedback through an intuitive interface. For further customization and detailed insights, Employee Review System provides a user-friendly interface accessible at all times through any web browser.

## Installation

To run this application on your local machine, please follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/spunkysyed/Employee-Review-System.git


2. Install the required dependencies:
   ```bash
    npm install

3. Start the application:
   ```bash
   nodemon .\index.js

4. Open the application:
   ```bash
    http://localhost:3000


## Usage

1. Admin View
    - Add/Remove/Update/View Employees: Manage employee records efficiently.
    - Add/Update/View Performance Reviews: Handle performance reviews for employees
    - Assign Employees to Participate in Reviews: Allocate employees to participate in another employee's performance review.

2. Employee View
    - List of Performance Reviews Requiring Feedback: View pending performance reviews that need feedback.
    - Submit Feedback: Provide feedback for performance reviews.

3. Authentication
    - Unified Login: A single login for both admin and employee roles.
    - Employee Registration: Employees can register themselves.
    - Admin Privileges: Only admins can grant admin privileges to other employees.

## Folder Structure:
```bash
EmployeeReviewSystem/
├── assets/              # Frontend assets
│   ├── css/             # CSS files
│       ├── assignwork.css   # Styles for the assign work page
│       ├── employeesection.css # Styles for the employee section page
│       ├── header.css   # Styles for the navbar
│       ├── home.css     # Styles for the home page
│       ├── layouts.css  # Styles for the layout page
│       ├── signin.css   # Styles for the sign-in page
│       └── signup.css   # Styles for the sign-up page
│  
├── config/              # Configuration files
│   ├── mongoose.js      # Database connection configuration using Mongoose
│   ├── notyMiddleware.js # Middleware for notifications
│   └── passport-local-strategy.js # Authentication configuration using Passport.js
├── controllers/         # Controller logic
│   ├── employeesection.js # Controller handling employee section-related logic
│   ├── home.js          # Controller handling home-related logic
│   ├── review.js        # Controller handling review-related logic
│   └── user.js          # Controller handling user-related logic
├── models/              # Database models
│   ├── assignedreview.js # Schema for Assigned Review model
│   ├── myreview.js      # Schema for My Review model
│   └── user.js          # Schema for User model
├── routes/              # Route definitions
│   ├── employeeSection.js # Routes for employee section
│   ├── index.js         # Main routes for the application
│   ├── review.js        # Routes for reviews
│   └── users.js         # Routes for users
├── views/               # Views rendered by the server
│   ├── assignwork.ejs   # EJS template for the assign work page
│   ├── employeesection.ejs # EJS template for the employee section page
│   ├── header.ejs       # EJS template for the navbar
│   ├── home.ejs         # EJS template for the home page
│   ├── layout.ejs       # EJS template for the layout page
│   ├── signinPage.ejs   # EJS template for the sign-in page
│   └── signupPage.ejs   # EJS template for the sign-up page
├── index.js             # Entry point of the application
├── package-lock.json    # Lock file for npm package versions
├── package.json         # npm package configuration
└── README.md            # Project documentation
