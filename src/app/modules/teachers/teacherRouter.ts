import { Router } from "express";
import { addTeacher, deleteTeacher, getAllTeachers, getTeacherById, login, updateTeacher } from "./teacherController";


const teacherRouter = Router();

teacherRouter.post("/teachers/login",login);
teacherRouter.post("/teachers", addTeacher);
teacherRouter.get("/teachers", getAllTeachers);
teacherRouter.get("/teachers/:id", getTeacherById);
teacherRouter.put("/teachers", updateTeacher);
teacherRouter.delete("/teachers/:id", deleteTeacher);

export default teacherRouter;
