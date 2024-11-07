import mongoose from "mongoose";
import { dbUrlAdmin } from "../Model/Admin.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { Employee } from "../Model/Admin.js";

dotenv.config()


export async function loginToAdminService(username,password) {
    try {
        console.log("helllo")
        // Ensure username and password are provided
        if (!username || !password) {
            return {
                status: 400,
                message: "Username and password are required"
            };
        }

        // Find user in the database
        const response = await dbUrlAdmin.findOne({ username });
        console.log("res",response)
        if (response) {
            // Compare the password
            const isValidPassword = await bcrypt.compare(password, response.password);

            if (isValidPassword) {
                // Create JWT payload
                const setPayload = {
                    username: username,
                
                };

                // Generate JWT token
                const token = jwt.sign(setPayload, process.env.SECRET_KEY, { expiresIn: '24h' });

                return {
                    status: 200,
                    message: {
                      message:  "Logged in successfully",
                    jwt_token: token
                    }
                };
            } else {
                return {
                    status: 400,
                    message: "Incorrect password"
                };
            }
        } else {
            return {
                status: 400,
                message: "User doesn't exist"
            };
        }
    } catch (error) {
        // Error handling
        return {
            status: 500,
            message: "An error occurred during login",
            error: error.message
        };
    }
}


export async function getEmployeeListService() {
    try{
        const response = await Employee.find();
        return {status:200,response}
    }
    catch(error){
        console.log(error)
        return {
            status: 500,
            message: "An error occurred during Fetching eployees",
            error: error.message
        };
    }
}

export async function createEmployeeService(data) {

    const count = await Employee.countDocuments();
    const f_Id = `DD-${count + 2}`
    try {
        if (!data.f_Id) {
            const count = await Employee.countDocuments();
            data.f_Id = `DD-${count + 1}`;
        }
        const response = await Employee.insertMany(data)
        return {status:200,message:"Employee Details Created"}
    }
    catch(error){
        console.log(error)
        return {
            status: 500,
            message: "An error occurred during Creating eployees",
            error: error.message
        };
    }
}

export async function updateEmployeeDataSerice(id,body) {
    try{
        const response = await Employee.updateOne({f_Id: id }, body)
        return {status:200,message:"Employee Details Updated"}
    }
    catch(error){
        console.log(error)
        return {
            status: 500,
            message: "An error occurred during Updating  eployees",
            error: error.message
        };
    }

}

export async function deleteEmployeeService(id) {
    try{
        const response = await Employee.deleteOne({f_Id: id })
        return {status:200,message:"Employee Details Deleted"}
    }
    catch(error){
        console.log(error)
        return {
            status: 500,
            message: "An error occurred during Deleting  eployees",
            error: error.message
        };
    }
    
}