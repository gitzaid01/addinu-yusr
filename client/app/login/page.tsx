"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import { authService } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFillAdminCredentials = () => {
    setEmail("admin@tawtheeq.edu");
    setPassword("AdminPassword123!");
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (mode === "LOGIN") {
        const res = await authService.login({
          email: email.trim(),
          password: password.trim(),
        });

        // Informative guidance based on selected role tab vs actual user role
        if (role === "ADMIN" && res.user.role !== "ADMIN") {
          setErrorMsg("This account is registered as a STUDENT. Redirecting to Student Console...");
          setTimeout(() => router.push("/dashboard"), 1200);
          return;
        }

        const redirectParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("redirect") : null;

        if (res.user.role === "ADMIN") {
          router.push(redirectParam || "/admin");
        } else {
          router.push(redirectParam || "/dashboard");
        }
      } else {
        const res = await authService.register({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role,
          phone: phone.trim() || undefined,
        });

        const redirectParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("redirect") : null;

        if (res.user.role === "ADMIN") {
          router.push(redirectParam || "/admin");
        } else {
          router.push(redirectParam || "/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased flex flex-col selection:bg-[#166236] selection:text-white">
      <TopBanner />
      <Header />

      <div className="bg-[#faf8f5] border-b border-[#e6e0d4] px-4 md:px-8 py-3 flex justify-between items-center font-sans text-xs text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#166236]">Student & Faculty Portal // Secure Access</span>
        </div>
        <div className="text-[11px] text-gray-500 font-medium">
          <span>Encrypted Session • TLS 1.3</span>
        </div>
      </div>

      <section className="p-4 md:p-12 flex-1 flex items-center justify-center bg-[#faf8f5]">
        <div className="w-full max-w-md border border-[#e6e0d4] rounded-3xl bg-white p-6 md:p-8 shadow-xs font-sans overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#14241c] text-white p-4 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 flex justify-between items-center">
            <span className="font-serif font-bold text-xs uppercase tracking-wider">
              {mode === "LOGIN"
                ? role === "ADMIN"
                  ? "Admin Scholar Authentication"
                  : "Student Portal Login"
                : "New Student Registration"}
            </span>
            <span className="bg-[#166236] text-white text-[10px] px-2.5 py-0.5 font-bold rounded-full shadow-xs">
              {role}
            </span>
          </div>

          {/* Mode Tabs: LOGIN vs REGISTER */}
          <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50 mb-4 gap-1">
            <button
              type="button"
              onClick={() => {
                setMode("LOGIN");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-center text-xs font-bold uppercase transition-all rounded-lg cursor-pointer ${
                mode === "LOGIN" ? "bg-[#166236] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("REGISTER");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-center text-xs font-bold uppercase transition-all rounded-lg cursor-pointer ${
                mode === "REGISTER" ? "bg-[#166236] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              REGISTER
            </button>
          </div>

          {/* Role Check / Selector Tabs */}
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
              LOGIN AS / PORTAL ACCESS ROLE
            </label>
            <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50 gap-1">
              <button
                type="button"
                onClick={() => {
                  setRole("STUDENT");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-[11px] font-bold uppercase transition-all rounded-lg cursor-pointer ${
                  role === "STUDENT"
                    ? "bg-[#166236] text-white shadow-xs font-extrabold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                STUDENT
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("ADMIN");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-[11px] font-bold uppercase transition-all rounded-lg cursor-pointer ${
                  role === "ADMIN"
                    ? "bg-[#166236] text-white shadow-xs font-extrabold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ADMIN SCHOLAR
              </button>
            </div>
          </div>

          {/* Admin Helper Box in Login Mode */}
          {role === "ADMIN" && mode === "LOGIN" && (
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 text-[11px] mb-4 space-y-1.5 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[#166236]">DEFAULT ADMIN CREDENTIALS</span>
                <button
                  type="button"
                  onClick={handleFillAdminCredentials}
                  className="bg-[#166236] hover:bg-[#124f2b] text-white rounded-lg px-2.5 py-1 text-[10px] font-extrabold cursor-pointer transition-all shadow-xs"
                >
                  ⚡ AUTO-FILL
                </button>
              </div>
              <div className="text-[10px] text-gray-600 leading-tight">
                Email: <span className="font-bold text-gray-900">admin@tawtheeq.edu</span>
                <br />
                Password: <span className="font-bold text-gray-900">AdminPassword123!</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-xs mb-4 font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "REGISTER" && (
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Zayd Ibn Thabit"
                  className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all shadow-xs"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                INSTITUTIONAL EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "ADMIN" ? "admin@tawtheeq.edu" : "student@example.com"}
                className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                SECURITY PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all shadow-xs"
              />
            </div>

            {mode === "REGISTER" && (
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  PHONE (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all shadow-xs"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#166236] text-white rounded-xl py-3.5 font-extrabold text-xs uppercase tracking-wider hover:bg-[#124f2b] shadow-sm hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? "AUTHENTICATING..."
                : mode === "LOGIN"
                ? role === "ADMIN"
                  ? "ENTER ADMIN CONSOLE ->"
                  : "ENTER STUDENT CONSOLE ->"
                : "CREATE ACCOUNT ->"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
