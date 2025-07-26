import { Router } from "express";
import { getBatchResult, getResultByTeacherCourse, getStudentTranscript, submitMarks } from "./resultController";


const resultRouter = Router();

// resultRouter.post("/results", addResult);
// resultRouter.get("/results-bycourse", getResultsByCourse);
// resultRouter.get("/results", getAllResults);
// resultRouter.get("/results/:studentId", getResultsByStudentId);
// resultRouter.put("/results/:id", updateResult);
// resultRouter.delete("/results/:id", deleteResult);


resultRouter.post("/submit-marks", submitMarks);
resultRouter.get("/result-by-teacher", getResultByTeacherCourse);
resultRouter.get("/result-by-batch",getBatchResult);
resultRouter.get("/result-by-student",getStudentTranscript);
export default resultRouter;
