// import { Request, Response } from "express";
// import resultModel from "./resultModel";
// import { CustomType } from "../department/deptInterface";
// import { ICourseResult } from "./resultInterface";

// // export const addResult = async (req: Request, res: Response) => {
// //   try {
// //     //console.log(req.body);
// //     let allResult=req.body
    
// //     allResult&&allResult.length>0&&allResult.map(async(response: any)=>{
// //       const newResult = new resultModel(response);
// //       newResult.calculateTGPA();
// //       //console.log(newResult.studentId);
// //       let savedResult = await newResult.save();
// //        const cgpa = await resultModel.calculateCGPA(newResult.studentId);
// //        //console.log(cgpa);
// //       if (cgpa !== null) {
// //         await resultModel.updateMany({ studentId: newResult.studentId }, { cgpa });
// //       }
// //     })
// //     res.status(200).json("mark upload");
// //   } catch (error) {
// //     res.status(500).json({ message:(error as CustomType).message });
// //   }
// // };


// export const addResult = async (req: Request, res: Response) => {
//   try {
//     const allResults = req.body;
//     console.log("body:",req.body);
//     //console.log(req.body[0]?.courses);

//     for (const response of allResults) {
//       const { studentId, courseCode,year,term, ...rest } = response;
//       //console.log("rest:",rest);
//       const existingResult = await resultModel.findOne({ studentId,year,term });
//       //console.log(response);
//       if (existingResult) {
//         // Check if the course already exists
//         const existingCourse = existingResult.courses.find((course:ICourseResult) => course.courseCode === courseCode);
//         //console.log("exitcourse:",existingCourse);
//         if (existingCourse) {
//           // Update existing course
//           Object.assign(existingCourse, rest?.courses[0]);
//         } else {
//           // Add new course
//           existingResult.courses.push(rest?.courses[0]);
//         }
      
//         existingResult.calculateTGPA();
//         await existingResult.save();

//         const cgpa = await resultModel.calculateCGPA(studentId);
//         if (cgpa !== null) {
//           await resultModel.updateMany({ studentId }, { cgpa });
//         }
//       } else {
//         // If no existing result, create a new one
//         const newResult = new resultModel(response);
//         newResult.calculateTGPA();
//         await newResult.save();

//         const cgpa = await resultModel.calculateCGPA(studentId);
//         if (cgpa !== null) {
//           await resultModel.updateMany({ studentId: newResult.studentId }, { cgpa });
//         }
//       }
//     }

//     res.status(200).json("Marks uploaded successfully");
//   } catch (error) {
//     console.log(error);
//     res.status(200).json({ message: (error as Error).message });
//   }
// };


// export const getResultsByCourse = async (req: Request, res: Response) => {
//   try {
//     const { year, term, courseCode,batch } = req.query;

//     // Matching results for given year & term
//     const existingResults = await resultModel.find({ year, term,batch });

//     if (existingResults.length === 0) {
//       return res.status(200).json({ message: "Results not found" });
//     }

//     // Extract all courses from the matched results
//     const allCourses = existingResults.flatMap(result => result.courses || []);

//     // Find the specific course
//     const existingCourse = allCourses.find((course: ICourseResult) => course.courseCode === courseCode);
     
//     console.log("all:",existingCourse)


//     if (existingCourse) {
//       return res.status(200).json(existingCourse);
//     } else {
//       return res.status(200).json({ result: 0 });
//     }

//   } catch (error) {
//     res.status(500).json({ message: (error as CustomType).message });
//   }
// };



// export const getAllResults = async (req: Request, res: Response) => {
//   try {
//     const results = await resultModel.find();
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ message:(error as CustomType).message });
//   }
// };

// export const getResultsByStudentId = async (req: Request, res: Response) => {
//   try {
//     const results = await resultModel.find({ studentId: req.params.studentId });
//     if (results.length) {
//       res.status(200).json(results);
//     } else {
//       res.status(404).json({ message: "Results not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message:(error as CustomType).message });
//   }
// };

// export const updateResult = async (req: Request, res: Response) => {
//   try {
//     const updatedResult = await resultModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (updatedResult) {
//       updatedResult.calculateTGPA();
//       await updatedResult.save();
//       const cgpa = await resultModel.calculateCGPA(updatedResult.studentId);

