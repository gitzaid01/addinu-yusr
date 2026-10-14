import { AdminContent, IAdminContent, ContentType, ContentStatus } from "../models/AdminContent";

export interface CreateContentInput {
  title: string;
  content: string;
  type: ContentType;
  status?: ContentStatus;
  authorId: string;
}

export const createContent = async (input: CreateContentInput) => {
  const slug =
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    Date.now();

  return AdminContent.create({
    ...input,
    slug,
    publishedAt: input.status === "PUBLISHED" ? new Date() : undefined,
  });
};

export const updateContent = async (id: string, updates: Partial<IAdminContent>) => {
  const item = await AdminContent.findById(id);
  if (!item) {
    const error: any = new Error("Content item not found");
    error.statusCode = 404;
    throw error;
  }

  if (updates.status === "PUBLISHED" && item.status !== "PUBLISHED") {
    updates.publishedAt = new Date();
  }

  Object.assign(item, updates);
  await item.save();
  return item;
};

export const deleteContent = async (id: string) => {
  const result = await AdminContent.findByIdAndDelete(id);
  if (!result) {
    const error: any = new Error("Content item not found");
    error.statusCode = 404;
    throw error;
  }
  return true;
};

export const getPublishedContent = async () => {
  return AdminContent.find({ status: "PUBLISHED" })
    .populate("authorId", "name")
    .sort({ publishedAt: -1 });
};

export const getContentBySlug = async (slug: string) => {
  const item = await AdminContent.findOne({ slug, status: "PUBLISHED" }).populate("authorId", "name");
  if (!item) {
    const error: any = new Error("Content not found");
    error.statusCode = 404;
    throw error;
  }
  return item;
};

export const getAllContentAdmin = async () => {
  return AdminContent.find().populate("authorId", "name").sort({ createdAt: -1 });
};
