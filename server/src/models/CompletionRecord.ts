import mongoose, { Schema, Document } from "mongoose";

export interface ICompletionRecord extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completionDate: Date;
  completionPercentage: number;
  approvedBy: mongoose.Types.ObjectId;
  remarks?: string;
  certificateNumber: string;
  createdAt: Date;
}

const CompletionRecordSchema = new Schema<ICompletionRecord>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completionDate: { type: Date, default: Date.now },
    completionPercentage: { type: Number, required: true, default: 100 },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    remarks: { type: String, trim: true },
    certificateNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

CompletionRecordSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const CompletionRecord = mongoose.model<ICompletionRecord>(
  "CompletionRecord",
  CompletionRecordSchema
);
