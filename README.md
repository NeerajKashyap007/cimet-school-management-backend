This is a backend API for managing schools, users, students, teachers, classes, subjects, and assignments. It is built using Node.js, Express, and MongoDB.

Features
1)Authentication: Secure login and signup routes for users.
2)School Management: Manage schools, teachers, students, and class details.
3)Assignment Management: Create assignments, track submissions, and manage subjects.
3)MongoDB: Stores data for all schools, students, and assignments.
4)CORS Enabled: Allows cross-origin requests from trusted frontend applications.

Tech Stack
1)Node.js
2)Express.js
3)MongoDB
4)CORS
5)dotenv

*To start the server use - npm start*

The following routes are available in the API:

General Routes
1)GET /: Returns a welcome message.

Authentication
1)POST /auth/register: Register a new user.
2)POST /auth/login: User login.

Schools
1)GET /api/schools: List all schools.
2)POST /api/schools: Create a new school.

Users
1)GET /user: Get user details.
2)POST /user: Add a new user.

Students
1)GET /student: List all students.
2)POST /student: Add a new student.

Teachers
1)GET /teacher: List all teachers.
2)POST /teacher: Add a new teacher.

Classes
1)GET /class: List all classes.
2)POST /class: Add a new class.

Subjects
1)GET /subject: List all subjects.
2)POST /subject: Add a new subject.

Assignments
1)GET /assignment: List all assignments.
2)POST /assignment: Create a new assignment.

Assignment Submissions
1)GET /submission: List all assignment submissions.
2)POST /submission: Submit an assignment.
