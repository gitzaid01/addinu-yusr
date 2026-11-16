"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, authService, User } from "@/lib/api";

interface HeaderProps {
  activeTab?: "COURSES" | "STUDENT DASHBOARD" | "COMMUNITY FORUM" | "ADMIN CONSOLE";
}

export default function Header({ activeTab }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e6e0d4] shadow-xs relative z-40">
      <div className="w-full flex flex-col md:flex-row items-stretch justify-between">
        <div
          className={`flex items-center justify-between p-3 md:p-4 ${
            mobileMenuOpen ? "border-b border-[#e6e0d4]" : ""
          } md:border-b-0 md:border-r border-[#e6e0d4] bg-[#faf8f5] min-w-[240px]`}
        >
          {/* Logo Brand Box */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 transition-colors group"
          >
            <div className="w-10 h-10 border border-[#e6e0d4] bg-white flex items-center justify-center overflow-hidden shrink-0 rounded-full shadow-xs group-hover:border-[#166236]/40 transition-colors">
              <img src="/logo.jpg" alt="Addinu Yusr Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif font-bold text-sm tracking-wider uppercase leading-none text-[#14241c]">
                ADDINU YUSR INSTITUTE
              </div>
              <div className="text-[10px] font-arabic text-[#166236] mt-0.5 leading-none">
                معهد الدين يسر للعلوم الشرعية
              </div>
            </div>
          </Link>

          {/* Mobile menu toggle button */}
          <div className="flex items-center space-x-2 md:hidden">
            {user && (
              <Link
                href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 bg-[#166236] text-white flex items-center justify-center font-bold font-sans text-xs rounded-full shadow-xs"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="px-3 py-1.5 border border-[#e6e0d4] bg-white text-[#14241c] rounded-xl font-sans font-semibold text-xs uppercase flex items-center space-x-1.5 hover:bg-stone-50 hover:border-[#166236]/30 transition-all shadow-xs"
            >
              <span className="text-sm font-bold">{mobileMenuOpen ? "✕" : "☰"}</span>
              <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </div>

        {/* Desktop Main Nav Items */}
        <nav className="hidden md:flex flex-1 items-stretch font-semibold text-xs tracking-wider font-sans">
          <Link
            href="/courses"
            className={`px-6 py-4 flex items-center border-r border-[#e6e0d4] transition-colors ${
              activeTab === "COURSES"
                ? "bg-[#166236] text-white"
                : "text-[#14241c]/80 hover:bg-[#166236]/10 hover:text-[#166236]"
            }`}
          >
            COURSES
          </Link>

          {user?.role !== "ADMIN" && (
            <Link
              href="/dashboard"
              className={`px-6 py-4 flex items-center border-r border-[#e6e0d4] transition-colors ${
                activeTab === "STUDENT DASHBOARD"
                  ? "bg-[#166236] text-white"
                  : "text-[#14241c]/80 hover:bg-[#166236]/10 hover:text-[#166236]"
              }`}
            >
              STUDENT DASHBOARD
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`px-6 py-4 flex items-center border-r border-[#e6e0d4] transition-colors ${
                activeTab === "ADMIN CONSOLE"
                  ? "bg-[#166236] text-white"
                  : "text-[#14241c]/80 hover:bg-[#166236]/10 hover:text-[#166236]"
              }`}
            >
              ADMIN CONSOLE
            </Link>
          )}

          <Link
            href="/community"
            className={`px-6 py-4 flex items-center border-r border-[#e6e0d4] transition-colors ${
              activeTab === "COMMUNITY FORUM"
                ? "bg-[#166236] text-white"
                : "text-[#14241c]/80 hover:bg-[#166236]/10 hover:text-[#166236]"
            }`}
          >
            COMMUNITY FORUM
          </Link>
        </nav>

        {/* Desktop Action Controls & User Info */}
        <div className="hidden md:flex items-center border-l border-[#e6e0d4] px-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="bg-[#14241c] text-white px-3.5 py-1.5 flex items-center space-x-3 text-xs rounded-xl hover:bg-[#1e3328] transition-all shadow-xs"
              >
                <div className="text-right font-sans">
                  <div className="text-[10px] text-gray-300 uppercase flex items-center justify-end space-x-1">
                    <span>{user.name.split(" ")[0]}</span>
                    <span className="bg-[#166236] text-white px-1.5 py-0.2 text-[8px] font-bold rounded-full">{user.role}</span>
                  </div>
                  <div className="text-emerald-300 font-medium text-[10px]">{user.email}</div>
                </div>
                <div className="w-7 h-7 bg-[#166236] text-white flex items-center justify-center font-bold font-sans text-xs rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-[10px] font-sans font-bold uppercase hover:bg-red-50 text-red-700 rounded-lg transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#166236] text-white font-sans font-semibold px-5 py-2.5 text-xs uppercase hover:bg-[#114e2a] tracking-wider transition-all rounded-xl shadow-xs flex items-center"
            >
              PORTAL LOGIN -&gt;
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu for Small Screens */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e6e0d4] bg-[#faf8f5] font-sans text-xs font-semibold uppercase shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 p-4 space-y-2">
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className={`p-3 rounded-xl flex items-center justify-between transition-all ${
              activeTab === "COURSES"
                ? "bg-[#166236] text-white"
                : "text-[#14241c] hover:bg-white border border-transparent hover:border-[#e6e0d4]"
            }`}
          >
            <span>COURSES CATALOGUE</span>
            <span>↗</span>
          </Link>

          {user?.role !== "ADMIN" && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === "STUDENT DASHBOARD"
                  ? "bg-[#166236] text-white"
                  : "text-[#14241c] hover:bg-white border border-transparent hover:border-[#e6e0d4]"
              }`}
            >
              <span>STUDENT DASHBOARD</span>
              <span>↗</span>
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === "ADMIN CONSOLE"
                  ? "bg-[#166236] text-white"
                  : "text-[#14241c] hover:bg-white border border-transparent hover:border-[#e6e0d4]"
              }`}
            >
              <span>ADMIN CONSOLE</span>
              <span>↗</span>
            </Link>
          )}

          <Link
            href="/community"
            onClick={() => setMobileMenuOpen(false)}
            className={`p-3 rounded-xl flex items-center justify-between transition-all ${
              activeTab === "COMMUNITY FORUM"
                ? "bg-[#166236] text-white"
                : "text-[#14241c] hover:bg-white border border-transparent hover:border-[#e6e0d4]"
            }`}
          >
            <span>COMMUNITY FORUM</span>
            <span>↗</span>
          </Link>

          {/* User actions in mobile dropdown */}
          <div className="pt-2">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 border border-[#e6e0d4] bg-white rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 bg-[#166236] text-white flex items-center justify-center font-bold text-xs rounded-full shadow-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#14241c] leading-none mb-1">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-gray-500 leading-none lowercase">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <span className="bg-[#166236] text-white text-[9px] px-2 py-0.5 font-bold uppercase rounded-full">
                    {user.role}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 bg-[#14241c] text-white py-2.5 px-3 text-center text-xs font-semibold hover:bg-[#1e3328] rounded-xl transition-all shadow-xs"
                  >
                    MY CONSOLE
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-50 text-red-700 border border-red-100 py-2.5 px-3 text-center text-xs font-semibold hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#166236] text-white rounded-xl py-3 text-center font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#114e2a] block shadow-xs transition-all"
              >
                PORTAL LOGIN -&gt;
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
