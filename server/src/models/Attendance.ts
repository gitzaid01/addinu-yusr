import mongoose, { Schema, Document } from "mongoose";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface IAttendance extends Document {
  courseId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  date: Date;
  status: AttendanceStatus;
  markedBy: mongoose.Types.ObjectId;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["PRESENT", "ABSENT", "LATE", "EXCUSED"], required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    remarks: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate attendance records for courseId + studentId + date
AttendanceSchema.index({ courseId: 1, studentId: 1, date: 1 }, { unique: true });

AttendanceSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);
