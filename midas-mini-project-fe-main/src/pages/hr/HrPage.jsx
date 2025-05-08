import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHr } from "../../api/api";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";

export default function HrPage() {
  const { authUser } = useAuthContext();
  const [hrList, setHrList] = useState([]);

  useEffect(() => {
    const getHrList = async () => {
      try {
        const list = await getAllHr(authUser);
        setHrList(list);
      } catch (error) {
        console.log(error);
      }
    };
    getHrList();
  }, [authUser]);
  return (
    <>
      <title>HR</title>
      <div class="container mt-4">
        <h2 class="text-center">HR Views</h2>

        <div className="mt-4 d-flex justify-content-end">
          <Link to="/" class="btn btn-primary mb-3">
            Home
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Manager Name</th>
              <th>Submission Date</th>
              <th>Approval Status</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {hrList.map((item, index) => (
              <tr key={index}>
                <td>{item.employeeName}</td>
                <td>{item.managerName}</td>
                <td>
                  {item.submissionDate === null
                    ? "-"
                    : format(item.submissionDate, "yyyy-MM-dd")}
                </td>
                <td>{item.approvalStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
