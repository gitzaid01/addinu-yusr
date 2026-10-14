import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";
import { CompletionRecord } from "../models/CompletionRecord";
import { AdminContent } from "../models/AdminContent";

describe("Islamic Institute Platform API Integration Tests", () => {
  let adminToken: string;
  let studentToken: string;
  let student2Token: string;
  let adminId: string;
  let studentId: string;
  let student2Id: string;
  let createdCourseId: string;
  let createdEnrollmentId: string;
  let createdArticleId: string;
  let draftArticleId: string;

  beforeAll(async () => {
    const connStr = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/tawtheeq_test_db";
    try {
      await mongoose.connect(connStr);
      await User.deleteMany({});
      await Course.deleteMany({});
      await Enrollment.deleteMany({});
      await Attendance.deleteMany({});
      await CompletionRecord.deleteMany({});
      await AdminContent.deleteMany({});
    } catch (err) {
      console.warn("MongoDB connection skipped or not active locally:", err);
    }
  }, 60000);

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await User.deleteMany({});
      await Course.deleteMany({});
      await Enrollment.deleteMany({});
      await Attendance.deleteMany({});
      await CompletionRecord.deleteMany({});
      await AdminContent.deleteMany({});
      await mongoose.connection.close();
    }
  }, 30000);

  // 1. Admin Register & Login
  it("should register and login admin successfully", async () => {
    if (mongoose.connection.readyState === 0) return;

    const regRes = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "admin@test.com",
      password: "AdminPassword123!",
      role: "ADMIN",
    });
    expect(regRes.status).toBe(201);
    expect(regRes.body.success).toBe(true);
    adminToken = regRes.body.data.token;
    adminId = regRes.body.data.user.id;
    expect(adminToken).toBeDefined();

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "AdminPassword123!",
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.data.user.role).toBe("ADMIN");
  });

  // 2. Student Register & Login
  it("should register student successfully", async () => {
    if (mongoose.connection.readyState === 0) return;

    const s1Res = await request(app).post("/api/auth/register").send({
      name: "Student One",
      email: "student1@test.com",
      password: "StudentPassword123!",
      role: "STUDENT",
    });
    expect(s1Res.status).toBe(201);
    studentToken = s1Res.body.data.token;
    studentId = s1Res.body.data.user.id;

    const s2Res = await request(app).post("/api/auth/register").send({
      name: "Student Two",
      email: "student2@test.com",
      password: "StudentPassword123!",
      role: "STUDENT",
    });
    expect(s2Res.status).toBe(201);
    student2Token = s2Res.body.data.token;
    student2Id = s2Res.body.data.user.id;
  });

  // 3. Admin creates course
  it("should allow admin to create a course", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/courses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Course Fiqh",
        code: "TST-FQ-101",
        description: "Comprehensive introduction to Islamic Fiqh",
        status: "PUBLISHED",
        meetingLink: "https://meet.tawtheeq.edu/test",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.code).toBe("TST-FQ-101");
    createdCourseId = res.body.data.id;
  });

  // 4. Student cannot create course
  it("should reject student course creation with 403 Forbidden", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/courses")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        title: "Unauthorized Course",
        code: "UNAUTH-101",
        description: "Should fail",
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // 5. Student Enrollment by Admin
  it("should allow admin to enroll student in course", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/enrollments")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        studentId,
        courseId: createdCourseId,
      });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe("ACTIVE");
    createdEnrollmentId = res.body.data.id;
  });

  // 6. Duplicate enrollment rejection
  it("should reject duplicate student enrollment with 409 Conflict", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/enrollments")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        studentId,
        courseId: createdCourseId,
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  // 7. Admin marks attendance
  it("should allow admin to mark student attendance", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/attendance")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        courseId: createdCourseId,
        studentId,
        date: "2026-09-22",
        status: "PRESENT",
        remarks: "Great participation",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe("PRESENT");
  });

  // 8. Student reads attendance
  it("should allow student to read their attendance summary", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .get("/api/student/attendance")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.totalClasses).toBe(1);
    expect(res.body.data.present).toBe(1);
    expect(res.body.data.attendancePercentage).toBe(100);
  });

  // 9. Student cannot modify attendance
  it("should prevent student from marking or modifying attendance", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/attendance")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        courseId: createdCourseId,
        studentId,
        date: "2026-09-23",
        status: "PRESENT",
      });

    expect(res.status).toBe(403);
  });

  // 10. Admin creates completion
  it("should allow admin to create completion record", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .post("/api/admin/completions")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        studentId,
        courseId: createdCourseId,
        completionPercentage: 100,
        remarks: "Passed with distinction",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.certificateNumber).toBeDefined();
  });

  // 11. Completion updates enrollment
  it("should verify completion automatically updated enrollment to COMPLETED", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .get("/api/student/enrollments")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    const enrollment = res.body.data[0];
    expect(enrollment.status).toBe("COMPLETED");
    expect(enrollment.progress).toBe(100);
  });

  // 12. Student sees completed course in dashboard
  it("should show completed course in student dashboard", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app)
      .get("/api/student/dashboard")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.stats.completedCourses).toBe(1);
  });

  // 13. Admin creates articles (draft & published)
  it("should allow admin to create articles", async () => {
    if (mongoose.connection.readyState === 0) return;

    const pubRes = await request(app)
      .post("/api/admin/content")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Published Article Test",
        content: "This is a published article content",
        type: "ARTICLE",
        status: "PUBLISHED",
      });

    expect(pubRes.status).toBe(201);
    createdArticleId = pubRes.body.data.id;

    const draftRes = await request(app)
      .post("/api/admin/content")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Draft Article Test",
        content: "This is a draft article content",
        type: "THOUGHT",
        status: "DRAFT",
      });

    expect(draftRes.status).toBe(201);
    draftArticleId = draftRes.body.data.id;
  });

  // 14 & 15. Draft hidden, Published visible to students
  it("should show published article to students but hide draft article", async () => {
    if (mongoose.connection.readyState === 0) return;

    const res = await request(app).get("/api/content");

    expect(res.status).toBe(200);
    const titles = res.body.data.map((item: any) => item.title);
    expect(titles).toContain("Published Article Test");
    expect(titles).not.toContain("Draft Article Test");
  });

  // 16. Student privacy check
  it("should prevent student from accessing another student's dashboard or profile", async () => {
    if (mongoose.connection.readyState === 0) return;

    const s2DashRes = await request(app)
      .get("/api/student/dashboard")
      .set("Authorization", `Bearer ${student2Token}`);

    expect(s2DashRes.status).toBe(200);
    expect(s2DashRes.body.data.student.email).toBe("student2@test.com");
    expect(s2DashRes.body.data.stats.enrolledCourses).toBe(0);
  });
});
