import { Types } from "mongoose";

export interface IRole{
    subject:Types.ObjectId,
    department:Types.ObjectId,
    batch:number,
    year:number,
    term:number,
    firstEx?:Types.ObjectId,
    secondEx?:Types.ObjectId,
    thirdEx?:Types.ObjectId
    
}