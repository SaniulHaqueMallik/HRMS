import api from "../api/api";

export const fetchEmployees = () => {
  return api.get("/api/employees/");
};

export const createEmployee = (payload) => {
  return api.post("/api/employees/", payload);
};

export const deleteEmployee = (id) => {
  return api.delete(`/api/employees/delete/${id}/`);
};
