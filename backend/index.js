import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import resumeRoute from "./routes/resume.route.js";


dotenv.config({});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/resumes", express.static(path.join(__dirname, "uploads/resumes")));
app.use("/profilePics", express.static(path.join(__dirname, "uploads/profilePics")));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8001;

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Backend Server!");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/resume", resumeRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});

