import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

/** Read list + item actions (R/D in CRUD). */
export default function TodoList({ todos, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="list-group">
      {todos.map(t => (
        <div key={t.id} className="todo-row">
          <div className="pt-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
              title="Toggle done"
            />
          </div>

          <div>
            <div className={`todo-title ${t.done ? "done" : ""}`}>{t.title}</div>
            {t.description && <div className="todo-meta">{t.description}</div>}
            <div className="todo-meta">
              <i className="bi bi-calendar-event me-1"></i>
              {t.due ? `Due: ${t.due}` : "No due date"}
              <span className="ms-2">•</span>
              <span className="ms-2">Created: {new Date(t.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(t)}>
              <i className="bi bi-pencil-square"></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
