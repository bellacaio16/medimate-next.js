"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "@/context/userContext";

export const Navbar = () => {
  const user = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar sticky top-0 flex h-50 bg-white border-b py-4 text-slate-900 font-normal justify-between items-center px-6 lg:px-12">
        <Link href="/" className="flex gap-2 hover:scale-105">
          <Image width={30} height={30} src="/fav.png" alt="logo" />
          <p className="text-xl">medimate</p>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-slate-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Links for Desktop */}
        <ul className="hidden lg:flex gap-6">
          <Link href="/" className="hover:scale-105 hover:text-black">
            Home
          </Link>
          <Link href="/create" className="hover:scale-105 hover:text-black">
            Create
          </Link>
          <Link href="/view" className="hover:scale-105 hover:text-black">
            View
          </Link>
        </ul>

        {/* Profile and Authentication Buttons */}
        <ul className="hidden lg:flex gap-6 items-center">
          {user.currentUser && (
            <Link
              className="rounded-full w-10 h-10 border border-blue-700 hover:bg-blue-700 border-blue-600 hover:text-white bg-blue-600 text-white active:bg-blue-800 focus:opacity-95 text-center flex items-center justify-center"
              href="/profile"
            >
              <span>{user.currentUser.name[0].toUpperCase()}</span>
            </Link>
          )}
          {!user.currentUser && (
            <>
              <Link
                className="rounded-full w-30 border px-5 py-2 bg-white border-blue-600 text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:opacity-95"
                href="/signin"
              >
                Sign In
              </Link>
              <Link
                className="rounded-full w-35 border px-4 py-2 hover:bg-blue-700 border-blue-600 hover:text-white bg-blue-600 text-white active:bg-blue-800 focus:opacity-95"
                href="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden flex flex-col gap-4 absolute top-16 left-0 w-full bg-white border-b py-4 text-center z-10">
            <Link
              href="/"
              className="hover:scale-105 hover:text-black"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/create"
              className="hover:scale-105 hover:text-black"
              onClick={toggleMobileMenu}
            >
              Create
            </Link>
            <Link
              href="/view"
              className="hover:scale-105 hover:text-black"
              onClick={toggleMobileMenu}
            >
              View
            </Link>
            {user.currentUser ? (
              <Link
                className="rounded-full w-10 h-10 border border-blue-700 hover:bg-blue-700 border-blue-600 hover:text-white bg-blue-600 text-white active:bg-blue-800 focus:opacity-95 text-center flex items-center justify-center mx-auto"
                href="/profile"
                onClick={toggleMobileMenu}
              >
                <span>{user.currentUser.name[0].toUpperCase()}</span>
              </Link>
            ) : (
              <>
                <Link
                  className="rounded-full w-30 border px-5 py-2 bg-white border-blue-600 text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:opacity-95 mx-auto"
                  href="/signin"
                  onClick={toggleMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  className="rounded-full w-35 border px-4 py-2 hover:bg-blue-700 border-blue-600 hover:text-white bg-blue-600 text-white active:bg-blue-800 focus:opacity-95 mx-auto"
                  href="/signup"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};
