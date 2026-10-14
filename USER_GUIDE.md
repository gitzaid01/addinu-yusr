# Addinu Yusr Institute — Complete User Guide & Manual
*(معهد الدين يسر للعلوم الشرعية — دليل الاستخدام الشامل)*

Welcome to the **Addinu Yusr Institute** digital Islamic learning platform. This manual provides complete instructions for students, scholars, and administrators.

---

## 📑 Table of Contents
1. [Overview & Navigation Map](#1-overview--navigation-map)
2. [User Roles & Permissions](#2-user-roles--permissions)
3. [Student Guide: How to Use the Platform](#3-student-guide-how-to-use-the-platform)
   - [3.1 Creating a Student Account](#31-creating-a-student-account)
   - [3.2 Browsing the Course Catalogue](#32-browsing-the-course-catalogue)
   - [3.3 Accessing the Student Console](#33-accessing-the-student-console)
   - [3.4 Joining Live Classrooms](#34-joining-live-classrooms)
   - [3.5 Tracking Attendance & Certificates](#35-tracking-attendance--certificates)
4. [Admin Scholar Guide: Managing the Institute](#4-admin-scholar-guide-managing-the-institute)
   - [4.1 Accessing the Admin Console](#41-accessing-the-admin-console)
   - [4.2 Creating & Publishing Courses](#42-creating--publishing-courses)
   - [4.3 Enrolling Students in Courses](#43-enrolling-students-in-courses)
   - [4.4 Recording Daily Class Attendance](#44-recording-daily-class-attendance)
   - [4.5 Approving Course Completion & Certificates](#45-approving-course-completion--certificates)
   - [4.6 Publishing Articles, Announcements & Thoughts](#46-publishing-articles-announcements--thoughts)
5. [Security & Access Rules](#5-security--access-rules)
6. [Frequently Asked Questions (FAQ)](#6-frequently-asked-questions-faq)

---

## 1. Overview & Navigation Map

| Page | URL Path | Access Level | Description |
|---|---|---|---|
| **Home Portal** | `/` | Public | Welcome banner, daily verse/hadith, core departments, and admissions CTA. |
| **Course Catalogue** | `/courses` | Public | Searchable list of all published classical Islamic courses. |
| **Course Details** | `/courses/:id` | Public / Enrolled | Detailed curriculum, Arabic texts, lessons, and secure live meeting link. |
| **Authentication** | `/login` | Public | Unified Login and Registration for Students and Admins. |
| **Student Console** | `/dashboard` | Student Only | Personal academic record, enrolled courses, attendance metrics, certificates. |
| **Admin Console** | `/admin` | Admin Only | Full institutional management console (Courses, Students, Attendance, Certificates, Articles). |

---

## 2. User Roles & Permissions

The platform supports two distinct account roles:

### 🎓 1. Student (`STUDENT`)
- Browse public course catalog and syllabus details.
- Access personal learning dashboard (`/dashboard`).
- View enrolled courses and receive direct links to secure live class meetings.
- Review attendance records and real-time attendance percentage.
- View and verify issued course completion certificates.

### 🏛️ 2. Admin Scholar (`ADMIN`)
- Access administrative control panel (`/admin`).
- Create, edit, publish, or archive courses with Arabic curriculum details and meeting links.
- View all registered student profiles.
- Manually enroll or transfer students into courses.
- Record class attendance per lesson (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`).
- Issue graduation completion records with distinct certificate identifiers.
- Publish public articles, scholarly reflections, and announcements.

---

## 3. Student Guide: How to Use the Platform

### 3.1 Creating a Student Account
1. Open the platform in your browser.
2. Click **LOGIN // REGISTER** in the top navigation bar (or navigate to `/login`).
3. Click the **`[ 02 // REGISTER ]`** tab.
4. Select **`STUDENT`** under Account Type.
5. Fill in your details:
   - **Full Name**: e.g., `Zayd Ibn Thabit`
   - **Email Address**: e.g., `zayd@example.com`
   - **Password**: Minimum 6 characters
   - **Phone / WhatsApp Number**: Optional
6. Click **`CREATE ACCOUNT ->`**.
7. You are automatically logged in and redirected to your **Student Console** (`/dashboard`).

---

### 3.2 Browsing the Course Catalogue
1. Click **COURSES** in the top navigation bar (or navigate to `/courses`).
2. You will see all published courses categorized by department:
   - *Department of Classical Arabic & Grammar (نحو وصرف)*
   - *Department of Hadith Sciences (علوم الحديث)*
   - *Department of Islamic Jurisprudence & Legal Theory (فقه وأصول)*
   - *Department of Creed & Theology (عقيدة)*
3. Click **VIEW SYLLABUS ->** on any course card to inspect:
   - Primary Arabic Classical Text (e.g., *الآجرومية*, *عمدة الأحكام*, *العقيدة الطحاوية*)
   - Total instructional hours and lesson counts
   - Course code and study level (`FOUNDATIONAL`, `INTERMEDIATE`, `ADVANCED`)

---

### 3.3 Accessing the Student Console
1. Navigate to `/dashboard` (accessible by clicking **STUDENT DASHBOARD** in the header).
2. The dashboard displays four real-time academic counters:
   - **Enrolled Courses**: Number of subjects you are currently attending.
   - **Completed Courses**: Subjects you have officially passed.
   - **Active Sessions**: Courses currently in session.
   - **Average Attendance**: Your live attendance percentage (aim for 85%+).

---

### 3.4 Joining Live Classrooms
1. In your **Student Console** (`/dashboard`), scroll to **MY REGISTERED ENROLLMENTS**.
2. Find the active course you wish to attend.
3. If the course is active and an instructor has scheduled a session:
   - The secure **JOIN LIVE CLASSROOM (MEET/ZOOM)** button will be displayed.
   - Click the link to join the live lecture directly.
   > *Security note: Live meeting links are strictly protected and never displayed to unregistered visitors.*

---

### 3.5 Tracking Attendance & Certificates
- **Attendance History**: On your dashboard, view your exact attendance breakdown for each course (total classes attended vs. missed, with timestamps and remarks).
- **Certificates of Completion**: When you finish a course and the admin approves your graduation, an official certificate entry appears under **ACADEMIC HONORS & CERTIFICATES** with your unique Certificate Serial ID.

---

## 4. Admin Scholar Guide: Managing the Institute

The Admin Console (`/admin`) is a unified terminal designed with classic scholarly aesthetics for rapid management.

### 4.1 Accessing the Admin Console
1. Go to `/login` -> Select **REGISTER** -> Select **ADMIN SCHOLAR** (if setting up your first admin account), or log in with your admin credentials.
2. Once authenticated, you will be redirected to `/admin`.
3. The top navigation bar in the console contains seven dedicated modules:
   - `[ DASHBOARD ]`
   - `[ COURSES ]`
   - `[ ENROLLMENTS ]`
   - `[ ATTENDANCE ]`
   - `[ COURSE STUDENTS ]`
   - `[ COMPLETION ]`
   - `[ CONTENT ]`

---

### 4.2 Creating & Publishing Courses
1. Click the **`[ COURSES ]`** tab in `/admin`.
2. Scroll to the **ADD NEW COURSE** form:
   - **Course Title**: E.g., `AL-AJRUMIYYAH: STRUCTURAL ARABIC GRAMMAR`
   - **Course Code**: E.g., `AY-AR-101`
   - **Department**: Select from the dropdown (e.g., *Department of Classical Arabic*).
   - **Primary Text (Arabic)**: E.g., `الآجرومية في علم العربية`
   - **Level**: `FOUNDATIONAL`, `INTERMEDIATE`, or `ADVANCED`
   - **Duration & Lessons**: E.g., `30 Hours`, `24 Lessons`
   - **Live Meeting Link**: Enter your Google Meet or Zoom URL (e.g., `https://meet.google.com/abc-defg-hij`).
   - **Status**: Set to `PUBLISHED` (visible in catalog) or `DRAFT` (hidden).
3. Click **`SAVE & PUBLISH COURSE`**.
4. The course is saved instantly to MongoDB Atlas and appears immediately in the public catalog at `/courses`.

---

### 4.3 Enrolling Students in Courses
1. Click the **`[ ENROLLMENTS ]`** tab in `/admin`.
2. In the **ENROLL STUDENT** section:
   - **Select Student**: Pick the registered student from the dropdown.
   - **Select Course**: Pick the course they are joining.
3. Click **`CONFIRM ENROLLMENT`**.
4. The course immediately appears in that student's dashboard with live classroom access.

---

### 4.4 Recording Daily Class Attendance
1. Click the **`[ ATTENDANCE ]`** tab in `/admin`.
2. Fill out the attendance logger:
   - **Course**: Select the course.
   - **Student**: Select the student.
   - **Date**: Select the class date.
   - **Status**: Choose `PRESENT`, `ABSENT`, `LATE`, or `EXCUSED`.
   - **Remarks**: Optional note (e.g., "Active participation in text translation").
3. Click **`RECORD ATTENDANCE`**.
4. The student's attendance percentage updates automatically in real-time.

---

### 4.5 Approving Course Completion & Certificates
When a student completes a course:
1. Click the **`[ COMPLETION ]`** tab in `/admin`.
2. Under **APPROVE COMPLETION & ISSUE CERTIFICATE**:
   - **Select Student**: Choose the student.
   - **Select Course**: Choose the finished course.
   - **Grade / Percentage**: E.g., `95` or `100`.
   - **Remarks / Distinction**: E.g., `Passed with Mumtaz (Excellent) Distinction`.
3. Click **`ISSUE CERTIFICATE`**.
4. The system automatically creates a permanent cryptographic record and displays the certificate on the student's profile.

---

### 4.6 Publishing Articles, Announcements & Thoughts
1. Click the **`[ CONTENT ]`** tab in `/admin`.
2. In the **SCHOLARLY DISCOURSE PUBLISHER**:
   - **Title**: Article headline.
   - **Type**: `ARTICLE`, `THOUGHT`, or `ANNOUNCEMENT`.
   - **Body**: Enter Arabic or English textual content, references, and advice.
   - **Status**: `PUBLISHED`.
3. Click **`PUBLISH POST`**.

---

## 5. Security & Access Rules

- **Live Classroom Link Privacy**: Unregistered visitors and students who are not enrolled in a course can see the course description and syllabus, but the live meeting link remains hidden until enrollment is confirmed.
- **Role Verification**: Admin endpoints (`/api/admin/*`) and the `/admin` web interface strictly verify the user's JWT token and require `role === "ADMIN"`. Non-admin accounts attempting to access `/admin` are automatically redirected to `/login`.
- **Session Persistence**: Authentication tokens and user metadata are stored in browser `localStorage`. To log out, click the **LOGOUT** button in the header.

---

## 6. Frequently Asked Questions (FAQ)

#### Q1: How do I invite a student to a class?
> Direct the student to register at `https://your-domain/login` as a **STUDENT**. Once registered, go to the Admin Console (`/admin`) -> **ENROLLMENTS**, select their name and the course, and click **CONFIRM ENROLLMENT**.

#### Q2: Can a student enroll themselves directly?
> In this release, enrollments are managed by the admin/scholar to maintain authentic teacher-student authorization (*Ijazah / Sanad* model). Students browse courses, and admins approve registrations.

#### Q3: Why is my live meeting link not showing for a student?
> Ensure:
> 1. You entered a valid URL in the course's **Live Meeting Link** field.
> 2. The course status is set to **`PUBLISHED`**.
> 3. The student has been enrolled via the **ENROLLMENTS** tab.

#### Q4: How do I change my database password or connection string?
> In Render Dashboard -> Go to `addinu-yusr-api` -> **Environment** -> Update `DATABASE_URL` -> Click **Save Changes**.

---

*Addinu Yusr Institute — Dedicated to authentic classical Islamic learning.*
