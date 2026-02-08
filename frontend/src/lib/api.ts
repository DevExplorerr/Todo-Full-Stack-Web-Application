import axios from "axios";

// 1. Create the base Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Add the Auth Token Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Add Response Interceptor to handle expired sessions (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 4. Define the Helper Methods your components are asking for
const api = {
  // Fetch all tasks
  getTasks: async () => {
    const response = await axiosInstance.get("/tasks/");
    return response.data;
  },

  // Create a new task
  createTask: async (task: { title: string; description?: string }) => {
    const response = await axiosInstance.post("/tasks/", task);
    return response.data;
  },

  // Update a task (e.g., toggle completion)
  updateTask: async (id: string, updates: any) => {
    const response = await axiosInstance.put(`/tasks/${id}`, updates);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },
};

// 5. Export the object
export default api;