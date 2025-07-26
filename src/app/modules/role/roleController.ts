import { Request, Response } from "express";
import RoleModel from "./roleModel";
import mongoose from "mongoose";

// Create a new role
export const addRole = async (req: Request, res: Response) => {
  try {
    const { batch, subject } = req.body;
    console.log(req.body)
    const isRole = await RoleModel.findOne({ batch, subject });

    if (isRole) {
      return res.status(200).json({ message: "Teacher already assigned to this course" });
    }

    const newRole = await RoleModel.create(req.body);
    return res.status(201).json({
      message: "Teacher role added successfully",
      data: newRole,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all roles
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const { dept, subject, year, term } = req.query;
    console.log(req.query)

    if (!dept || !subject || !year || !term) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const role = await RoleModel.findOne({
      department:dept,
      subject,
      year: Number(year),
      term: Number(term),
    })
      .populate("subject")
      .populate("department")
      .populate("firstEx")
      .populate("secondEx")
      .populate("thirdEx");
  
      //console.log(role)
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json(role);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};




export const getTeacherRoles = async (req: Request, res: Response) => {
  try {
    const {
      teacherId,
      department,
      batch,
      year,
      term,
      subject,
      page = 1,
      limit = 5,
    } = req.query;

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId as string)) {
      return res.status(400).json({ message: "Invalid or missing teacherId" });
    }

    const filter: any = {
      $or: [
        { firstEx: teacherId },
        { secondEx: teacherId },
        { thirdEx: teacherId },
      ],
    };

    if (department) filter.department = department;
    if (batch) filter.batch = batch;
    if (year) filter.year = year;
    if (term) filter.term = term;
    if (subject) filter.subject = subject;

    const skip = (Number(page) - 1) * Number(limit);

    const roles = await RoleModel.find(filter)
      .populate("subject")
      .populate("department")
      .populate("firstEx")
      .populate("secondEx")
      .populate("thirdEx")
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await RoleModel.countDocuments(filter);

    return res.status(200).json({ roles, total });
  } catch (error) {
    console.error("Error fetching teacher roles:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// Get role by ID
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await RoleModel.findById(req.params.id)
      .populate("subject")
      .populate("firstEx")
      .populate("secondEx")
      .populate("thirdEx");

    if (!role) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role fetched successfully", data: role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update role by ID
export const updateRole = async (req: Request, res: Response) => {
  try {
    const updated = await RoleModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role updated successfully", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete role by ID
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await RoleModel.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role deleted successfully", data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
