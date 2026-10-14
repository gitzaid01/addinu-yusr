# Addinu Yusr Institute — Islamic Learning Platform

A production-grade monolithic backend (Node.js, Express, MongoDB Atlas, TypeScript) and responsive classic retro-academic frontend (Next.js, Tailwind CSS) for the **Addinu Yusr Institute** (معهد الدين يسر للعلوم الشرعية).

> [!NOTE]
> All mock data has been removed. The application runs strictly on your live MongoDB Atlas database.

---

## Technical Architecture

- **Backend (`/server`)**: Node.js, Express.js, MongoDB Atlas (Mongoose), TypeScript, JWT authentication, BcryptJS password hashing, Helmet, CORS, Rate limiting, Zod validation.
- **Frontend (`/client`)**: Next.js (App Router), React 19, Tailwind CSS v4, TypeScript.
- **Database**: MongoDB Atlas (`mongodb+srv://...`).
- **Cloud Deployment**: Production-ready for **Render** (Full-Stack Blueprint) and **Netlify** (Frontend). See [DEPLOYMENT.md](file:///c:/Users/ACER/OneDrive/Desktop/client/addinu_yusr/DEPLOYMENT.md).

---

## 🛠️ Step-by-Step Setup Instructions

### Step 1: Configure Your MongoDB Atlas Password
Open `server/.env` in your code editor and replace `<db_password>` with your actual MongoDB Atlas database password:

```env
PORT=5000
DATABASE_URL=mongodb+srv://horcrux12:YOUR_ACTUAL_PASSWORD_HERE@cluster0.it2nuxv.mongodb.net/?appName=Cluster0
JWT_SECRET=tawtheeq_jwt_super_secret_key_1446_ah
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

---

### Step 2: Install Dependencies

```bash
# 1. Install Server Dependencies
cd server
npm install

# 2. Install Client Dependencies
cd ../client
npm install
```

---

### Step 3: Start the Development Servers

Open two terminal windows:

#### **Terminal 1: Start Backend API (Server)**
```bash
cd server
npm run dev
```

#### **Terminal 2: Start Frontend Application (Client)**
```bash
cd client
npm run dev
```

---

## 📚 HOW ADMIN ADDS COURSES (STEP-BY-STEP)

Admins can easily create and manage courses directly from the Web Interface or REST API:

### Method 1: Via the Web Admin Console (`/admin`)

1. **Log in as Admin**:
   - Go to `http://localhost:3000/login`.
   - Click the **REGISTER** tab (if creating your first account) -> Select **ADMIN SCHOLAR** -> Enter Name, Email, Password -> Click **CREATE ACCOUNT ->**.
   - You will automatically be logged in and redirected to `http://localhost:3000/admin`.

2. **Open Course Section**:
   - On the Admin Console navigation bar, click the **COURSES** button.

3. **Fill Out Course Form**:
   - **Course Title**: E.g. `AL-AJRUMIYYAH: STRUCTURAL ARABIC GRAMMAR`
   - **Course Code**: E.g. `AY-AR-101`
   - **Department**: E.g. `DEPARTMENT OF CLASSICAL ARABIC`
   - **Primary Text (Arabic)**: E.g. `الآجرومية في النحو`
   - **Description**: Enter curriculum breakdown and objectives.
   - **Live Meeting Link**: Enter secure classroom URL (e.g., `https://meet.google.com/abc-defg-hij`). *This URL is only visible to enrolled students.*
   - **Status**: Select `PUBLISHED` (visible to students) or `DRAFT`.
   - **Level**: Select `FOUNDATIONAL`, `INTERMEDIATE`, or `ADVANCED`.

4. **Click SAVE & PUBLISH COURSE**:
   - The course is immediately saved to MongoDB and published in the course catalogue at `/courses`.

---

### Method 2: Via REST API Endpoint

```http
POST http://localhost:5000/api/admin/courses
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "title": "BIDAYAT AL-MUJTAHID: COMPARATIVE JURISPRUDENCE",
  "code": "AY-FQ-205",
  "dept": "DEPT OF FIQH",
  "primaryText": "بداية المجتهد ونهاية المقتصد",
  "description": "Study of legal reasoning and juristic disagreement.",
  "category": "Fiqh & Usul",
  "level": "INTERMEDIATE",
  "duration": "38 Hours",
  "totalLessons": 28,
  "meetingLink": "https://meet.google.com/fq-live-room",
  "status": "PUBLISHED"
}
```

---

## 🔑 Registering Admin & Student Accounts

### Admin Account Registration
1. Open `http://localhost:3000/login` -> **REGISTER** tab -> **ADMIN SCHOLAR**.
2. Fill in details and click **CREATE ACCOUNT ->**.

### Student Account Registration
1. Open `http://localhost:3000/login` -> **REGISTER** tab -> **STUDENT**.
2. Fill in details and click **CREATE ACCOUNT ->**.

---

## 📡 Full REST API Reference Table

| Method | Endpoint | Authorization | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new Student or Admin account |
| `POST` | `/api/auth/login` | Public | Authenticate user and receive JWT token |
| `POST` | `/api/auth/logout` | Public | Clear session token |
| `GET` | `/api/auth/me` | Bearer Token | Get current user profile |
| `GET` | `/api/courses` | Public | Get all published courses |
| `GET` | `/api/courses/:id` | Public / Enrolled | Get course syllabus & meeting link |
| `POST` | `/api/admin/courses` | Admin | Create new course |
| `PATCH` | `/api/admin/courses/:id` | Admin | Edit course details |
| `DELETE` | `/api/admin/courses/:id` | Admin | Soft-archive course |
| `POST` | `/api/admin/enrollments` | Admin | Enroll student into course |
| `GET` | `/api/student/enrollments` | Student | Get logged-in student's courses |
| `POST` | `/api/admin/attendance` | Admin | Mark student attendance |
| `GET` | `/api/student/attendance` | Student | Get student attendance summary & % |
| `POST` | `/api/admin/completions` | Admin | Approve course completion & generate certificate |
| `GET` | `/api/student/completions` | Student | Get student completed courses & certificates |
| `POST` | `/api/admin/content` | Admin | Write and publish article/thought |
| `GET` | `/api/content` | Public | Read published articles/thoughts |
| `GET` | `/api/student/dashboard` | Student | Aggregated student console payload |
| `GET` | `/api/admin/dashboard` | Admin | Aggregated admin console payload |

---

## 🧪 Testing

```bash
cd server
npm test
```
