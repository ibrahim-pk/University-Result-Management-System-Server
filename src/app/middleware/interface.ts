export type IGenericErrorMessage = {
    path: string | number;
    message: string;
  };

export type IGenericResponseMessage={
    statusCode:number,
    message:string,
    errorMessages:IGenericErrorMessage[]
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
  };

   