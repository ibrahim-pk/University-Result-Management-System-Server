import { Request, Response } from "express";
import bcrypt from "bcrypt";
import teacherModel from "./teacherModel";

import { createToken } from "../../../helpers/jwt";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

// Add new teacher
export const addTeacher = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, dept, designation, role, subjectCode } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newTeacher = new teacherModel({
    name,
    email,
    password: hashedPassword,
    dept,
    designation,
    role,
    subjectCode,
  });

  const savedUser = await newTeacher.save();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Teacher added successfully",
    data: savedUser,
  });
});

// Login
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await teacherModel.findOne({ email });

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = createToken({ email: user.email, role: user.role });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      token,
      user,
    },
  });
});

// Get all teachers
export const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const teachers = await teacherModel.find();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All teachers retrieved",
    data: teachers,
  });
});

// Get teacher by ID
export const getTeacherById = catchAsync(async (req: Request, res: Response) => {
  const teacher = await teacherModel.findById(req.params.id);

  if (!teacher) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Teacher not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Teacher retrieved",
    data: teacher,
  });
});

// Update teacher
export const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const updatedTeacher = await teacherModel.findByIdAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true }
  );

  if (!updatedTeacher) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Teacher not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Teacher updated successfully",
    data: updatedTeacher,
  });
});

// Delete teacher
export const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const deletedTeacher = await teacherModel.findByIdAndDelete(req.params.id);

  if (!deletedTeacher) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Teacher not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Teacher deleted successfully",
    data: deletedTeacher,
  });
});
