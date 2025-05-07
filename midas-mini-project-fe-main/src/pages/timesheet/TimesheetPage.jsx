import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { getAllTimesheet, deleteTimesheet } from "../../api/api";
import { format } from "date-fns";
import ConfirmDialog from "../../components/ConfirmationModal";
export default function TimesheetPage() {
  const { authUser } = useAuthContext();
  const [timesheetList, setTimesheetList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const getTimesheet = async () => {
      const response = await getAllTimesheet(authUser);
      setTimesheetList(response);
    };
    getTimesheet();
  }, [authUser]);

  const onDelete = async (id) => {
    try {
      await deleteTimesheet(authUser, id);
      const newTimesheet = timesheetList.filter((item) => item.id != id);
      setTimesheetList(newTimesheet);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="container mt-4">
      <h2 class="text-center">Timesheet Views</h2>

      <div className="mt-4 d-flex justify-content-between">
        <Link to="/timesheet/create" class="btn btn-primary mb-3">
          New Timesheet
        </Link>
        <Link to="/" class="btn btn-primary mb-3">
          Home
        </Link>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Date</th>
            <th>Task</th>
            <th>HR</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Report Manager</th>
            <th>RM Status</th>
            <th>RM Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {timesheetList.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.task}</td>
              <td>{item.hr}</td>
              <td>{item.status}</td>
              <td>{item.remark}</td>
              <td>{item.reportManager}</td>
              <td>{item.reportStatus}</td>
              <td>{item.reportRemark}</td>
              <td className="d-flex gap-3">
                {item.reportStatus !== "Approved" && (
                  <>
                    <Link
                      class="btn btn-primary btn-sm"
                      to={`/timesheet/edit/${item.id}`}
                    >
                      EDIT
                    </Link>

                    <button
                      class="btn btn-danger btn-sm"
                      onClick={() => setShowDialog(true)}
                    >
                      DELETE
                    </button>
                    <ConfirmDialog
                      show={showDialog}
                      onHide={() => setShowDialog(false)}
                      onConfirm={() => {
                        onDelete(item.id);
                        setShowDialog(false);
                      }}
                      title="Delete Employee"
                      message={`Are you sure you want to delete ?`}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
