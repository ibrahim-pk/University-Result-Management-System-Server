import { Request, Response } from 'express';
import departmentModel from '../department/deptModel';
import subjectModel from './subModel';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';


// Add Subject
export const addSubject = catchAsync(async (req: Request, res: Response) => {
  const { department, ...subjectData } = req.body;

  const isDepartment = await departmentModel.findOne({ deptName: department });
  if (!isDepartment) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Department not found',
      data: null,
    });
  }

  const newSubject = new subjectModel({ ...subjectData, department });
  const savedSubject = await newSubject.save();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subject added successfully',
    data: savedSubject,
  });
});

// Get all subjects
export const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const subjects = await subjectModel.find({}).populate('department');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subjects retrieved successfully',
    data: subjects,
  });
});

// Get subject by ID
export const getSubjectById = catchAsync(async (req: Request, res: Response) => {
  const subject = await subjectModel.findById(req.params.id).populate('department');

  if (!subject) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Subject not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subject found',
    data: subject,
  });
});

// Get subjects by term and year
export const getSubjectsByTeamYear = catchAsync(async (req: Request, res: Response) => {
  const { term, year } = req.query;

  const subjects = await subjectModel
    .find({ year: year as string, term: term as string })
    .populate('department');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subjects retrieved for term and year',
    data: subjects,
  });
});

// Update subject
export const updateSubject = catchAsync(async (req: Request, res: Response) => {


  const updatedSubject = await subjectModel
    .findByIdAndUpdate(req.body.id, req.body, { new: true })
    .populate('department');

  if (!updatedSubject) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Subject not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subject updated successfully',
    data: updatedSubject,
  });
});

// Delete subject
export const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const deletedSubject = await subjectModel.findByIdAndDelete(req.params.id);

  if (!deletedSubject) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Subject not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subject deleted successfully',
    data: deletedSubject,
  });
});
