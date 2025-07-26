import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { errorLogger, successLogger } from "./shared/logger";
dotenv.config();
const PORT = process.env.PORT || 5000;
import {Server} from 'http'

process.on('uncaughtException',(err)=>{
  process.exit(1)
})

let server:Server

const Main = async () => {
  
  await mongoose.connect(process.env.DB_URL as string);
  try {
   server= app.listen(PORT, () => successLogger.info(`server is running port:${PORT}`));
    successLogger.info("DB is connected!");
  } catch (err) {
    errorLogger.error(err);
  }

  process.on('unhandledRejection',(err)=>{
      if(server){
        server.close(()=>{
          errorLogger.error(err)
          process.exit(1)
        })
      }else{
        process.exit(1)
      }
       
  })
};

Main();

process.on('SIGTERM',(error)=>{
  if(server){
    successLogger.info("SIGTERM is recevied")
    server.close()
  }

})




