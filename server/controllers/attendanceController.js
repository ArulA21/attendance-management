import Attendance from "../attendance/attendanceModel.js";
// UPDATE attendance for a student + month
export const saveAttendance = async (req, res) => {
  try {
    const { studentId, month, year, records } = req.body;

    if (!studentId || month === undefined || !year || !records) {
      return res.json({ success: false, message: "Missing data" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, month, year },
      { records },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Attendance saved",
      attendance
    });

  } catch (error) {
    console.error("Save attendance error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//GET attendance for a month
export const getAttendanceByMonth = async (req, res) => {
  try {
    const { month, year } = req.query;

    const attendance = await Attendance.find({ month, year })
      .populate("student");

    res.json({
      success: true,
      attendance
    });

  } catch (error) {
    console.error("Fetch attendance error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
