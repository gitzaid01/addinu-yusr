const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("tawtheeq_token");
}

export function setStoredToken(token: string, user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("tawtheeq_token", token);
  localStorage.setItem("tawtheeq_user", JSON.stringify(user));
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("tawtheeq_token");
  localStorage.removeItem("tawtheeq_user");
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("tawtheeq_user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    const errorMsg = data.message || "An unexpected API error occurred";
    const err: any = new Error(errorMsg);
    err.errors = data.errors;
    err.status = response.status;
    throw err;
  }

  return data.data;
}

// ---------------------------
// AUTH SERVICE
// ---------------------------
export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setStoredToken(res.token, res.user);
    return res;
  },

  register: async (userData: { name: string; email: string; password: string; role?: string; phone?: string }): Promise<AuthResponse> => {
    const res = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    setStoredToken(res.token, res.user);
    return res;
  },

  logout: async (): Promise<void> => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore network logout errors
    } finally {
      clearStoredAuth();
    }
  },

  getMe: async (): Promise<User> => {
    const res = await apiFetch<{ user: User }>("/auth/me");
    return res.user;
  },
};

// ---------------------------
// COURSE SERVICE
// ---------------------------
export const courseService = {
  getPublicCourses: async () => apiFetch("/courses"),
  getCourseById: async (id: string) => apiFetch(`/courses/${id}`),
  getAdminCourses: async () => apiFetch("/admin/courses"),
  createCourse: async (data: any) => apiFetch("/admin/courses", { method: "POST", body: JSON.stringify(data) }),
  updateCourse: async (id: string, data: any) => apiFetch(`/admin/courses/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteCourse: async (id: string) => apiFetch(`/admin/courses/${id}`, { method: "DELETE" }),
  updateStatus: async (id: string, status: string) => apiFetch(`/admin/courses/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  updateMeeting: async (id: string, meetingLink: string) => apiFetch(`/admin/courses/${id}/meeting`, { method: "PATCH", body: JSON.stringify({ meetingLink }) }),
  getCourseStudents: async (courseId: string) => apiFetch(`/admin/courses/${courseId}/students`),
};

// ---------------------------
// ENROLLMENT SERVICE
// ---------------------------
export const enrollmentService = {
  adminEnrollStudent: async (studentId: string, courseId: string) =>
    apiFetch("/admin/enrollments", { method: "POST", body: JSON.stringify({ studentId, courseId }) }),
  getAdminEnrollments: async () => apiFetch("/admin/enrollments"),
  updateEnrollment: async (id: string, data: { status: string; progress?: number }) =>
    apiFetch(`/admin/enrollments/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  getStudentEnrollments: async () => apiFetch("/student/enrollments"),
  getStudentEnrollmentById: async (id: string) => apiFetch(`/student/enrollments/${id}`),
};

// ---------------------------
// ATTENDANCE SERVICE
// ---------------------------
export const attendanceService = {
  markAttendance: async (data: { courseId: string; studentId: string; date: string; status: string; remarks?: string }) =>
    apiFetch("/admin/attendance", { method: "POST", body: JSON.stringify(data) }),
  updateAttendance: async (id: string, data: { status: string; remarks?: string }) =>
    apiFetch(`/admin/attendance/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  getCourseAttendance: async (courseId: string) => apiFetch(`/admin/courses/${courseId}/attendance`),
  getStudentCourseAttendance: async (courseId: string) => apiFetch(`/student/courses/${courseId}/attendance`),
  getStudentAttendanceSummary: async () => apiFetch("/student/attendance"),
};

// ---------------------------
// COMPLETION SERVICE
// ---------------------------
export const completionService = {
  createCompletion: async (data: { studentId: string; courseId: string; completionPercentage?: number; remarks?: string }) =>
    apiFetch("/admin/completions", { method: "POST", body: JSON.stringify(data) }),
  getAdminCompletions: async () => apiFetch("/admin/completions"),
  getStudentCompletions: async () => apiFetch("/student/completions"),
  getStudentCourseCompletion: async (courseId: string) => apiFetch(`/student/courses/${courseId}/completion`),
};

// ---------------------------
// CONTENT SERVICE
// ---------------------------
export const contentService = {
  getPublishedContent: async () => apiFetch("/content"),
  getContentBySlug: async (slug: string) => apiFetch(`/content/${slug}`),
  getAdminContent: async () => apiFetch("/admin/content"),
  createContent: async (data: { title: string; content: string; type: string; status?: string }) =>
    apiFetch("/admin/content", { method: "POST", body: JSON.stringify(data) }),
  updateContent: async (id: string, data: any) => apiFetch(`/admin/content/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteContent: async (id: string) => apiFetch(`/admin/content/${id}`, { method: "DELETE" }),
  updateStatus: async (id: string, status: string) => apiFetch(`/admin/content/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

// ---------------------------
// DASHBOARD SERVICE
// ---------------------------
export const dashboardService = {
  getStudentDashboard: async () => apiFetch("/student/dashboard"),
  getAdminDashboard: async () => apiFetch("/admin/dashboard"),
};

// ---------------------------
// STUDENT SERVICE (ADMIN VIEW)
// ---------------------------
export const studentService = {
  getProfile: async () => apiFetch("/student/profile"),
  updateProfile: async (data: { name?: string; phone?: string }) => apiFetch("/student/profile", { method: "PATCH", body: JSON.stringify(data) }),
  getAdminStudents: async () => apiFetch("/admin/students"),
  getAdminStudentById: async (id: string) => apiFetch(`/admin/students/${id}`),
};
