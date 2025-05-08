const BASE_URL = "http://localhost:8082";

export const login = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const { accessToken } = await response.json();

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Register Failed");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimesheet = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createTimesheet = async (token, body) => {
  console.log(body);
  try {
    const response = await fetch(`${BASE_URL}/timesheet/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed create timesheet.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const findTimesheetById = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed get timesheet.");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editTimesheet = async (token, body, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTimesheet = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed delete timesheet.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllEmployee = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = async (token, body) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed create employee.");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const findEmployeeById = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed get employee.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editEmployee = async (token, body, id) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed edit employee.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllHr = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/hr/viewHR`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
