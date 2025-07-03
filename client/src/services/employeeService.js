import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
});

export const getEmployees = () => api.get("/employees");
export const createEmployee = (data) => api.post(`/employees`, data);
export const getEmployeeById = (id) => api.get(`/employees/employee/${id}`);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export default api;
