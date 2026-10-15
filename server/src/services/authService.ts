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

export const initAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@tawtheeq.edu").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "AdminPassword123!").trim();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      await User.create({
        name: "Shaykh Al-Admin (Director)",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        phone: "+966500000000",
      });
      console.log(`[Database] Initialized default admin user: ${adminEmail}`);
    } else {
      existing.role = "ADMIN";
      existing.passwordHash = passwordHash;
      await existing.save();
      console.log(`[Database] Synchronized default admin credentials: ${adminEmail}`);
    }
  } catch (err: any) {
    console.error(`[Database] Error initializing default admin: ${err.message}`);
  }
};

export const registerUser = async (input: RegisterInput) => {
  const email = input.email.trim().toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    const error: any = new Error("User with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(input.password.trim(), salt);

  const user = await User.create({
    name: input.name.trim(),
    email,
    passwordHash,
    role: input.role || "STUDENT",
    phone: input.phone?.trim(),
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
  const email = input.email.trim().toLowerCase();
  const password = input.password.trim();

  const user = await User.findOne({ email });
  if (!user) {
    const error: any = new Error("Invalid credentials - user does not exist");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error: any = new Error("Invalid credentials - incorrect password");
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
