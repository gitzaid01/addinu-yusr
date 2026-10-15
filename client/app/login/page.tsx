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

        if (res.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        const res = await authService.register({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role,
          phone: phone.trim() || undefined,
        });

        if (res.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header />

      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <span>PORTAL GATEWAY // IDENTITY AUTHENTICATION</span>
        </div>
        <div className="text-[10px] text-[#5a655b] font-bold">
          <span>PROTOCOL: TLS 1.3 // ENCRYPTED</span>
        </div>
      </div>

      <section className="p-4 md:p-12 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md border-2 border-[#090c0a] bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_#090c0a] font-mono">
          {/* Terminal Banner */}
          <div className="bg-[#090c0a] text-white p-3 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 flex justify-between items-center">
            <span className="font-extrabold text-xs uppercase tracking-wider">
              {mode === "LOGIN"
                ? role === "ADMIN"
                  ? "ADMIN SCHOLAR AUTHENTICATION"
                  : "STUDENT PORTAL LOGIN"
                : "NEW SCHOLAR REGISTRATION"}
            </span>
            <span className="bg-[#c5ea31] text-[#090c0a] text-[10px] px-1.5 py-0.5 font-bold">
              {role}
            </span>
          </div>

          {/* Mode Tabs: LOGIN vs REGISTER */}
          <div className="flex border-2 border-[#090c0a] mb-4">
            <button
              type="button"
              onClick={() => {
                setMode("LOGIN");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-center text-xs font-bold uppercase ${
                mode === "LOGIN" ? "bg-[#090c0a] text-[#c5ea31]" : "bg-white text-[#090c0a] hover:bg-[#e4e9d3]"
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
              className={`flex-1 py-2 text-center text-xs font-bold uppercase ${
                mode === "REGISTER" ? "bg-[#090c0a] text-[#c5ea31]" : "bg-white text-[#090c0a] hover:bg-[#e4e9d3]"
              }`}
            >
              REGISTER
            </button>
          </div>

          {/* Role Check / Selector Tabs (Available in BOTH Login and Register) */}
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
              LOGIN AS / PORTAL ACCESS ROLE
            </label>
            <div className="flex border-2 border-[#090c0a] divide-x-2 divide-[#090c0a]">
              <button
                type="button"
                onClick={() => {
                  setRole("STUDENT");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-[11px] font-bold uppercase transition-colors ${
                  role === "STUDENT"
                    ? "bg-[#c5ea31] text-[#090c0a] shadow-inner font-extrabold"
                    : "bg-white text-[#090c0a] hover:bg-[#f4f7eb]"
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
                className={`flex-1 py-2 text-[11px] font-bold uppercase transition-colors ${
                  role === "ADMIN"
                    ? "bg-[#090c0a] text-[#c5ea31] font-extrabold"
                    : "bg-white text-[#090c0a] hover:bg-[#f4f7eb]"
                }`}
              >
                ADMIN SCHOLAR
              </button>
            </div>
          </div>

          {/* Admin Helper Box in Login Mode */}
          {role === "ADMIN" && mode === "LOGIN" && (
            <div className="bg-[#f4f7eb] border-2 border-[#090c0a] p-3 text-[11px] mb-4 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[#090c0a]">DEFAULT ADMIN CREDENTIALS</span>
                <button
                  type="button"
                  onClick={handleFillAdminCredentials}
                  className="bg-[#c5ea31] hover:bg-[#b5da21] text-[#090c0a] border border-[#090c0a] px-2 py-0.5 text-[10px] font-extrabold cursor-pointer transition-all"
                >
                  ⚡ AUTO-FILL
                </button>
              </div>
              <div className="text-[10px] text-[#5a655b] leading-tight">
                Email: <span className="font-bold text-[#090c0a]">admin@tawtheeq.edu</span>
                <br />
                Password: <span className="font-bold text-[#090c0a]">AdminPassword123!</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-100 border-2 border-red-800 text-red-900 p-3 text-xs mb-4 font-bold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "REGISTER" && (
              <div>
                <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Zayd Ibn Thabit"
                  className="w-full bg-[#f9faf7] border-2 border-[#090c0a] p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#c5ea31]"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
                INSTITUTIONAL EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "ADMIN" ? "admin@tawtheeq.edu" : "student@example.com"}
                className="w-full bg-[#f9faf7] border-2 border-[#090c0a] p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#c5ea31]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
                SECURITY PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#f9faf7] border-2 border-[#090c0a] p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#c5ea31]"
              />
            </div>

            {mode === "REGISTER" && (
              <div>
                <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
                  PHONE (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="w-full bg-[#f9faf7] border-2 border-[#090c0a] p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#c5ea31]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase tracking-wider hover:bg-[#b0d624] shadow-[3px_3px_0px_0px_#090c0a] transition-all disabled:opacity-50 cursor-pointer"
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
