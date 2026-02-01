
function Dashboard({ employees, attendance }) {
  const totalEmployees = employees.length;
  const totalAttendance = attendance.length;
  const totalPresent = attendance.filter(a => a.status === "Present").length;
  const totalAbsent = attendance.filter(a => a.status === "Absent").length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Dashboard</h2>

      <table border="1" cellPadding="8">
        <tbody>
          <tr>
            <td>Total Employees</td>
            <td>{totalEmployees}</td>
          </tr>
          <tr>
            <td>Total Attendance Records</td>
            <td>{totalAttendance}</td>
          </tr>
          <tr>
            <td>Total Present</td>
            <td>{totalPresent}</td>
          </tr>
          <tr>
            <td>Total Absent</td>
            <td>{totalAbsent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
