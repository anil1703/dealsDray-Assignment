import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import { routes } from "../Routes/routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

// Connect to MongoDB using Mongoose
const databaseUrl = process.env.MONGOOSE_URL;
console.log(databaseUrl);

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Use routes from the router.js file
app.use('/.netlify/functions/api', routes);

// Export the handler for Netlify
export const handler = serverless(app);
