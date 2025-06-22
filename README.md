---

# Form Authentication with Node.js, MongoDB, Express.js, Bcrypt, Passport.js, and Multer

This is a simple user authentication system built using **Node.js**, **Express.js**, **MongoDB**, **Bcrypt**, **Passport.js**, and **Multer**. It supports user registration, login, and logout functionalities with secure password hashing, session-based authentication, and profile image upload capability.

🛠️ Technologies Used

* **Node.js** – JavaScript runtime
* **Express.js** – Web application framework
* **MongoDB** – NoSQL database for storing user data
* **Mongoose** – MongoDB object modeling for Node.js
* **Bcrypt** – Password hashing
* **Passport.js** – Authentication middleware
* **Express-Session** – Session management
* **Connect-Flash** – Flash messages for success/error notifications
* **Multer** – Middleware for handling `multipart/form-data` (image/file uploads)

## ✨ Features

* User registration with hashed passwords
* User login with session-based authentication
* Input validation and error handling
* Profile image upload during registration (handled by Multer)
* Logout functionality
* Flash messages for user feedback

## 📁 Project Structure

```
/config          # Passport and database configuration
/models          # Mongoose models
/routes          # Express route definitions
/views           # EJS templates
/public/uploads  # Directory for storing uploaded images
/app.js          # Main application file
```

## 🖼️ Image Upload Info

* Multer is used to handle image uploads on registration.
* Uploaded images are stored in the `public/uploads` directory.
* Make sure this folder exists before testing uploads or it will throw an error.

---

