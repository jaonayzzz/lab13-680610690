import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState,useEffect } from "react";

const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: false,
  },
  {
    id: "2",
    title: "Write code",
    description: "Finish project",
    isDone: false,
  },
  {
    id: "3",
    title: "Deploy app",
    description: "Push to Vercel",
    isDone: false,
  },
];

const STORAGE_KEY = "lecture13.tasks";

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks());

  const handleAdd = (newTask: TaskCardProps) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t))
    );
  };

   useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const doneCount = tasks.filter((t) => t.isDone).length;
    const totalCount = tasks.length;
    const percent = Math.round((doneCount / totalCount) * 100);


  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <span className="m-2">All : ({tasks.length}) Done : ({tasks.filter((t) => t.isDone).length})</span>

<div
  className="progress bg-secondary"
  role="progressbar"
  aria-valuenow={percent}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <div className="progress-bar bg-info" style={{ width: `${percent}%` }}>
    {percent}%
  </div>
</div>
        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
