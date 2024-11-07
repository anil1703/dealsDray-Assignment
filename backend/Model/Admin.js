import mongoose from "mongoose";


const loginDb = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const dbUrlAdmin = mongoose.model("user",loginDb)

export {dbUrlAdmin}

const employeeSchema = new mongoose.Schema({
    f_Id: {
      type: String,
      required: true,
        // Ensures the id is unique
    },
    f_Image: {
      type: String,
      required: true,  // URL of the image
    },
    f_Name: {
      type: String,
      required: true,  // Name of the employee
    },
    f_Email: {
      type: String,
      required: true,  // Email of the employee
     
    },
    f_Mobile: {
      type: String,
      required: true,  // Mobile number
    
    },
    f_Designation: {
      type: String,
      required: true,  // Designation of the employee
    },
    f_Gender: {
      type: String,
      required: true,  // Gender of the employee
     
    },
    f_Course: {
      type: Array,
      required: true,  // Course being pursued
    },
    f_CreatedData: {
      type: Date,
      required: true,  // Creation date of the record
      default: Date.now,  // Defaults to the current date if not provided
    },
  });
  
  const Employee = mongoose.model('employees', employeeSchema);

  export {Employee}