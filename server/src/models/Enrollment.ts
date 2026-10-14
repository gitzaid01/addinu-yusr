import mongoose, { Schema, Document } from "mongoose";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrolledAt: Date;
  status: EnrollmentStatus;
  progress: number;
  completedAt?: Date;
  lastAccessedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["ACTIVE", "COMPLETED", "CANCELLED"], default: "ACTIVE" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    completedAt: { type: Date },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Compound unique index so student cannot be enrolled twice in the same course
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

EnrollmentSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Enrollment = mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
