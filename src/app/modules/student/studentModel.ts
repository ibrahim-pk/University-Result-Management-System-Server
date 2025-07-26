import mongoose, { model } from "mongoose";
import { IStudent } from "./studentInterface";

const studentSchema = new mongoose.Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  studentId: { type: String, required: true },
  dept: { type: String, required: true },
  phone: { type: Number, required: true },
  session: { type: String, required: true },
  batch: { type: Number, required: true },
});

const studentModel = model<IStudent>("Students", studentSchema);

export default studentModel;
