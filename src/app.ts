import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import studentRouter from './app/modules/student/studentRouter';
import teacherRouter from './app/modules/teachers/teacherRouter';
import resultRouter from './app/modules/result/resultRouter';
import deptRouter from './app/modules/department/deptRouter';
import subRouter from './app/modules/subject/subRouter';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import ApiError from './errors/ApiError';
import roleRouter from './app/modules/role/roleRouter';

const app=express()
app.use(cors())
app.use(express.json());

//routers
app.use("/api", studentRouter);
app.use("/api",teacherRouter);
app.use("/api",resultRouter);
app.use("/api",deptRouter);
app.use("/api",subRouter);
app.use("/api",roleRouter);



app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('Hello Cste')
    //throw new Error("api error")
   //Promise.reject(new Error('Unhandled Promise Rejection'))
   //throw new ApiError(400,"api error")
   //next("internal server error")
   
})


//global error handle
app.use(globalErrorHandler)



export default app