import mongoose, { Schema, Document } from "mongoose";

export type ContentType = "ARTICLE" | "THOUGHT" | "ANNOUNCEMENT";
export type ContentStatus = "DRAFT" | "PUBLISHED";

export interface IAdminContent extends Document {
  title: string;
  slug: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  authorId: mongoose.Types.ObjectId;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminContentSchema = new Schema<IAdminContent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["ARTICLE", "THOUGHT", "ANNOUNCEMENT"], required: true },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT" },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

AdminContentSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const AdminContent = mongoose.model<IAdminContent>("AdminContent", AdminContentSchema);
