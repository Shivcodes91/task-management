const BASE_URL = "https://task-management-production-084d.up.railway.app/api";

// ---------------- AUTH ----------------

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("msg").innerText = data.error || "Login failed";
    }
  } catch (err) {
    console.error("Login error:", err);
  }
}

function getToken() {
  return localStorage.getItem("token");
}

// ---------------- PROJECTS ----------------

async function loadProjects() {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    const data = await res.json();

    const list = document.getElementById("projects");
    list.innerHTML = "";

    data.forEach(p => {
      const li = document.createElement("li");
      li.innerText = `#${p.id} - ${p.name}`;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

async function createProject() {
  const name = document.getElementById("projectName").value;

  if (!name) {
    alert("Project name required");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("projectName").value = "";
      loadProjects();
    } else {
      alert(data.message || "Error creating project");
    }

  } catch (err) {
    console.error("Create project error:", err);
  }
}

// ---------------- TASKS ----------------

async function createTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDesc").value;
  const project_id = document.getElementById("projectId").value;
  const assigned_to = document.getElementById("assignedTo").value;
  const due_date = document.getElementById("dueDate").value;

  // Validation
  if (!title || !project_id) {
    alert("Please fill required fields (Title & Project ID)");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        title,
        description,
        project_id,
        assigned_to,
        due_date
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Clear inputs
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskDesc").value = "";
      document.getElementById("projectId").value = "";
      document.getElementById("assignedTo").value = "";
      document.getElementById("dueDate").value = "";

      loadTasks(); // auto refresh
    } else {
      alert(data.message || "Error creating task");
    }

  } catch (err) {
    console.error("Create task error:", err);
  }
}

async function loadTasks() {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    const data = await res.json();

    const list = document.getElementById("tasks");
    list.innerHTML = "";

    let total = data.length;
    let completed = 0;
    let pending = 0;
    let overdue = 0;

    const today = new Date().toISOString().split("T")[0];

    data.forEach(t => {
      const li = document.createElement("li");

      li.innerHTML = `
        <b>${t.title}</b> - ${t.status}
        <button onclick="updateTask(${t.id})">Done</button>
      `;

      // Status
      if (t.status === "done") {
        completed++;
        li.classList.add("done");
      } else {
        pending++;
      }

      // Overdue
      if (t.due_date < today && t.status !== "done") {
        overdue++;
        li.classList.add("overdue");
      }

      list.appendChild(li);
    });

    // Stats
    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completed;
    document.getElementById("pending").innerText = pending;
    document.getElementById("overdue").innerText = overdue;

  } catch (err) {
    console.error("Load tasks error:", err);
  }
}

async function updateTask(id) {
  try {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status: "done" })
    });

    loadTasks();

  } catch (err) {
    console.error("Update task error:", err);
  }
}