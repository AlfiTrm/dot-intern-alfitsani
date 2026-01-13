import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../features/auth";
import useNavbarScroll from "../hooks/useNavbarScroll";
import Modal from "./Modal";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isScrolling = useNavbarScroll();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-3xl transition-all duration-300 ease-out ${
          isScrolling
            ? "top-3 md:top-6 -translate-y-1/2 opacity-90 scale-95"
            : "top-3 md:top-6 translate-y-0 opacity-100 scale-100"
        }`}
      >
        <div className="px-4 py-2.5 md:px-8 md:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1
              className="text-xl md:text-3xl font-black tracking-tighter bg-primary bg-clip-text text-transparent leading-none select-none cursor-pointer"
              onClick={() => navigate("/")}
            >
              QuiSip
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">
                Player
              </span>
              <span className="text-lg font-bold text-gray-800 leading-none">
                {user?.username}
              </span>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="group flex items-center gap-1.5 md:gap-2 pl-1 pr-2.5 md:pr-4 py-1 rounded-full bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all border border-gray-100 hover:border-red-100"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-gray-400 group-hover:text-red-500 border border-gray-200 group-hover:border-red-200 flex items-center justify-center shadow-sm transition-all">
                <LogOut className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span className="text-xs md:text-sm font-bold">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Keluar dari QuiSip?"
        message="Kamu yakin mau keluar? Progress kuis yang belum selesai akan hilang."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        variant="danger"
      />
    </>
  );
}
