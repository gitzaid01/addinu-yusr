import { User } from "../models/User";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";
import { CompletionRecord } from "../models/CompletionRecord";
import { AdminContent } from "../models/AdminContent";

export const seedData = async () => {
  // Cleans database collections to ensure a fresh, empty production database
  await User.deleteMany({});
  await Course.deleteMany({});
  await Enrollment.deleteMany({});
  await Attendance.deleteMany({});
  await CompletionRecord.deleteMany({});
  await AdminContent.deleteMany({});
  console.log("[Database] Database wiped clean. Ready for real user registrations and course management.");
};
