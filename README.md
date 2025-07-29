
# 🎓 University Result Management System (Backend)

📎 **Live Server Link**: `https://university-result-management-system.onrender.com/`

📎 **Frontend**: React-based UI  
📎 **Database**: MongoDB  
📎 **Tech Stack**: Node.js, Express.js, Mongoose, REST API

---

## ✨ Features

- Add/manage Students, Teachers, Subjects, Roles
- Role-based result entry
- View results by student, batch, or term
- Calculate TGPA & CGPA with detailed course performance

---

## 📘 Department API

### Get Department
**Get** `/api/departments`

```
{
    "statusCode": 200,
    "success": true,
    "message": "Departments retrieved successfully",
    "data": [
        {
            "_id": "6682bb87d1c1b99cbe765e30",
            "deptCode": "01",
            "deptName": "CSTE",
            "__v": 0
        },
        {
            "_id": "6682bba3d1c1b99cbe765e32",
            "deptCode": "02",
            "deptName": "ICE",
            "__v": 0
        },
        {
            "_id": "668b89c79a602290e4acd7c8",
            "deptCode": "03",
            "deptName": "ACCE",
            "__v": 0
        }
    ]
}
```
### ➕ Post Department
**POST** `/api/departments`
```json
{
  "deptCode": "CSTE",
  "deptName": "Computer Science and Telecommunication Engineering"
}

```

### ✅ Response
```json
{
    "statusCode": 200,
    "success": true,
    "message": "Department added successfully",
    "data": {
        "deptCode": "01",
        "deptName": "Computer Science and Telecommunication Engineering",
        "_id": "6888e70d195996527e0eaaba",
        "__v": 0
    }
}
```
##  Get Department by Id
### /api/departments/id
##  Delete Department by Id
### /api/departments/id
---

## 👨‍🏫 Teacher API

### ➕ Create Teacher

**POST** `/api/teachers`
```json
{
  "name": "Rafique Ahmed",
  "email": "rafique@university.edu",
  "password": "12345678",
  "dept": "1623456543211ds54",
  "designation": "Assistant Professor",
  "role": "teacher"
}

```

### ✅ Response
```json
{
    "statusCode": 201,
    "success": true,
    "message": "Teacher added successfully",
    "data": {
        "name": "Rafique Ahmed",
        "email": "rafique@university.edu",
        "password": "$2b$10$Nwd.oCGiy5jEWS7mLI/J.ekm12rkH5Q1lr8bD.wxu1GGRd9QFtcDi",
        "dept": "1623456543211ds54",
        "designation": "Assistant Professor",
        "role": "teacher",
        "_id": "6888f537195996527e0eaabc",
        "__v": 0
}
```
##  Get Teachers
### /api/teachers
##  Get Teachers by id
### /api/teachers/id
##  Delete Teachers by Id
### /api/teachers/id

---

## 📚 Subject API

### ➕ Create Subject

**POST** `/api/subjects`
```json
 {
    "subjectCode": "CSTE 1101",
    "title": "Structured Programming Language",
    "credit": 2,
    "creditHour": 3,
    "year": 1,
    "term": 1,
    "department": "CSTE",
    "ref": []           
},
```

### ✅ Response
```json
{
    "statusCode": 200,
    "success": true,
    "message": "Subject added successfully",
    "data": {
        "subjectCode": "CSTE 1115",
        "title": "Structured Programming Language",
        "credit": 2,
        "creditHour": 3,
        "year": 1,
        "term": 1,
        "ref": [],
        "department": "CSTE",
        "_id": "6888f88a195996527e0eaac4",
        "__v": 0
    }
}
```
##  Get Subjects
### /api/subjects
##  Get subjects by id
### /api/subjects/id
##  Delete subjects by Id
### /api/subjects/id
---

## 🧑‍💼 Role API (Teacher's Role in a Course)

### ➕ Assign Role

**POST** `/api/role`
```json
{
  "teacherId": "TCH001",
  "courseCode": "CSE401",
  "year": 4,
  "term": 2,
  "role": "examiner"
}
```

### ✅ Response
```json
{
  "success": true,
  "message": "Role assigned successfully"
}
```

---

## 📝 Result (Marks Entry) API

### ➕ Submit Result

**POST** `/api/result/create`
```json
{
  "studentId": "BFH2001001F",
  "batch": 15,
  "year": 4,
  "term": 2,
  "deptName": "CSE",
  "courseCode": "CSE401",
  "teacherId": "TCH001",
  "role": "examiner",
  "questions": [10, 9, 8, 7, 9, 10, 10, 9, 10],
  "ct": 9,
  "attendance": 5,
  "total": 87,
  "grade": "A",
  "gpa": 3.75
}
```

