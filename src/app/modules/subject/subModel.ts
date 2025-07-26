import mongoose, { Schema, model, Document } from "mongoose";
import { ISubject } from "./subInterface";

interface ISubjectDocument extends ISubject, Document {}

const subjectSchema = new Schema<ISubjectDocument>({
  subjectCode: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  credit: { type: Number, required: true },
  creditHour: { type: Number, required: true },
  year: { type: Number, required: true }, 
  term: { type: Number, required: true },
  ref: { type: [String]},
  department: { type:String, required: true }, // Reference to department model
});

const subjectModel = model<ISubjectDocument>("Subject", subjectSchema);

export default subjectModel;
