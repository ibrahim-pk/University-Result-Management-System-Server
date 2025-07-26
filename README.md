
# 🎓 University Result Management System (Backend)

📎 **Live Server Link**: `http://localhost:5000`

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

## 📘 Student API

### ➕ Create Student

**POST** `/api/student/create`
```json
{
  "studentId": "BFH2001001F",
  "name": "Md Ibrahim",
  "batch": 15,
  "deptName": "CSE"
}
```

### ✅ Response
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "abc123...",
    "studentId": "BFH2001001F",
    "name": "Md Ibrahim",
    "batch": 15,
    "deptName": "CSE"
  }
}
```

---

## 👨‍🏫 Teacher API

### ➕ Create Teacher

**POST** `/api/teacher/create`
```json
{
  "teacherId": "TCH001",
  "name": "Dr. Mahmud Hasan",
  "deptName": "CSE"
}
```

### ✅ Response
```json
{
  "success": true,
  "message": "Teacher created successfully",
  "data": {
    "_id": "def456...",
    "teacherId": "TCH001",
    "name": "Dr. Mahmud Hasan",
    "deptName": "CSE"
  }
}
```

---

## 📚 Subject API

### ➕ Create Subject

**POST** `/api/subject/create`
```json
{
  "courseCode": "CSE401",
  "title": "Artificial Intelligence",
  "credit": 3,
  "deptName": "CSE"
}
```

### ✅ Response
```json
{
  "success": true,
  "message": "Subject created successfully",
  "data": {
    "_id": "xyz789...",
    "courseCode": "CSE401",
    "title": "Artificial Intelligence",
    "credit": 3
  }
}
```

---

## 🧑‍💼 Role API (Teacher's Role in a Course)

### ➕ Assign Role

**POST** `/api/role/create`
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

### 📍 View Final Result (CGPA) of Batch

**GET** `/api/result-by-batch?batch=15&final=true`

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
