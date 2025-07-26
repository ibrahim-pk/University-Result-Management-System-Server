import { ErrorRequestHandler,NextFunction,Request,Response} from "express"
import { IGenericErrorMessage } from "./interface"
import handleValidationError from "../../errors/ValidationError"
import ApiError from "../../errors/ApiError"
import dotenv from "dotenv";
import { errorLogger } from "../../shared/logger";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";
dotenv.config()


// const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{
//     process.env.NODE_ENV==="development"?
//     console.log(err):errorLogger.error(err)


//     let statusCode=400
//     let message="Something Went Wrong!" 
//     let errorMessages:IGenericErrorMessage[]=[]

//     if (err?.name==="ValidationError"){
//         const errorHandle=handleValidationError(err)
//         statusCode=errorHandle?.statusCode,
//         message=errorHandle?.message,
//         errorMessages=errorHandle?.errorMessages
        

//     }else if (err instanceof ZodError) {
//         const simplifiedError = handleZodError(err);
//         statusCode = simplifiedError.statusCode;
//         message = simplifiedError.message;
//         errorMessages = simplifiedError.errorMessages;
//       }else if(err instanceof ApiError){
//         statusCode=err.statusCode
//         message=err.message
//         errorMessages=err?.message?
//         [
//             {
//                 path:"",
//                 message:err.message
//             }
//         ]:[]

//     }else if(err instanceof Error){
//         message=err.message
//         errorMessages=err?.message?
//         [
//             {
//                 path:"",
//                 message:err.message
//             }
//         ]:[]
//     }

//     res.status(statusCode).json({
//         success:false,
//         message,
//         errorMessages,
//         stack:process.env.NODE_ENV==="development"? err?.stack:undefined
//     })

//     next()
// }

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    process.env.NODE_ENV==="development"?
    console.log(error):errorLogger.error(error)
  
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];
  
    if (error?.name === 'ValidationError') {
      const simplifiedError = handleValidationError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
      const simplifiedError = handleCastError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
      statusCode = error?.statusCode;
      message = error.message;
      errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [];
    } else if (error instanceof Error) {
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [];
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
    });
    
  };
  
  export default globalErrorHandler;