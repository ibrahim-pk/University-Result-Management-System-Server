import mongoose, { model } from "mongoose";
import { ITeacher } from "./teacherInterface";

const teacherSchema = new mongoose.Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dept: { type: String, required: true },
  designation: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ["admin", "teacher", "other"], 
    default: "teacher" 
  }
});

const teacherModel = model<ITeacher>("Teacher", teacherSchema);

export default teacherModel;
