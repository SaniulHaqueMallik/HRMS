import { useState } from "react";
import { markAttendance } from "../services/attendanceService";

function AttendanceForm({ employeeId, onSuccess }) {
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!date) {
      setError("Date is required");
      return;
    }

    setLoading(true);

    try {
      await markAttendance({ employee_id: employeeId, date, status });
      setDate(""); // reset form
      setStatus("Present");
      onSuccess(); // refresh list
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.error || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Mark Attendance</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Mark Attendance"}
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;
