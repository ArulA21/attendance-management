import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { AuthContext } from "./userContext";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/student/all");

      if (data.success) {
        setStudents(data.students);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add student
  const addStudent = async (studentData) => {
    try {
      const { data } = await axios.post("/student/add", studentData);

      if (data.success) {
        toast.success(data.message);
        fetchStudents();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to add student");
    }
  };

  // 🔹 Edit student
  const editStudent = async (id, studentData) => {
    try {
      const { data } = await axios.put(`/student/edit/${id}`, studentData);

      if (data.success) {
        toast.success(data.message);
        fetchStudents();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update student");
    }
  };

  // 🔹 Delete student
  const deleteStudent = async (id) => {
    try {
      const { data } = await axios.delete(`/student/delete/${id}`);

      if (data.success) {
        toast.success(data.message);
        fetchStudents();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to delete student");
    }
  };

  // 🔹 React to auth changes
  useEffect(() => {
    if (!token) {
      setStudents([]);
      return;
    }

    fetchStudents();
  }, [token]);

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        fetchStudents,
        addStudent,
        editStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
