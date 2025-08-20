import { useState } from "react";

interface Props {
  onCreate: (title: string, description?: string, due?: string) => void;
}

/** Create form (C in CRUD). Uses Bootstrap inputs & validation feedback. */
export default function TodoForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onCreate(t, description, due);
    setTitle(""); setDescription(""); setDue("");
  };

  return (
    <form onSubmit={submit} className="vstack gap-3">
      <div>
        <label className="form-label">Title <span className="text-danger">*</span></label>
        <input
          className="form-control"
          placeholder="e.g. Finish TypeScript practice"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {!title.trim() && <div className="form-text text-danger">Title is required</div>}
      </div>

      <div>
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Optional notes…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="flex-grow-1">
          <label className="form-label">Due date</label>
          <input
            type="date"
            className="form-control"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-accent align-self-end">
          <i className="bi bi-plus-lg me-1"></i>
          Add Task
        </button>
      </div>
    </form>
  );
}
