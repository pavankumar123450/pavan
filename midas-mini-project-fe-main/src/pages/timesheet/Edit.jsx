import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/datePicker.css";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import { editTimesheet, findTimesheetById } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DatePickerFiled({ field, form }) {
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => form.setFieldValue(field.name, date)}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="Select date"
    />
  );
}

export default function EditTimesheet() {
  const { timesheetId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [timesheet, setTimesheet] = useState({});

  useEffect(() => {
    const getTimesheet = async () => {
      const response = await findTimesheetById(authUser, timesheetId);
      setTimesheet(response);
    };
    getTimesheet();
  }, [authUser]);

  const initialValue = {
    date: timesheet.date,
    task: timesheet.task,
    hr: timesheet.hr,
    status: timesheet.status,
    remark: timesheet.remark,
    reportStatus: timesheet.reportStatus,
  };
  const createSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    task: Yup.string().required("Task is required"),
    hr: Yup.number().required("HR is required"),
    status: Yup.string(),
    remark: Yup.string(),
    reportStatus: Yup.string().required("Report Status is required"),
  });

  const onSubmit = async (value) => {
    try {
      await editTimesheet(authUser, value, timesheetId);
      navigate("/timesheet");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="container my-4">
      <div class="row">
        <div class="col-md-8 mx-auto rounded border p-4">
          <h2 class="text-center mb-5">Edit Timesheet</h2>

          <Formik
            enableReinitialize
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            <Form>
              {/* <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Username</label>
                <div class="col-sm-8 align-items-start">
                  <Field type="text" class="form-control" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div> */}

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Submit Date</label>
                <div class="col-sm-8">
                  <Field
                    class="form-control"
                    name="date"
                    component={DatePickerFiled}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Task</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="task" />
                  <ErrorMessage
                    name="task"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">HR</label>
                <div class="col-sm-8">
                  <Field type="number" class="form-control" name="hr" />
                  <ErrorMessage
                    name="hr"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Status</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="status" />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Remark</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="remark" />
                  <ErrorMessage
                    name="remark"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              {/* {/* <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Report Manager</label>
                <div class="col-sm-8">
                  <Field
                    type="text"
                    class="form-control"
                    name="reportManager"
                  />
                  <ErrorMessage
                    name="reportManager"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div> */}

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">
                  Report Manager Status
                </label>
                <div class="col-sm-8">
                  <Field class="form-select" name="reportStatus" as="select">
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </Field>
                  <ErrorMessage
                    name="reportStatus"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              {/* <div class="row mb-3">
                <label class="col-sm-4 col-from-label">
                  Report Manager Remark
                </label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="reportRemark" />
                  <ErrorMessage
                    name="reportRemark"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>  */}

              <div class="row">
                <div class="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div class="col-sm-4 d-grid">
                  <Link class="btn btn-outline-primary" to="/timesheet">
                    Cancel
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
