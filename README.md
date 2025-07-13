# 📦 Peer Project Hub – Backend

This is the **Express.js + MongoDB** backend server for the **Peer Project Hub**, a full-stack web application where students can share, explore, and review coding projects.

---

## 🚀 Features

- 🌐 RESTful API endpoints for project management
- 🔐 Firebase Admin integration for secure user operations
- ❤️ Like, 💬 comment, ⭐ save, and ⭐ rate projects
- 🧾 Supports user-authenticated CRUD operations

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **Firebase Admin SDK**
- **Dotenv** for environment variables
- **CORS** for cross-origin requests

---

## 📁 Project Structure

server/
├── config/ # Firebase and DB configs
├── controllers/ # Request handlers
├── middleware/ # Auth middleware
├── models/ # MongoDB schemas
├── routes/ # API routes
├── .env # Environment variables (not committed)
├── .gitignore
├── index.js # Entry point
├── package.json
└── README.md


---

## 🌐 API Endpoints

| Method | Endpoint                | Description                |
|--------|--------------------------|----------------------------|
| GET    | `/api/projects`         | Get all projects           |
| POST   | `/api/projects`         | Create a new project       |
| GET    | `/api/projects/:id`     | Get project by ID          |
| PUT    | `/api/projects/:id/like`| Like or unlike a project   |
| PUT    | `/api/projects/:id/save`| Save or unsave a project   |
| PUT    | `/api/projects/:id/rate`| Rate a project             |
| POST   | `/api/projects/:id/comment` | Comment on a project |

> 🔒 Most routes require authentication via Firebase.

---

## 🔐 Environment Variables (.env)

Create a `.env` file in the root directory and include:

📄 License
This project is licensed under the MIT License.

🧑‍💻 Author
Kavya – GitHub Profile

