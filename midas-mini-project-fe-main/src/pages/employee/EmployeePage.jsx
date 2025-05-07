import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEmployee, getAllEmployee } from "../../api/api";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import ConfirmDialog from "../../components/ConfirmationModal";

export default function EmployeePage() {
  const { authUser } = useAuthContext();
  const [employeeList, setEmployeeList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const formatDate = (date) => {
    return format(date, "dd/MM/yyyy");
  };

  useEffect(() => {
    const getEmployeeList = async () => {
      const response = await getAllEmployee(authUser);
      setEmployeeList(response);
    };

    getEmployeeList();
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteEmployee(authUser, id);
      const newEmployeeList = employeeList.filter(
        (employee) => employee.id !== id
      );
      setEmployeeList(newEmployeeList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <title>Employee</title>
      <div class="container mt-4">
        <h2 class="text-center">Employee Views</h2>

        <div className="mt-4 d-flex justify-content-between">
          <Link to="/employee/create" class="btn btn-primary mb-3">
            New Employee
          </Link>
          <Link to="/" class="btn btn-primary mb-3">
            Home
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date of Join</th>
              <th>Manager ID</th>
              <th>Employee Email</th>
              <th>Employee Phone</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {employeeList.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.employeeName}</td>
                <td>{formatDate(employee.dateJoin)}</td>
                <td>{employee.managerId}</td>
                <td>{employee.employeeEmail}</td>
                <td>{employee.employeePhone}</td>
                <td>
                  <Link
                    to={`/employee/edit/${employee.id}`}
                    class="btn btn-primary btn-sm me-2"
                  >
                    EDIT
                  </Link>
                  <button
                    onClick={() => setShowDialog(true)}
                    class="btn btn-danger btn-sm"
                  >
                    DELETE
                  </button>
                  <ConfirmDialog
                    show={showDialog}
                    onHide={() => setShowDialog(false)}
                    onConfirm={() => {
                      onDelete(employee.id);
                      setShowDialog(false);
                    }}
                    title="Delete Employee"
                    message={`Are you sure you want to delete ${employee.employeeName}?`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
