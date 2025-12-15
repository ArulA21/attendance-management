import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/studentContext";
import { AuthContext } from "../../context/userContext";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const MarkAttendance = () => {
  const { students } = useContext(StudentContext);
  const { token } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 🔹 Initialize attendance when students / month changes
  useEffect(() => {
    if (!token || students.length === 0) {
      setAttendance({});
      return;
    }

    const init = {};
    students.forEach((s) => {
      init[s._id] = {};
      days.forEach((d) => {
        init[s._id][d] = false;
      });
    });

    setAttendance(init);
  }, [students, month, year, token]);

  // 🔹 Fetch attendance from DB
  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get(
        `/attendance/month?month=${month}&year=${year}`
      );

      if (data.success) {
        const fetched = {};

        data.attendance.forEach((a) => {
          fetched[a.student._id] = a.records;
        });

        setAttendance((prev) => ({ ...prev, ...fetched }));
      }
    } catch {
      toast.error("Failed to load attendance");
    }
  };

  // 🔹 React to token/month/year changes
  useEffect(() => {
    if (!token) return;
    fetchAttendance();
  }, [month, year, token]);

  // 🔹 Toggle checkbox
  const toggleAttendance = (studentId, day) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [day]: !prev[studentId]?.[day],
      },
    }));
  };

  // 🔹 Save attendance
  const saveAttendance = async () => {
    try {
      for (const studentId in attendance) {
        await axios.post("/attendance/save", {
          studentId,
          month,
          year,
          records: attendance[studentId],
        });
      }
      toast.success("Attendance saved");
    } catch {
      toast.error("Save failed");
    }
  };

  if (!token) return null;

  return (
    <div className="overflow-x-auto w-[900px]">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="month"
          value={`${year}-${String(month + 1).padStart(2, "0")}`}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border p-2 rounded"
        />

        <button
          onClick={saveAttendance}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Attendance
        </button>
      </div>

      <table className="border-collapse min-w-max">
        <thead>
          <tr>
            <th className="border p-2 sticky left-0 bg-white">Student</th>
            {days.map((d) => (
              <th key={d} className="border p-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2 sticky left-0 bg-white">
                {student.name}
              </td>

              {days.map((d) => (
                <td key={d} className="border text-center">
                  <input
                    type="checkbox"
                    checked={attendance[student._id]?.[d] || false}
                    onChange={() => toggleAttendance(student._id, d)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
