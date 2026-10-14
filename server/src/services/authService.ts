import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { UserRole } from "../types";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (input: RegisterInput) => {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    const error: any = new Error("User with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(input.password, salt);

  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
    role: input.role || "STUDENT",
    phone: input.phone,
  });

  const secret: jwt.Secret = process.env.JWT_SECRET || "tawtheeq_jwt_super_secret_key_1446_ah";
  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role, email: user.email },
    secret,
    { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any }
  );

  return { user, token };
};

export const loginUser = async (input: LoginInput) => {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(input.password, user.passwordHash);
  if (!isMatch) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const secret: jwt.Secret = process.env.JWT_SECRET || "tawtheeq_jwt_super_secret_key_1446_ah";
  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role, email: user.email },
    secret,
    { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any }
  );

  return { user, token };
};

export const getUserById = async (id: string) => {
  return User.findById(id);
};
