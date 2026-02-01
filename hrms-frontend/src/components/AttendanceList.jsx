import { useEffect, useState, useCallback } from "react";
import { fetchAttendance, deleteAttendance } from "../services/attendanceService";

function AttendanceList({ employeeId, refreshKey, onRefresh }) {
  const [attendance, setAttendance] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAttendance = useCallback(() => {
    if (!employeeId) return;

    setLoading(true);
    fetchAttendance(employeeId)
      .then((res) => {
        const data = res.data.data || [];
        setAttendance(data);
        setFiltered(data);
      })
      .catch(() => setError("Failed to fetch attendance"))
      .finally(() => setLoading(false));
  }, [employeeId]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance, refreshKey]);

  // ------------------
  // DATE FILTER
  // ------------------
  const applyFilter = () => {
    let result = attendance;

    if (fromDate) {
      result = result.filter((att) => att.date >= fromDate);
    }
    if (toDate) {
      result = result.filter((att) => att.date <= toDate);
    }

    setFiltered(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await deleteAttendance(id);
    onRefresh(); // triggers refreshKey change
  };

  if (!employeeId) return <p>Select employee to view attendance</p>;
  if (loading) return <p>Loading attendance...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3>Attendance Records</h3>

      <p>
        <b>Total Present Days:</b>{" "}
        {attendance.filter((att) => att.status === "Present").length}
      </p>

      {/* FILTER UI */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button onClick={applyFilter}>Filter</button>
      </div>

      {filtered.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((att) => (
              <tr key={att.id}>
                <td>{att.date}</td>
                <td>{att.status}</td>
                <td>
                  <button onClick={() => handleDelete(att.id)}>
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

export default AttendanceList;
