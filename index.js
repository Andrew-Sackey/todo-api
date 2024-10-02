import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";

// connect to database
await mongoose.connect('mongodb+srv://todo-api:todo-api@mywebdevdb.f0dmn.mongodb.net/todo-db?retryWrites=true&w=majority&appName=mywebdevDB');

// create an express app
const app = express();

// Use routes
app.use(todoRouter);
app.use(userRouter);

// Listen for incoming requests
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

