export interface Todo {
  id: string;
  title: string;
  description?: string;
  due?: string;       
  done: boolean;
  createdAt: string;  
}
