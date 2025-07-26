import express from "express";
import {
  addRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getTeacherRoles,
} from "./roleController";

const roleRouter = express.Router();


roleRouter.post("/role", addRole);
roleRouter.get("/role", getAllRoles);
roleRouter.get("/role/teacher-roles", getTeacherRoles);
roleRouter.get("/role/:id", getRoleById);
roleRouter.put("/role/:id", updateRole);
roleRouter.delete("/role/:id", deleteRole);


export default roleRouter;
