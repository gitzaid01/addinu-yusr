import mongoose, { Schema, Document } from "mongoose";

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ICourseSchedule {
  days: string[];
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface ICourse extends Document {
  title: string;
  code: string;
  dept?: string;
  deptBadge?: string;
  primaryText?: string;
  slug: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  totalLessons: number;
  meetingLink?: string;
  schedule: ICourseSchedule;
  startDate?: Date;
  endDate?: Date;
  status: CourseStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    dept: { type: String, trim: true },
    deptBadge: { type: String, trim: true },
    primaryText: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
    level: { type: String, required: true, default: "FOUNDATIONAL" },
    duration: { type: String, required: true, default: "30 Hours" },
    totalLessons: { type: Number, required: true, default: 20 },
    meetingLink: { type: String, trim: true },
    schedule: {
      days: [{ type: String }],
      startTime: { type: String, default: "19:00" },
      endTime: { type: String, default: "20:30" },
      timezone: { type: String, default: "Asia/Kolkata" },
    },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ["DRAFT", "PUBLISHED", "ARCHIVED"], default: "DRAFT" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

CourseSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
