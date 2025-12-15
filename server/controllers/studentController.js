import Student from "../student/studentModel.js";

// Add Student (USER-SCOPED)
export const addStudent = async (req, res) => {
  const { name, roll, std } = req.body;

  try {
    if (!name || !roll || !std) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    //  check roll uniqueness PER USER
    const existingStudent = await Student.findOne({
      roll,
      user: req.user._id,
    });

    if (existingStudent) {
      return res.json({
        success: false,
        message: "Student with this roll number already exists",
      });
    }

    const student = await Student.create({
      name,
      roll,
      std,
      user: req.user._id, // 🔥 bind student to logged-in user
    });

    res.json({
      success: true,
      student,
      message: "Student added successfully",
    });
  } catch (error) {
    console.error("Error in addStudent:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Edit Student 
export const editStudent = async (req, res) => {
  const { id } = req.params;
  const { name, roll, std } = req.body;

  try {
    if (!name || !roll || !std) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    // find only user's student
    const student = await Student.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!student) {
      return res.json({
        success: false,
        message: "Student not found",
      });
    }

    //  check roll conflict PER USER
    const rollExists = await Student.findOne({
      roll,
      user: req.user._id,
      _id: { $ne: id },
    });

    if (rollExists) {
      return res.json({
        success: false,
        message: "Roll number already assigned to another student",
      });
    }

    student.name = name;
    student.roll = roll;
    student.std = std;

    await student.save();

    res.json({
      success: true,
      student,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.error("Error in editStudent:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

 //Delete Student 
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!student) {
      return res.json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteStudent:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Students 
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({
      user: req.user._id, 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Error in getAllStudents:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
