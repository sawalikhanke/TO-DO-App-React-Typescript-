import { useEffect, useMemo, useState } from "react";
import type { Todo } from "../types";
import { loadTodos, saveTodos } from "../utils/Storage";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import EditModal from "./modals/EditModals";

type Filter = "all" | "active" | "completed";

const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<Todo | null>(null);
  const [query, setQuery] = useState("");

  // Load & persist
  useEffect(() => setTodos(loadTodos()), []);
  useEffect(() => saveTodos(todos), [todos]);

  // Derived views
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos
      .filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        return true;
      })
      .filter(t =>
        q ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(q) : true
      )
      .sort((a, b) => Number(a.done) - Number(b.done) || a.title.localeCompare(b.title));
  }, [todos, filter, query]);

  // CRUD actions
  const createTodo = (title: string, description?: string, due?: string) => {
    const newTodo: Todo = {
      id: makeId(),
      title: title.trim(),
      description: description?.trim() || undefined,
      due: due || undefined,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, upd: Partial<Omit<Todo, "id" | "createdAt">>) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...upd } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleDone = (id: string) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.done));
  };

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.done).length,
    completed: todos.filter(t => t.done).length,
  };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <div className="card card-elevated">
          <div className="card-body">
            <h2 className="h5 mb-3">Create a Task</h2>
            <TodoForm onCreate={createTodo} />
            <hr className="my-4" />
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <span className="badge text-bg-light">
                Total: <strong>{stats.total}</strong>
              </span>
              <span className="badge text-bg-primary">
                Active: <strong>{stats.active}</strong>
              </span>
              <span className="badge text-bg-success">
                Completed: <strong>{stats.completed}</strong>
              </span>
              <button
                className="btn btn-sm btn-outline-danger ms-auto"
                onClick={clearCompleted}
                disabled={!stats.completed}
                title="Remove all completed"
              >
                <i className="bi bi-trash3 me-1"></i> Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="card card-elevated">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h5 mb-0">Your Tasks</h2>
              <div className="ms-auto d-flex gap-2">
                <div className="btn-group" role="group" aria-label="Filter">
                  <button
                    className={`btn btn-sm ${filter === "all" ? "btn-brand text-white" : "btn-outline-secondary"}`}
                    onClick={() => setFilter("all")}
                  >All</button>
                  <button
                    className={`btn btn-sm ${filter === "active" ? "btn-brand text-white" : "btn-outline-secondary"}`}
                    onClick={() => setFilter("active")}
                  >Active</button>
                  <button
                    className={`btn btn-sm ${filter === "completed" ? "btn-brand text-white" : "btn-outline-secondary"}`}
                    onClick={() => setFilter("completed")}
                  >Completed</button>
                </div>
                <input
                  className="form-control form-control-sm"
                  placeholder="Search…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </div>

            <TodoList
              todos={filtered}
              onToggle={toggleDone}
              onEdit={t => setEditing(t)}
              onDelete={deleteTodo}
            />

            {!filtered.length && (
              <div className="text-center text-muted py-4">
                <i className="bi bi-inboxes display-6 d-block mb-2"></i>
                <div>No tasks match your filter.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <EditModal
          todo={editing}
          onClose={() => setEditing(null)}
          onSave={(patch) => {
            updateTodo(editing.id, patch);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
