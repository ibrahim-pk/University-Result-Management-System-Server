export interface ITeacher {
    name: string;
    email: string;
    password: string;
    dept:string;
    designation: string;
    role: "admin" | "teacher" | "other";
  }
  