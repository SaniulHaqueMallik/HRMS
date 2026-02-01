import api from "../api/api";

// GET attendance
export const fetchAttendance = (employeeId) => {
  return api.get(`/api/attendance/?employee_id=${employeeId}`);
};

// POST attendance
export const markAttendance = (payload) => {
  return api.post("/api/attendance/", payload);
};

// DELETE attendance  
export const deleteAttendance = (id) => {
  return api.delete(`/api/attendance/delete/${id}/`);
};