### ✅ Response
```json
{
  "success": true,
  "message": "Result created successfully",
  "data": {
    "_id": "res123...",
    ...
  }
}
```

---

## 📊 View Results

### 📍 View All Results of a Batch (Specific Term)

**GET** `/api/result-by-batch?batch=15&year=4&term=2`
 ```
   {
    "mode": "term",
    "totalStudents": 43,
    "results": [
        {
            "_id": "BFH2001001F",
            "studentId": "BFH2001001F",
            "name": "POLY AKTER",
            "CGPA": 2.87,
            "TGPA": 3.35,
            "totalCredits": 45,
            "completedCredits": 39,
            "remark": "Average"
        },
        {
            "_id": "BFH2001002F",
            "studentId": "BFH2001002F",
            "name": "MONISHA MAJMUDER",
            "CGPA": 3.08,
            "TGPA": 2.65,
            "totalCredits": 45,
            "completedCredits": 42,
            "remark": "Good"
        },
        {
            "_id": "BFH2001003F",
            "studentId": "BFH2001003F",
            "name": "NAFISA BINTE FARID",
            "CGPA": 2.37,
            "TGPA": 2.55,
            "totalCredits": 45,
            "completedCredits": 33,
            "remark": "Poor"
        },
}
```

### 📍 View Final Result (CGPA) of Batch

**GET** `/api/result-by-batch?batch=15&final=true`
```
{
    "mode": "final",
    "totalStudents": 43,
    "results": [
        {
            "_id": "BFH2001001F",
            "studentId": "BFH2001001F",
            "name": "POLY AKTER",
            "CGPA": 2.87,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 39,
            "remark": "Average"
        },
        {
            "_id": "BFH2001002F",
            "studentId": "BFH2001002F",
            "name": "MONISHA MAJMUDER",
            "CGPA": 3.08,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 42,
            "remark": "Good"
        },
        {
            "_id": "BFH2001003F",
            "studentId": "BFH2001003F",
            "name": "NAFISA BINTE FARID",
            "CGPA": 2.37,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 33,
            "remark": "Poor"
        },
        {
            "_id": "MUH2001004M",
            "studentId": "MUH2001004M",
            "name": "ASHIKUL ISLAM ZUHAIR",
            "CGPA": 3.05,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 42,
            "remark": "Good"
        },
        {
            "_id": "BFH2001005F",
            "studentId": "BFH2001005F",
            "name": "ASIF AHMED UPAHROZ",
            "CGPA": 3.12,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 42,
            "remark": "Good"
        },
        {
            "_id": "MUH2001006F",
            "studentId": "MUH2001006F",
            "name": "NAZMUN NAHER",
            "CGPA": 2.4,
            "TGPA": null,
            "totalCredits": 45,
            "completedCredits": 33,
            "remark": "Poor"
        },
}
```

### 📍 View Individual Student Transcript

**GET** `/api/result-by-student?studentId=BFH2001001F&batch=15`

✅ Sample Response (Term-wise Transcript):
```json
{
  "studentId": "BFH2001001F",
  "name": "Md Ibrahim",
  "batch": 15,
  "department": "CSE",
  "terms": [
    {
      "year": 4,
      "term": 2,
      "tgpa": 3.75,
      "cgpa": 3.65,
      "completedCredits": 90,
      "totalCredits": 90,
      "courses": [
        {
          "courseCode": "CSE401",
          "title": "Artificial Intelligence",
          "credit": 3,
          "grade": "A",
          "gpa": 3.75,
          "status": "Passed"
        }
      ]
    }
  ]
}
```

---

## 🗂️ MongoDB Collections Overview

| Collection    | Description                          |
|---------------|--------------------------------------|
| `students`    | Stores student profiles              |
| `teachers`    | Stores teacher data                  |
| `subjects`    | Course details with codes & credits  |
| `roles`       | Assigned roles to teachers per term  |
| `results`     | Stores per-course result for students|

---

## 🔍 Sample Query Examples

- View student’s full transcript:  
  `GET /api/result-by-student?studentId=BFH2001001F&batch=15`

- View batch final result:  
  `GET /api/result-by-batch?batch=15&final=true`

- View batch result for year=4, term=2:  
  `GET /api/result-by-batch?batch=15&year=4&term=2`

---

## 📈 Future Scope

- Admin dashboard with analytics  
- Repeat/Improvement course tracking  
- Role-based access (admin, teacher, student)  
- PDF export for transcript/batch results
