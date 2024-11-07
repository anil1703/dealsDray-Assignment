import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { routes } from "./Routes/routes.js"
import cors from "cors"


dotenv.config()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(routes)

const dataBaseUrl = process.env.MONGOOSE_URL

// Connect to MongoDB using Mongoose
mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Mongoose connection instance for event listeners
const database = mongoose.connection;

// Handle errors in the connection
database.on("error", () => {
  console.log("Error connecting to database");
});

// Handle successful connection
database.once("connected", () => {
  console.log("Connected to database");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


