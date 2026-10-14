import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import * as contentService from "../services/contentService";

export const createContent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await contentService.createContent({
      ...req.body,
      authorId: req.user!.userId,
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const getAdminContent = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await contentService.getAllContentAdmin();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getContentById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await contentService.getAllContentAdmin();
    const item = items.find((i: any) => i._id.toString() === req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Content item not found" });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await contentService.updateContent(req.params.id, req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await contentService.deleteContent(req.params.id);
    res.status(200).json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const item = await contentService.updateContent(req.params.id, { status });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const getPublishedContent = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await contentService.getPublishedContent();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getContentBySlug = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await contentService.getContentBySlug(req.params.slug);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
