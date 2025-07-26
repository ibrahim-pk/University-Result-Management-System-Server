import { IDepartment } from "../department/deptInterface";

export interface ISubject {
  subjectCode: string;
  title: string;
  credit: number;
  creditHour: number;
  year:number,
  term:number
  ref?: string[]; // array of emails who can access the subject details
  department: IDepartment; // Reference to the department
}
