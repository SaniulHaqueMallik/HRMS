import { useState } from "react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";

function App() {
  // Used to re-fetch data after create/delete
  const [refreshKey, setRefreshKey] = useState(0);

  // Currently selected employee (for attendance)
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Trigger refresh
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>HRMS</h1>

      {/* EMPLOYEE SECTION */}
      <EmployeeForm onSuccess={triggerRefresh} />

      <EmployeeList
        refreshKey={refreshKey}
        onSelect={(emp) => setSelectedEmployee(emp)}
      />

      {/* ATTENDANCE SECTION */}
      {selectedEmployee && (
        <>
          <hr />

          <h2>
            Attendance for:{" "}
            <span style={{ color: "green" }}>
              {selectedEmployee.full_name}
            </span>
          </h2>

          <AttendanceForm
            employeeId={selectedEmployee.id}
            onSuccess={triggerRefresh}
          />

          <AttendanceList
            employeeId={selectedEmployee.id}
            refreshKey={refreshKey}
            onRefresh={triggerRefresh}
          />
        </>
      )}
    </div>
  );
}

export default App;
