import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { deleteToken } = useAuthContext();

  const handleLogout = () => {
    deleteToken();
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <div className="d-flex flex-column align-items-center gap-3 mt-3">
        <div className="d-flex gap-1">
          <Link to="/timesheet" className="btn btn-primary">
            Timesheet
          </Link>
          <Link to="/employee" className="btn btn-primary">
            Employee
          </Link>
          <Link to="/hr" className="btn btn-primary">
            HR
          </Link>
        </div>
        <button
          className="btn btn-danger"
          style={{ width: "100px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
