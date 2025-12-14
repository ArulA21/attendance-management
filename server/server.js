import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import { checkAuth, login, signup } from './controllers/userController.js';
import { protectRoute } from './auth/auth.js';

dotenv.config();

const app = express();

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

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
