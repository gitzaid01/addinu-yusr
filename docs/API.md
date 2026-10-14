# Tawtheeq Institute API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
Authentication is handled via JSON Web Tokens (JWT). Pass the JWT token in the HTTP Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### `POST /api/auth/register`
Register a new student or admin account.
- **Authorization**: None (Public)
- **Request Body**:
```json
{
  "name": "Zayd Ibn Thabit",
  "email": "zayd@student.tawtheeq.edu",
  "password": "StudentPassword123!",
  "role": "STUDENT",
  "phone": "+966511111111"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "user": {
      "id": "6601a...",
      "name": "Zayd Ibn Thabit",
      "email": "zayd@student.tawtheeq.edu",
      "role": "STUDENT"
    }
  }
}
```

### `POST /api/auth/login`
Authenticate existing user and obtain JWT token.
- **Authorization**: None (Public)
- **Request Body**:
```json
{
  "email": "admin@tawtheeq.edu",
  "password": "AdminPassword123!"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1...",
    "user": {
      "id": "6601b...",
      "name": "Shaykh Dr. Ahmad Al-Ansari",
      "email": "admin@tawtheeq.edu",
      "role": "ADMIN"
    }
  }
}
```

### `GET /api/auth/me`
Retrieve currently logged-in user profile.
- **Authorization**: `Bearer <token>`

---

## 2. Course Endpoints

### `GET /api/courses`
Retrieve all published courses for public/student view.
- **Authorization**: Optional

### `GET /api/courses/:id`
Retrieve detailed syllabus for a specific course.
- **Authorization**: Optional (Reveals live meeting link if enrolled or admin).

### `POST /api/admin/courses`
Create a new course.
- **Authorization**: `Bearer <admin_token>` (Admin Only)
- **Request Body**:
```json
{
  "title": "TAHAWIYYAH: FOUNDATIONS OF SUNNI CREED",
  "code": "TWT-AQ-101",
  "dept": "DEPT OF AQEEDAH",
  "primaryText": "العقيدة الطحاوية",
  "description": "Comprehensive textual and analytical study...",
  "category": "Aqeedah",
  "level": "FOUNDATIONAL",
  "meetingLink": "https://meet.tawtheeq.edu/live-aq-101",
  "status": "PUBLISHED"
}
```

---

## 3. Enrollment Endpoints

### `POST /api/admin/enrollments`
Enroll a student into a course.
- **Authorization**: `Bearer <admin_token>`
- **Request Body**:
```json
{
  "studentId": "6601a...",
  "courseId": "6601c..."
}
```

### `GET /api/student/enrollments`
Get logged-in student's enrolled courses.
- **Authorization**: `Bearer <student_token>`

---

## 4. Attendance Endpoints

### `POST /api/admin/attendance`
Mark student class attendance.
- **Authorization**: `Bearer <admin_token>`
- **Request Body**:
```json
{
  "courseId": "6601c...",
  "studentId": "6601a...",
  "date": "2026-09-22",
  "status": "PRESENT",
  "remarks": "Active participation"
}
```

### `GET /api/student/attendance`
Get logged-in student's overall attendance breakdown & percentage summary.
- **Authorization**: `Bearer <student_token>`

---

## 5. Course Completion Endpoints

### `POST /api/admin/completions`
Approve course completion and issue certificate identifier.
- **Authorization**: `Bearer <admin_token>`
- **Request Body**:
```json
{
  "studentId": "6601a...",
  "courseId": "6601c...",
  "completionPercentage": 100,
  "remarks": "High Distinction"
}
```

---

## 6. Admin Content Endpoints

### `POST /api/admin/content`
Create Islamic article, thought, or announcement.
- **Authorization**: `Bearer <admin_token>`

### `GET /api/content`
Get all published articles/thoughts for students.
- **Authorization**: Public

---

## 7. Dashboard Endpoints

### `GET /api/student/dashboard`
Aggregated single-call endpoint for student portal console.
- **Authorization**: `Bearer <student_token>`

### `GET /api/admin/dashboard`
Aggregated single-call endpoint for admin management metrics.
- **Authorization**: `Bearer <admin_token>`
