import mongoose, { Schema, model, Document } from "mongoose";
import { IDepartment } from "./deptInterface";

interface IDepartmentDocument extends IDepartment, Document {}

const departmentSchema = new Schema<IDepartmentDocument>({
  deptCode: { type: String, required: true, unique: true },
  deptName: { type: String, required: true },
});

const departmentModel = model<IDepartmentDocument>("Department", departmentSchema);

export default departmentModel;
