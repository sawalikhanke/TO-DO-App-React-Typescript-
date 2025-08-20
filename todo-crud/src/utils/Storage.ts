import type { Todo } from "../types";

const KEY = "todos-v1";

export const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};
