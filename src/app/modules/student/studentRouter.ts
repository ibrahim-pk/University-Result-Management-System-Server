import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentByBatch, getStudentById, updateStudent } from "./studentController";


const studentRouter =Router();

studentRouter.post("/students", addStudent);
studentRouter.get("/students", getAllStudents);
studentRouter.get("/students/:id", getStudentById);
studentRouter.get("/students/get/batch", getStudentByBatch);
studentRouter.put("/students", updateStudent);
studentRouter.delete("/students/:id", deleteStudent);

export default studentRouter;
