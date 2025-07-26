import mongoose, { model, Schema, Types } from "mongoose";
import { IRole } from "./roleInterface";

const roleSchema=new Schema<IRole>({
    subject:{type:Schema.Types.ObjectId,ref:"Subject",required:true},
    department:{type:Schema.Types.ObjectId,ref:"Department",required:true},
    batch:{type:Number,required:true},
    year:{type:Number,required:true},
    term:{type:Number,required:true},
    firstEx:{type:Schema.Types.ObjectId,ref:"Teacher",required:true},
    secondEx:{type:Schema.Types.ObjectId,ref:"Teacher",required:true},
    thirdEx:{type:Schema.Types.ObjectId,ref:"Teacher",required:true},

})

const RoleModel=model("Role",roleSchema)

export default RoleModel