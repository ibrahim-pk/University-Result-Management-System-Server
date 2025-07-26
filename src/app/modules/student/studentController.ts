import { Request, Response } from 'express';
import studentModel from './studentModel';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';


// Add new student
export const addStudent = catchAsync(async (req: Request, res: Response) => {
  const existingStudent = await studentModel.findOne({ studentId: req.body.studentId });

  if (existingStudent) {
    return sendResponse(res, {
      statusCode: 409,
      success: false,
      message: 'Student already exists',
      data: null,
    });
  }

  const newStudent = new studentModel(req.body);
  const savedStudent = await newStudent.save();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student added successfully',
    data: savedStudent,
  });
});

// Get all students
export const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const students = await studentModel.find();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All students retrieved successfully',
    data: students,
  });
});

// Get student by studentId
export const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const student = await studentModel.findOne({ studentId: req.params.id });

  if (!student) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Student not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student found',
    data: student,
  });
});

// Get students by batch
export const getStudentByBatch = catchAsync(async (req: Request, res: Response) => {
  const batch = req.query.batch;

  const students = await studentModel.find({ batch });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Students retrieved by batch',
    data: students,
  });
});

// Update student
export const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const updatedStudent = await studentModel.findByIdAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true }
  );

  if (!updatedStudent) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Student not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfully',
    data: updatedStudent,
  });
});

// Delete student
export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);

  if (!deletedStudent) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Student not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent,
  });
});
