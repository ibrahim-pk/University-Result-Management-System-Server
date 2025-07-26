import { Router } from "express";
import {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "./deptController";
import deptZodValidation from "./deptZodValidation";
import validatedRequest from "../../middleware/validatedRequest";

const deptRouter = Router();

// deptRouter.post("/departments",validatedRequest(deptZodValidation),addDepartment);
deptRouter.post("/departments",addDepartment);
deptRouter.get("/departments", getAllDepartments);
deptRouter.get("/departments/:id", getDepartmentById);
deptRouter.put("/departments", updateDepartment);
deptRouter.delete("/departments/:id", deleteDepartment);

export default deptRouter;
