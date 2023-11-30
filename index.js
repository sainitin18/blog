import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

//env config
dotenv.config()

//routes import
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

//mongodb connection
connectDB();

//rest object
const app = express();
const PORT = process.env.PORT || 4000

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1", exportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} port ${PORT}`);
})

