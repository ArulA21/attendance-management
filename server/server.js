import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import { checkAuth, login, signup } from './controllers/userController.js';
import { protectRoute } from './auth/auth.js';
import { addStudent, deleteStudent, editStudent, getAllStudents } from './controllers/studentController.js';
import { getAttendanceByMonth, saveAttendance } from './controllers/attendanceController.js';

dotenv.config();

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("server is running")
})

app.post("/signup", signup);
app.post("/login", login);
app.post("/auth/check", protectRoute, checkAuth);

// add students
app.post('/student/add', protectRoute, addStudent);
app.put('/student/edit/:id',protectRoute, editStudent);
app.delete('/student/delete/:id',protectRoute, deleteStudent);
app.get('/student/all',protectRoute, getAllStudents);

//attendance
app.post("/attendance/save",protectRoute, saveAttendance);
app.get("/attendance/month",protectRoute, getAttendanceByMonth);

if(process.env.NODE_ENV !== 'production'){
  const PORT = process.env.PORT || 5000;      
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
// Export the server for vercel deployment
export default app;
