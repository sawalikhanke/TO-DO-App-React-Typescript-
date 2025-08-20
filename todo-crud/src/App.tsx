import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // ✅ Create
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // ✅ Delete
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Update
  const updateTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // ✅ Toggle Complete
  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="title">✨ My To-Do List</h1>

        {/* Input */}
        <div className="input-section">
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn-add" onClick={addTask}>
            +
          </button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingId === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    className="task-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button className="btn-save" onClick={() => updateTask(task.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`task-text ${task.completed ? "completed" : ""}`}
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.text}
                  </span>
                  <div className="task-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setEditingId(task.id);
                        setEditingText(task.text);
                      }}
                    >
                      ✏️
                    </button>
                    <button className="btn-delete" onClick={() => deleteTask(task.id)}>
                      ❌
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
