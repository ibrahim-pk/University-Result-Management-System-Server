import { Router } from "express";
import {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectsByTeamYear,
} from "./subController";

const subRouter = Router();

subRouter.post("/subjects", addSubject);
subRouter.get("/subjects", getAllSubjects);
subRouter.get("/get/yearterm/subjects", getSubjectsByTeamYear);
subRouter.get("/subjects/:id", getSubjectById);
subRouter.put("/subjects", updateSubject);
subRouter.delete("/subjects", deleteSubject);

export default subRouter;
