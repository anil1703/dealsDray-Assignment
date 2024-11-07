import express from "express"
import verifyToken from "../middleware.js";
import { loginToAdminController ,getEmployeeListController ,createEmployeeController,updateEmployeeDataController,deleteingEmployeeController} from "../Controller/Admin.js";


const router = express.Router()

router.post("/logintoAdmin",loginToAdminController);


router.get("/getEmployeeList",verifyToken,getEmployeeListController)

router.post("/createEmployee",verifyToken, createEmployeeController)

router.put("/updateEmployee/:id",verifyToken,updateEmployeeDataController)

router.delete("/deleteEmployee/:id",verifyToken,deleteingEmployeeController)

export {router as routes}
