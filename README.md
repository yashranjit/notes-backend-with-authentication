# Notes app backend with authentication

    A simple backend project that provides user authentication and CRUD operations for notes.

## Implementation steps:

1. User Schema:

   - Defined user model with fields: firstName, lastName, email, and password.
   - This schema determines what user information is stored in the DB.

2. Authentication Routes:

   - Implemented POST /auth/signup and POST auth/signin .
   - Input is validated using ZOD before saving or checking credentials.
   - Passwords are hashed using bcrypt.
   - On successful login, a JWT token is issued for authentication.

3. Note Schema:

   - Defined a Note model with fields: title, content, and user (a reference to the User's \_id).
   - This creates a one-to-many relationship: one user can have many notes.

4. Notes Routes:

   - Implemented routes to create, read, update, and delete notes.
   - Each route uses the auth middleware to ensure the user is logged in.

5. Environment Variables:
   - Values like database URL, JWT secret and server port are stored in .env
   - config.js loads and exports these variables safely.

### Authentication flow:

1. User signs up -> details stored in DB (with hashed password).
2. User signs in -> credentials verified -> JWT token issued.
3. User accesses /notes/ routes with authorization token header.
4. Middleware verifies the token and attaches req.userId to identify the user.

### Tools and Libraries:

- JavaScript (Node.js)
- Express.js - http server framework
- Mongoose - MongoDB object modeling
- Zod - input validation
- bcrypt - password hashing
- dotenv - environment variables
- jsonwebtoken - authentication with JWT

### Features:

- User signup & login with JWT authentication
- Create, read, update, and delete personal notes
- Notes are private per user
- Validation for user info input
- Secure handling of passwords and environment variables
