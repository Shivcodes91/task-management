# 🧠 Team Task Manager (Full-Stack)

A full-stack web application that allows users to create projects, assign tasks, and track progress with role-based access control (Admin/Member).

---

## 🌐 Live Demo

🔗 Frontend: https://your-frontend-link
🔗 Backend: https://task-management-production-084d.up.railway.app

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Password hashing using bcryptjs
* JWT-based authentication
* Secure token handling via localStorage

---

### 👥 Role-Based Access Control

* **Admin**

  * Create projects
  * Assign tasks
  * Manage members
* **Member**

  * View tasks
  * Update task status

---

### 📁 Project Management

* Create and view projects
* Associate tasks with projects
* Add members to projects

---

### 📝 Task Management

* Create tasks under projects
* Assign tasks to users
* Set due dates
* Track status (todo → done)

---

### 📊 Dashboard

* View all tasks
* Real-time stats:

  * Total tasks
  * Completed
  * Pending
  * Overdue

---

## ⚡ Quick Test (30 seconds)

1. Open the live app
2. Login using demo credentials
3. Click **Load Projects**
4. Create a project
5. Create a task
6. Click **Load Tasks**
7. Mark task as done

---

## 🔐 Demo Credentials

You can directly log in using:

**👉 Quick Login (Open Access)**
Email: [shiv@test.com](mailto:shiv@test.com)
Password: 123456

**Role:** Admin

> You can also create your own account using Signup.

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* LowDB (JSON-based NoSQL)

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Backend: Railway
* Frontend: Netlify / Vercel

---

## ⚙️ API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects`
* POST `/api/projects/:id/add-member`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PATCH `/api/tasks/:id`

---

## 📦 Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
open index.html
```

---

## 🔧 Environment Variables

Create `.env` file in backend:

```env
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ⚠️ Notes

* Uses LowDB (JSON-based database)
* Data may reset on redeploy (expected behavior)
* Designed for demo & assignment purposes

---

## 🎥 Demo Video

📹 Add your demo video link here

---

## 📌 Future Improvements

* Switch to PostgreSQL for production
* Add edit/delete task
* Add filters & search
* Improve UI/UX
* Add notifications

---

## 👨‍💻 Author

**Shivang Rai**
**Roll number : 1220439174**
BTech CSE (AI)
Aspiring Full-Stack Developer 🚀
