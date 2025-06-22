// app.js

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let todoFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    todos.push({ task, completed: false });
    input.value = "";
    saveTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
}

function setFilter(filter) {
  todoFilter = filter;
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  let filtered = todos;
  if (todoFilter === "completed") filtered = todos.filter(t => t.completed);
  if (todoFilter === "pending") filtered = todos.filter(t => !t.completed);
  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.task}</span>
      <div>
        <button onclick="toggleTodo(${index})">✓</button>
        <button onclick="deleteTodo(${index})">✗</button>
      </div>`;
    list.appendChild(li);
  });
}

function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

function addBlogPost() {
  const title = document.getElementById("blog-title").value.trim();
  const content = document.getElementById("blog-content").value.trim();
  if (title && content) {
    blogs.unshift({ title, content });
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-content").value = "";
    saveBlogs();
  }
}

function deleteBlog(index) {
  blogs.splice(index, 1);
  saveBlogs();
}

function editBlog(index) {
  const blog = blogs[index];
  const newTitle = prompt("Edit Title:", blog.title);
  const newContent = prompt("Edit Content:", blog.content);
  if (newTitle && newContent) {
    blogs[index] = { title: newTitle, content: newContent };
    saveBlogs();
  }
}

function renderBlogs() {
  const container = document.getElementById("blog-list");
  container.innerHTML = "";
  blogs.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "blog-post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="editBlog(${index})">Edit</button>
        <button onclick="deleteBlog(${index})">Delete</button>
      </div>`;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  renderBlogs();
});