//       if (cgpa !== null) {
//         await resultModel.updateMany({ studentId: updatedResult.studentId }, { cgpa });
//       }

//       res.status(200).json(updatedResult);
//     } else {
//       res.status(404).json({ message: "Result not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message:(error as CustomType).message });
//   }
// };

// export const deleteResult = async (req: Request, res: Response) => {
//   try {
//     const deletedResult = await resultModel.findByIdAndDelete(req.params.id);
//     if (deletedResult) {
//       const cgpa = await resultModel.calculateCGPA(deletedResult.studentId);

//       if (cgpa !== null) {
//         await resultModel.updateMany({ studentId: deletedResult.studentId }, { cgpa });
//       }

//       res.status(200).json({ message: "Result deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Result not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message:(error as CustomType).message });
//   }
// };


import { Request, Response } from "express";
import ResultSheet from "./resultModel";
import studentModel from "../student/studentModel";

export const submitMarks = async (req: Request, res: Response) => {
  try {
    const { teacherId, courseCode } = req.body;

    // 1️⃣ Check if result already exists for this teacher and course
    const existing = await ResultSheet.findOne({ teacherId, courseCode });

    if (existing) {
      // 2️⃣ If exists, update
      const updated = await ResultSheet.findOneAndUpdate(
        { teacherId, courseCode },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({ message: "Marks updated successfully", result: updated });
    }

    // 3️⃣ Else, create new
    const result = new ResultSheet(req.body);
    await result.save();

    res.status(201).json({ message: "Marks submitted successfully", result });
  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// export const getResultByTeacherCourse = async (req: Request, res: Response) => {
//   try {
//     const { teacherId, courseCode } = req.query;

//     if (!teacherId || !courseCode) {
//       return res.status(400).json({ message: "teacherId and courseCode are required" });
//     }

//     const results = await ResultSheet.find({ teacherId, courseCode });

//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Get Result Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const getResultByTeacherCourse = async (req: Request, res: Response) => {
  try {
    const { teacherId, studentId, courseCode } = req.query;
    console.log(req.query)
    if (!teacherId || !studentId || !courseCode ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await ResultSheet.find({
      teacherId,
      studentId,
      courseCode,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Get single result error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




// export const getBatchResult = async (req: Request, res: Response) => {
//   try {
//     const { batch, year, term, final } = req.query;

//     if (!batch) {
//       return res.status(400).json({ message: "Batch is required" });
//     }

//     let filter: any = { batch: parseInt(batch as string) };

//     // Final result means across all years/terms
//     if (!final) {
//       if (!year || !term) {
//         return res.status(400).json({ message: "Year and Term required for term result" });
//       }
//       filter.year = parseInt(year as string);
//       filter.term = parseInt(term as string);
//     }

//     // 1️⃣ Fetch all resultSheets for the batch (filtered by term if needed)
//     const allResults = await ResultSheet.find(filter);

//     // 2️⃣ Group by studentId
//     const grouped: Record<string, any[]> = {};
//     for (const r of allResults) {
//       const sid = r.studentId;
//       if (!grouped[sid]) grouped[sid] = [];
//       grouped[sid].push(r);
//     }

//     // 3️⃣ Calculate result for each student
//     const response = Object.entries(grouped).map(([studentId, results]) => {
//       let totalGpaPoints = 0;
//       let totalCredits = 0;
//       let completedCredits = 0;

//       for (const r of results) {
//         const gpa = r.gpa || 0;
//         const credit = 3;

//         totalGpaPoints += gpa * credit;
//         totalCredits += credit;

//         if (gpa > 0) completedCredits += credit;
//       }

//       const TGPA = !final ? parseFloat((totalGpaPoints / totalCredits).toFixed(2)) : undefined;
//       const CGPA = parseFloat((totalGpaPoints / totalCredits).toFixed(2));
//       const remarks = completedCredits === totalCredits ? "Completed" : "Incomplete";

//       return {
//         studentId,
//         term: final ? undefined : `${results[0].year}-${results[0].term}`,
//         TGPA,
//         CGPA,
//         totalCredits,
//         completedCredits,
//         remarks,
//       };
//     });

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("getBatchResult Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };






// export const getBatchResult = async (req: Request, res: Response) => {
//   try {
//     const { batch, year, term, final } = req.query;

//     if (!batch) {
//       return res.status(400).json({ message: "Batch is required" });
//     }

//     const isTerm = year && term && !final;

//     const matchStage: any = {
//       batch: Number(batch),
//     };

//     const results = await ResultSheet.aggregate([
//       { $match: matchStage },

//       // Group multiple examiner marks for the same subject
//       {
//         $group: {
//           _id: {
//             studentId: "$studentId",
//             courseCode: "$courseCode",
//             year: "$year",
//             term: "$term",
//           },
//           gpas: { $push: "$gpa" },
//           batch: { $first: "$batch" },
//         },
//       },

//       // Calculate average GPA per subject
//       {
//         $project: {
//           studentId: "$_id.studentId",
//           courseCode: "$_id.courseCode",
//           year: "$_id.year",
//           term: "$_id.term",
//           batch: 1,
//           avgGpa: { $round: [{ $avg: "$gpas" }, 2] },
//           credit: {
//             $cond: [
//               { $gt: [{ $avg: "$gpas" }, 0] },
//               3, // completed subject
//               0, // failed
//             ],
//           },
//         },
//       },

//       // Group all subject results per student
//       {
//         $group: {
//           _id: "$studentId",
//           batch: { $first: "$batch" },
//           totalGpaPoints: { $sum: { $multiply: ["$avgGpa", 3] } },
//           completedCredits: { $sum: "$credit" },
//           totalCredits: { $sum: 3 },
//           termSubjects: {
//             $push: {
//               gpa: "$avgGpa",
//               credit: "$credit",
//               year: "$year",
//               term: "$term",
//             },
//           },
//         },
//       },

//       // Calculate CGPA for each student
//       {
//         $addFields: {
//           CGPA: {
//             $cond: [
//               { $gt: ["$completedCredits", 0] },
//               { $round: [{ $divide: ["$totalGpaPoints", "$completedCredits"] }, 2] },
//               0,
//             ],
//           },
//         },
//       },

//       // Optional: Calculate TGPA for specific term only
//       ...(isTerm
//         ? [
//             {
//               $addFields: {
//                 TGPA: {
//                   $let: {
//                     vars: {
//                       filtered: {
//                         $filter: {
//                           input: "$termSubjects",
//                           as: "s",
//                           cond: {
//                             $and: [
//                               { $eq: ["$$s.year", Number(year)] },
//                               { $eq: ["$$s.term", Number(term)] },
//                             ],
//                           },
//                         },
//                       },
//                     },
//                     in: {
//                       $let: {
//                         vars: {
//                           credits: {
//                             $sum: {
//                               $map: {
//                                 input: "$$filtered",
//                                 as: "s",
//                                 in: "$$s.credit",
//                               },
//                             },
//                           },
//                           points: {
//                             $sum: {
//                               $map: {
//                                 input: "$$filtered",
//                                 as: "s",
//                                 in: {
//                                   $multiply: ["$$s.gpa", "$$s.credit"],
//                                 },
//                               },
//                             },
//                           },
//                         },
//                         in: {
//                           $cond: [
//                             { $gt: ["$$credits", 0] },
//                             { $round: [{ $divide: ["$$points", "$$credits"] }, 2] },
//                             0,
//                           ],
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           ]
//         : []),

//       // Join student info
//       {
//         $lookup: {
//           from: "students",
//           localField: "_id",
//           foreignField: "studentId",
//           as: "student",
//         },
//       },
//       { $unwind: "$student" },

//       // Final projection
//       {
//         $project: {
//           _id: "$_id",
//           studentId: "$_id",
//           name: "$student.name",
//           TGPA: isTerm ? "$TGPA" : null,
//           CGPA: 1,
//           totalCredits: 1,
//           completedCredits: 1,
//           remark: {
//             $switch: {
//               branches: [
//                 { case: { $gte: ["$CGPA", 3.75] }, then: "Excellent" },
//                 { case: { $gte: ["$CGPA", 3.5] }, then: "Very Good" },
//                 { case: { $gte: ["$CGPA", 3.0] }, then: "Good" },
//                 { case: { $gte: ["$CGPA", 2.5] }, then: "Average" },
//                 { case: { $gt: ["$CGPA", 0] }, then: "Poor" },
//               ],
//               default: "Fail",
//             },
//           },
//         },
//       },

//       { $sort: { studentId: 1 } },
//     ]);

//     res.status(200).json({
//       mode: final ? "final" : "term",
//       totalStudents: results.length,
//       results,
//     });
//   } catch (error) {
//     console.error("Batch result error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



// interface StudentResult {
//   _id: string;
//   studentId: string;
//   name: string;
//   CGPA: number | null;
//   TGPA: number | null;
//   totalCredits: number;
//   completedCredits: number;
//   remark: string;
// }

export const getBatchResult = async (req: Request, res: Response) => {
  try {
    const { batch, year, term, final } = req.query;

    if (!batch) {
      return res.status(400).json({ message: "Batch is required" });
    }

    const students = await studentModel.find({ batch: parseInt(batch as string) }).lean();

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this batch" });
    }

    const results = await Promise.all(
      students.map(async (student) => {
        const studentId = student.studentId;

        const cgpaMatch: any = {
          studentId,
          batch: parseInt(batch as string),
        };

        if (!final && year && term) {
          cgpaMatch.$or = [
            { year: { $lt: parseInt(year as string) } },
            { year: parseInt(year as string), term: { $lte: parseInt(term as string) } },
          ];
        }

        const [cgpaResult] = await ResultSheet.aggregate([
          { $match: cgpaMatch },
          {
            $group: {
              _id: null,
              totalCredits: { $sum: 3 },
              completedCredits: {
                $sum: {
                  $cond: [{ $gte: ["$gpa", 2.0] }, 3, 0],
                },
              },
              gpaSum: { $sum: { $multiply: ["$gpa", 3] } },
            },
          },
          {
            $project: {
              _id: 0,
              CGPA: {
                $cond: [
                  { $gt: ["$totalCredits", 0] },
                  { $round: [{ $divide: ["$gpaSum", "$totalCredits"] }, 2] },
                  null,
                ],
              },
              totalCredits: 1,
              completedCredits: 1,
            },
          },
        ]);

        const CGPAInfo = cgpaResult || {
          CGPA: null,
          totalCredits: 0,
          completedCredits: 0,
        };

        let TGPA: number | null = null;

        if (!final && year && term) {
          const [tgpaResult] = await ResultSheet.aggregate([
            {
              $match: {
                studentId,
                batch: parseInt(batch as string),
                year: parseInt(year as string),
                term: parseInt(term as string),
              },
            },
            {
              $group: {
                _id: null,
                gpaSum: { $sum: { $multiply: ["$gpa", 3] } },
                totalCredits: { $sum: 3 },
              },
            },
            {
              $project: {
                _id: 0,
                TGPA: {
                  $cond: [
                    { $gt: ["$totalCredits", 0] },
                    { $round: [{ $divide: ["$gpaSum", "$totalCredits"] }, 2] },
                    null,
                  ],
                },
              },
            },
          ]);

          TGPA = tgpaResult?.TGPA ?? null;
        }

        let remark = "";
        if (CGPAInfo.CGPA >= 3.75) remark = "Excellent";
        else if (CGPAInfo.CGPA >= 3.5) remark = "Very Good";
        else if (CGPAInfo.CGPA >= 3.0) remark = "Good";
        else if (CGPAInfo.CGPA >= 2.5) remark = "Average";
        else if (CGPAInfo.CGPA > 0) remark = "Poor";
        else remark = "N/A";

        return {
          _id: studentId,
          studentId,
          name: student.name,
          CGPA: CGPAInfo.CGPA,
          TGPA: final ? null : TGPA,
          totalCredits: CGPAInfo.totalCredits,
          completedCredits: CGPAInfo.completedCredits,
          remark,
        };
      })
    );

    res.status(200).json({
      mode: final ? "final" : "term",
      totalStudents: students.length,
      results,
    });
  } catch (error) {
    console.error("getBatchResult error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getStudentTranscript = async (req: Request, res: Response) => {
//   try {
//     const { studentId, batch } = req.query;

//     if (!studentId || !batch) {
//       return res.status(400).json({ message: "studentId and batch are required" });
//     }

//     const student = await studentModel.findOne({ studentId, batch: parseInt(batch as string) }).lean();
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const results = await ResultSheet.aggregate([
//       {
//         $match: {
//           studentId,
//           batch: parseInt(batch as string),
//         },
//       },
//       {
//         $group: {
//           _id: { year: "$year", term: "$term" },
//           gpaSum: { $sum: { $multiply: ["$gpa", 3] } },
//           totalCredits: { $sum: 3 },
//           completedCredits: {
//             $sum: {
//               $cond: [{ $gte: ["$gpa", 2.0] }, 3, 0],
//             },
//           },
//         },
//       },
//       {
//         $sort: {
//           "_id.year": 1,
//           "_id.term": 1,
//         },
//       },
//     ]);

//     let cumulativeGpaSum = 0;
//     let cumulativeCredits = 0;

//     const transcript = results.map((termResult) => {
//       const { year, term } = termResult._id;
//       const { gpaSum, totalCredits, completedCredits } = termResult;

//       const TGPA = totalCredits > 0 ? parseFloat((gpaSum / totalCredits).toFixed(2)) : null;

//       // Update cumulative
//       cumulativeGpaSum += gpaSum;
//       cumulativeCredits += totalCredits;

//       const CGPA = cumulativeCredits > 0 ? parseFloat((cumulativeGpaSum / cumulativeCredits).toFixed(2)) : null;

//       return {
//         year,
//         term,
//         TGPA,
//         CGPA,
//         totalCredits,
//         completedCredits,
//       };
//     });

//     const finalCGPA = transcript.length ? transcript[transcript.length - 1].CGPA : null;

//     res.json({
//       studentId: student.studentId,
//       name: student.name,
//       department: student.dept || "",
//       batch: student.batch,
//       CGPA: finalCGPA,
//       transcript,
//     });
//   } catch (error) {
//     console.error("getStudentResult error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




interface ICourse {
  courseCode: string;
  title: string;
  credit: number;
  grade: string;
  gpa: number;
  status: string;
}

interface ITermResult {
  year: number;
  term: number;
  TGPA: number | null;
  CGPA: number | null;
  totalCredits: number;
  completedCredits: number;
  courses: ICourse[];
}




export const getStudentTranscript = async (req: Request, res: Response) => {
  try {
    const { studentId, batch } = req.query;

    if (!studentId || !batch) {
      return res.status(400).json({ message: "studentId and batch are required" });
    }

    const student = await studentModel.findOne({ studentId, batch: parseInt(batch as string) }).lean();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Fetch all results for the student and populate subject
    const results = await ResultSheet.find({ studentId, batch: parseInt(batch as string) })
      .populate("courseCode") // courseCode -> subject model
      .lean();

    // Group results by year and term
    const grouped: Record<string, any[]> = {};
    results.forEach((r) => {
      const key = `${r.year}-${r.term}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    });

   const transcript: ITermResult[] = [];
    let cumulativeGpaSum = 0;
    let cumulativeCredits = 0;

    for (const key of Object.keys(grouped).sort()) {
      const [year, term] = key.split("-").map(Number);
      const termResults = grouped[key];

      const courses = termResults.map((r) => {
        const subject = r.courseCode as any;
        const credit = subject?.credit || 3;

        return {
          courseCode: subject?.subjectCode || "",
          title: subject?.title || "",
          credit,
          grade: r.grade,
          gpa: r.gpa,
          status: r.gpa && r.gpa >= 2.0 ? "Completed" : "Failed",
        };
      });

      const totalCredits = courses.reduce((sum, c) => sum + (c.credit || 0), 0);
      const completedCredits = courses.reduce((sum, c) => sum + (c.gpa >= 2.0 ? c.credit : 0), 0);
      const gpaSum = courses.reduce((sum, c) => sum + (c.gpa * c.credit), 0);

      const TGPA = totalCredits > 0 ? parseFloat((gpaSum / totalCredits).toFixed(2)) : null;

      cumulativeGpaSum += gpaSum;
      cumulativeCredits += totalCredits;

      const CGPA = cumulativeCredits > 0 ? parseFloat((cumulativeGpaSum / cumulativeCredits).toFixed(2)) : null;

      transcript.push({
        year,
        term,
        TGPA,
        CGPA,
        totalCredits,
        completedCredits,
        courses,
      });
    }

    const finalCGPA = transcript.length ? transcript[transcript.length - 1].CGPA : null;

    res.json({
      studentId: student.studentId,
      name: student.name,
      department: student.dept || "",
      batch: student.batch,
      CGPA: finalCGPA,
      transcript,
    });
  } catch (error) {
    console.error("getStudentTranscript error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



