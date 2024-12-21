"use client";
import React, { useState, useEffect } from "react";
import "./todo.css";

export default function Todo() {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskColor, setTaskColor] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const colors = [
    "#4A593D",
    "#6C8672",
    "#8BA382",
    "#D99E73",
    "#F2C78F",
    "#FF5E57",
    "#D9534F",
    "#A9C1A9",
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost/web_project_bfcai/getTasks.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim() || !taskDetails.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = {
      name: taskName.trim(),
      details: taskDetails.trim(),
      color: taskColor || colors[0],
      subtasks: "",
    };

    try {
      let response;
      if (edit !== null) {
        const taskToUpdate = tasks[edit];
        if (!taskToUpdate || !taskToUpdate.tid) {
          throw new Error("Invalid task ID");
        }

        const updateData = {
          ...newTask,
          tid: taskToUpdate.tid,
        };

        response = await fetch(
          "http://localhost/web_project_bfcai/updateTask.php",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
          }
        );
      } else {
        response = await fetch(
          "http://localhost/web_project_bfcai/addTask.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchTasks();
      resetForm();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task. Please try again.");
    }
  };

  const deleteTask = async (tid) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/web_project_bfcai/deleteTask.php?tid=${tid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again.");
    }
  };

  const editTask = (index) => {
    const task = tasks[index];
    setTaskName(task.name);
    setTaskDetails(task.details);
    setTaskColor(task.color);
    setEdit(index);
    setModalOpen(true);
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDetails("");
    setTaskColor(colors[0]);
    setEdit(null);
  };

  return (
    <div className="p-4">
      <div id="task" className="todo-card  ">
        <button
          className="open-modal-button bg-blue-500 hover:bg-blue-600 duration-[0.5s] text-white py-2 px-4 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add New Task
        </button>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Title..."
                className="task-title w-full mb-4 p-2 border rounded"
                required
              />
              <textarea
                value={taskDetails}
                onChange={(e) => setTaskDetails(e.target.value)}
                placeholder="Add Task Details..."
                className="details w-full mb-4 p-2 border rounded"
                required
                rows="3"
              />
              <div className="palette mb-4">
                <h3 className="mb-2 font-medium">Select Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => setTaskColor(color)}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        taskColor === color ? "ring-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  {edit !== null ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {tasks.map((task, index) => (
          <div
            key={`task-${task.tid}`}
            style={{ backgroundColor: task.color || colors[0] }}
            className="card p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-bold mb-2">{task.name}</h2>
            <p className="mb-4">{task.details}</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => editTask(index)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.tid)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
