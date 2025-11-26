let tasks = [
  { id: 1, title: "Learn Kubernetes", status: "pending" },
  { id: 2, title: "Go for a Walk", status: "done" }
];

export const listTasks = (req, res) => {
  res.json(tasks);
};

export const addTask = (req, res) => {
  const { title, status } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    status: status || "pending"
  };
  tasks.push(newTask);
  res.json({ message: "Task added", task: newTask });
};
