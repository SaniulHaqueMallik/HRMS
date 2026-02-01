import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../services/employeeService";

function EmployeeList({ refreshKey, onSelect }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployees = () => {
    setLoading(true);
    fetchEmployees()
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setEmployees(res.data.data);
        } else {
          setError("Invalid response format");
        }
      })
      .catch(() => setError("Failed to fetch employees"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEmployees();
  }, [refreshKey]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      loadEmployees(); // refresh after delete
    } catch {
      alert("Failed to delete employee");
    }
  };

  const handleRowClick = (emp) => {
    if (onSelect) onSelect(emp);
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                style={{ cursor: "pointer", }}
                onClick={() => handleRowClick(emp)}
              >
                <td style={{ color: "blue" }}>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(emp.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
