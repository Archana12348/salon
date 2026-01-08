// import React from "react";

// function AdminHeader() {
//   return <div>AdminHeader</div>;
// }

// export default AdminHeader;
"use client";

import { useState, useRef, useEffect } from "react";
import { PackageX, Bell, User, LogOut, Settings, Menu } from "lucide-react";
import Button from "../components/ui/Button";
import { logout } from "../utils/auth";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = true; // replace with auth logic

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur shadow-sm border-red-900 bg-white">
      <div className="flex h-16 items-center px-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-black" />
          </Button>
          <h1 className="text-lg font-semibold text-[#00CED1]">Salon</h1>
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5 text-black" />
          </Button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen((prev) => !prev)}
            >
              <User className="h-5 w-5 text-black" />
            </Button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                {isLoggedIn ? (
                  <>
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium">Admin User</p>
                    </div>

                    <div className="p-1">
                      <button className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </button>

                      <button className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </button>

                      <div className="border-t my-1" />

                      <button
                        className="flex w-full items-center px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2">
                    <button className="flex w-full items-center px-2 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <LogOut className="mr-2 h-4 w-4" />
                      Login
                    </button>

                    <button className="flex w-full items-center px-2 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <User className="mr-2 h-4 w-4" />
                      Signup
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
