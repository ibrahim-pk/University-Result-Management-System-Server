import mongoose, { Schema, Document } from "mongoose";
import { IResultSheet } from "./resultInterface";

interface IResultSheetDoc extends IResultSheet, Document {}

const PartSchema = new Schema({
  label: { type: String, required: true },
  mark: { type: Number, required: true },
});

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  parts: { type: [PartSchema], required: true },
  subTotal: { type: Number, required: true },
});

const ResultSheetSchema = new Schema<IResultSheetDoc>({
  studentId: { type: String, required: true },
  batch: { type: Number, required: true },
  year: { type: Number, required: true },
  term: { type: Number, required: true },
  deptName: { type:Schema.Types.ObjectId, ref:"Department", required: true },
  courseCode: { type:Schema.Types.ObjectId, ref:"Subject", required: true },
  teacherId: { type:Schema.Types.ObjectId, ref:"Teacher", required: true },
  role: { type: String, enum: ['firstEx', 'secondEx', 'thirdEx'], required: true },
  questions: { type: [QuestionSchema], required: true },

  ct: { type: Number },
  attendance: { type: Number },
  remark: { type: String },
  total: { type: Number },
  grade: { type: String },
  gpa: { type: Number },
}, { timestamps: true });

const ResultSheet= mongoose.model<IResultSheetDoc>("ResultSheet", ResultSheetSchema);

export default ResultSheet
