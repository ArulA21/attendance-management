import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/studentContext";
import { AuthContext } from "../../context/userContext";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const Analytics = () => {
  const { students } = useContext(StudentContext);
  const { token } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  const totalStudents = students.length;

  // 🔹 Fetch attendance for month
  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get(
        `/attendance/month?month=${month}&year=${year}`
      );

      if (data.success) {
        const map = {};
        data.attendance.forEach((a) => {
          map[a.student._id] = a.records;
        });
        setAttendanceData(map);
      }
    } catch {
      toast.error("Failed to load analytics");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAttendance();
  }, [month, year, token]);

  // 🔹 Calculate present
  const presentCount = students.reduce((count, student) => {
    return attendanceData[student._id]?.[selectedDay]
      ? count + 1
      : count;
  }, 0);

  const absentCount = totalStudents - presentCount;

  if (!token) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Attendance Analytics</h1>

      {/* Controls */}
      <div className="flex gap-4">
        <input
          type="month"
          value={`${year}-${String(month + 1).padStart(2, "0")}`}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border p-2 rounded"
        />

        <input
          type="number"
          min="1"
          max="31"
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="border p-2 rounded w-[100px]"
          placeholder="Day"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-5 bg-gray-100 rounded shadow">
          <h2 className="text-lg">Total Students</h2>
          <p className="text-3xl font-bold">{totalStudents}</p>
        </div>

        <div className="p-5 bg-green-100 rounded shadow">
          <h2 className="text-lg">Present</h2>
          <p className="text-3xl font-bold text-green-700">
            {presentCount}
          </p>
        </div>

        <div className="p-5 bg-red-100 rounded shadow">
          <h2 className="text-lg">Absent</h2>
          <p className="text-3xl font-bold text-red-700">
            {absentCount}
          </p>
        </div>
      </div>
    </div>
  );
};
