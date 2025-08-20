import { useEffect, useState } from "react";
import type { Todo } from "../../types";

interface Props {
  todo: Todo;
  onClose: () => void;
  onSave: (patch: { title: string; description?: string; due?: string; done?: boolean }) => void;
}

/** Update modal (U in CRUD). Pure React modal styled like Bootstrap. */
export default function EditModal({ todo, onClose, onSave }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? "");
  const [due, setDue] = useState(todo.due ?? "");
  const [done, setDone] = useState(todo.done);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onSave({ title: t, description: description.trim() || undefined, due: due || undefined, done });
  };

  return (
    <div className="modal-backdrop2" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Edit Task</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Due date</label>
                <input type="date" className="form-control" value={due} onChange={e => setDue(e.target.value)} />
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <div className="form-check">
                  <input
                    id="done"
                    className="form-check-input"
                    type="checkbox"
                    checked={done}
                    onChange={() => setDone(d => !d)}
                  />
                  <label htmlFor="done" className="form-check-label">Mark as done</label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-foot">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-brand text-white">
              <i className="bi bi-save me-1"></i> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
