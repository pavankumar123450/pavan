import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/datePicker.css";
import * as Yup from "yup";
import { editEmployee, findEmployeeById } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";

function DatePickerFiled({ field, form }) {
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => {
        console.log(field.name);
        form.setFieldValue(field.name, date);
      }}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="Select date"
    />
  );
}

export default function EditEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    const getEmployeeData = async () => {
      const response = await findEmployeeById(authUser, employeeId);
      setEmployeeData(response);
    };
    getEmployeeData();
  }, [authUser, employeeId]);

  const initialValue = {
    employeeName: employeeData.employeeName,
    dateJoin: employeeData.dateJoin,
    managerId: employeeData.managerId,
    employeeEmail: employeeData.employeeEmail,
    employeePhone: employeeData.employeePhone,
  };
  const createSchema = Yup.object().shape({
    employeeName: Yup.string().required("Employee Name is required"),
    dateJoin: Yup.date().required("Date of Join is required"),
    managerId: Yup.number().required("Manager ID is required"),
    employeeEmail: Yup.string().required("Employee Email is required"),
    employeePhone: Yup.string().required("Employee Phone is required"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      await editEmployee(authUser, value, employeeId);
      navigate("/employee");
    } catch (error) {
      setStatus("Create employee failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <title>Create Employee</title>
      <div class="container my-4">
        <div class="row">
          <div class="col-md-8 mx-auto rounded border p-4">
            <h2 class="text-center mb-5">New Employee</h2>

            <Formik
              enableReinitialize
              initialValues={initialValue}
              validationSchema={createSchema}
              onSubmit={onSubmit}
            >
              {({ status }) => (
                <Form>
                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Employee Name</label>
                    <div class="col-sm-8 align-items-start">
                      <Field
                        type="text"
                        class="form-control"
                        name="employeeName"
                      />
                      <ErrorMessage
                        name="employeeName"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Date of Join</label>
                    <div class="col-sm-8">
                      <Field
                        type="date"
                        class="form-control"
                        name="dateJoin"
                        component={DatePickerFiled}
                      />
                      <ErrorMessage
                        name="dateJoin"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Manager ID</label>
                    <div class="col-sm-8">
                      <Field
                        type="number"
                        class="form-control"
                        name="managerId"
                      />
                      <ErrorMessage
                        name="managerId"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">
                      Employee Email
                    </label>
                    <div class="col-sm-8">
                      <Field
                        type="text"
                        class="form-control"
                        name="employeeEmail"
                      />
                      <ErrorMessage
                        name="employeeEmail"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">
                      Employee Phone
                    </label>
                    <div class="col-sm-8">
                      <Field
                        type="text"
                        class="form-control"
                        name="employeePhone"
                      />
                      <ErrorMessage
                        name="employeePhone"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="offset-sm-4 col-sm-4 d-grid">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                    <div class="col-sm-4 d-grid">
                      <Link class="btn btn-outline-primary" to="/employee">
                        Cancel
                      </Link>
                    </div>
                  </div>
                  {status && (
                    <p className="text-danger text-center mt-3">{status}</p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
