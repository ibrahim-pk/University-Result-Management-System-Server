import { Types } from "mongoose";

export interface IPart {
  label: string;
  mark: number;
}

export interface IQuestion {
  question: string;
  parts: IPart[];
  subTotal: number;
}

export interface IResultSheet {
  studentId: string;
  batch: number;
  year: number;
  term: number;
  deptName: Types.ObjectId;
  courseCode: Types.ObjectId;
  teacherId: Types.ObjectId;
  role: 'firstEx' | 'secondEx' | 'thirdEx';
  questions: IQuestion[];
  ct?: number;
  attendance?: number;
  remark?: string;
  total?: number;
  grade?: string;
  gpa?: number;
}
