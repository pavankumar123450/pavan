import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SIgnupPage";
import ProtectedRoute from "./context/ProtectedRoute";
import PublicRoute from "./context/PublicRoute";
import TimesheetPage from "./pages/timesheet/TimesheetPage";
import CreateTimesheet from "./pages/timesheet/Create";
import EmployeePage from "./pages/employee/EmployeePage";
import CreateEmployee from "./pages/employee/Create";
import HrPage from "./pages/hr/HrPage";
import EditEmployee from "./pages/employee/Edit";
import EditTimesheet from "./pages/timesheet/Edit";

function App() {
  return (
    <main style={{ minHeight: "100vh", width: "100vw" }} className="p-3">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet"
          element={
            <ProtectedRoute>
              <TimesheetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet/create"
          element={
            <ProtectedRoute>
              <CreateTimesheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet/edit/:timesheetId"
          element={
            <ProtectedRoute>
              <EditTimesheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/create"
          element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/edit/:employeeId"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr"
          element={
            <ProtectedRoute>
              <HrPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
