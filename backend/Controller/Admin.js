import { loginToAdminService , getEmployeeListService,createEmployeeService,updateEmployeeDataSerice,deleteEmployeeService} from "../Service/Admin.js";

export async function loginToAdminController(req,res) {
    

        const { username,password} = req.body;
        try{
            const fetching = await loginToAdminService(username,password);
            console.log("Ans",fetching)
            res.status(fetching.status).send(fetching)
        }
       

    
    catch(error){
        console.log(error)
        res.status(error.status).send(error.message)
    }
}


export async function getEmployeeListController(req,res) {
    try{
        const fetching = await getEmployeeListService();
        res.status(fetching.status).send(fetching)
    }
    catch(error){
        console.log(error)
        res.status(error.status).send(error.message)
    }
}


export async function createEmployeeController(req,res) {
    try {
        const data = req.body
        console.log("adata",data)
        const fetching = await createEmployeeService(data);
        res.status(fetching.status).send(fetching.message)
    }
    catch(error){
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export async function updateEmployeeDataController(req,res) {

    try{
        const id = req.params.id 
        const data = req.body
        const fetching = await updateEmployeeDataSerice(id,data)
        res.status(fetching.status).send(fetching.message)
    }
    catch(error){
        console.log(error)
        res.status(error.status).send(error.message)
    }

    
}

export async function deleteingEmployeeController(req,res) {
    try{
        const id = req.params.id
        const fetching = await deleteEmployeeService(id)
        res.status(fetching.status).send(fetching.message)
    }
    catch(error){
        console.log(error)
        res.status(error.status).send(error.message)
    }

}