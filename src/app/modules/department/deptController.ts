import { Request, Response, NextFunction } from 'express';
import departmentModel from './deptModel';

import { CustomType } from './deptInterface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

// Add new department
export const addDepartment = catchAsync(async (req: Request, res: Response) => {
  const { deptName, deptCode } = req.body;
  const newDepartment = new departmentModel({ deptName, deptCode });
  const savedDepartment = await newDepartment.save();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department added successfully',
    data: savedDepartment,
  });
});

// Get all departments
export const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const departments = await departmentModel.find();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Departments retrieved successfully',
    data: departments,
  });
});

// Get single department by ID
export const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const department = await departmentModel.findById(req.params.id);

  if (!department) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Department not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department found',
    data: department,
  });
});

// Update department
export const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const updatedDepartment = await departmentModel.findByIdAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true }
  );

  if (!updatedDepartment) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Department not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department updated successfully',
    data: updatedDepartment,
  });
});

// Delete department
export const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const deletedDepartment = await departmentModel.findByIdAndDelete({ _id: req.params.id });

  if (!deletedDepartment) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Department not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department deleted successfully',
    data: deletedDepartment,
  });
});
