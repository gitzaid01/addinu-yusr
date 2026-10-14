"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, authService, User } from "@/lib/api";

interface HeaderProps {
  activeTab?: "COURSES" | "STUDENT DASHBOARD" | "COMMUNITY FORUM" | "ADMIN CONSOLE";
}

export default function Header({ activeTab }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="bg-[#d8ddc6] border-b-2 border-[#090c0a]">
      <div className="mx-auto flex flex-col md:flex-row items-stretch">
        {/* Logo Brand Box */}
        <Link
          href="/"
          className="bg-[#090c0a] text-[#d8ddc6] p-3 md:p-4 flex items-center space-x-3 border-r-2 border-[#090c0a] min-w-[240px] hover:bg-[#161b17] transition-colors"
        >
          <div className="w-10 h-10 border-2 border-[#c5ea31] bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="Addinu Yusr Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wider uppercase font-sans leading-none text-white">
              ADDINU YUSR INSTITUTE
            </div>
            <div className="text-[10px] font-arabic text-[#c5ea31] mt-0.5 leading-none">
              معهد الدين يسر للعلوم الشرعية
            </div>
          </div>
        </Link>

        {/* Main Nav Items */}
        <nav className="flex-1 flex flex-wrap items-stretch font-bold text-xs uppercase tracking-wider font-mono">
          <Link
            href="/courses"
            className={`px-6 py-4 flex items-center border-r-2 border-[#090c0a] transition-colors ${
              activeTab === "COURSES"
                ? "bg-[#090c0a] text-[#c5ea31]"
                : "text-[#090c0a] hover:bg-[#c5ea31]/30"
            }`}
          >
            COURSES
          </Link>

          {user?.role !== "ADMIN" && (
            <Link
              href="/dashboard"
              className={`px-6 py-4 flex items-center border-r-2 border-[#090c0a] transition-colors ${
                activeTab === "STUDENT DASHBOARD"
                  ? "bg-[#090c0a] text-[#c5ea31]"
                  : "text-[#090c0a] hover:bg-[#c5ea31]/30"
              }`}
            >
              STUDENT DASHBOARD
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`px-6 py-4 flex items-center border-r-2 border-[#090c0a] transition-colors ${
                activeTab === "ADMIN CONSOLE"
                  ? "bg-[#090c0a] text-[#c5ea31]"
                  : "text-[#090c0a] hover:bg-[#c5ea31]/30"
              }`}
            >
              ADMIN CONSOLE
            </Link>
          )}

          <Link
            href="/community"
            className={`px-6 py-4 flex items-center border-r-2 border-[#090c0a] transition-colors ${
              activeTab === "COMMUNITY FORUM"
                ? "bg-[#090c0a] text-[#c5ea31]"
                : "text-[#090c0a] hover:bg-[#c5ea31]/30"
            }`}
          >
            COMMUNITY FORUM
          </Link>
        </nav>

        {/* Action Controls & User Info */}
        <div className="flex items-center border-t-2 md:border-t-0 md:border-l-2 border-[#090c0a] divide-x-2 divide-[#090c0a]">
          {user ? (
            <div className="flex items-center">
              <Link
                href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="bg-[#090c0a] text-white px-4 py-2 flex items-center space-x-3 text-xs hover:bg-[#161b17]"
              >
                <div className="text-right font-mono">
                  <div className="text-[10px] text-[#9baa90] uppercase flex items-center justify-end space-x-1">
                    <span>{user.name.split(" ")[0]}</span>
                    <span className="bg-[#c5ea31] text-[#090c0a] px-1 text-[8px] font-bold">{user.role}</span>
                  </div>
                  <div className="text-[#c5ea31] font-bold text-[10px]">{user.email}</div>
                </div>
                <div className="w-6 h-6 bg-[#c5ea31] text-[#090c0a] flex items-center justify-center font-bold font-mono text-xs border border-[#090c0a]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-4 text-[10px] font-mono font-bold uppercase hover:bg-red-200 text-red-900 border-l border-[#090c0a]"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#c5ea31] text-[#090c0a] font-mono font-extrabold px-6 py-4 text-xs uppercase hover:bg-[#b0d624] tracking-wider"
            >
              PORTAL LOGIN -&gt;
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
