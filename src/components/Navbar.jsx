"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "@/context/userContext";

export const Navbar = () => {
  const user = useContext(UserContext);
  console.log(user);
  
  return (
    <>
      <nav className="navbar sticky top-0 flex h-50 bg-white border-b py-4 text-slate-900 font-normal justify-around items-center ">
        <Link href="/" className="flex gap-2 hover:scale-105">
          <Image width={30} height="30" src="/fav.png" alt="logo" />
          <p className="text-xl ">medimate</p>
        </Link>
        <ul className="flex  gap-6">
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
        <ul className="flex gap-6 items-center">
          {user.currentUser && (
            <Link
              className="rounded-full w-10 h-10 border  border-blue-700 hover:bg-blue-700 border-blue-600  hover:text-white  bg-blue-600 text-white active:bg-blue-800 focus:opacity-95 text-center items-center text-lg flex justify-center"
              href="/profile"
            >
              <span>{user.currentUser.name[0].toUpperCase()}</span>
            </Link>
          )}
          {!user.currentUser && (
            <>
              <Link
                className="rounded-full w-30 border  px-5 py-2 bg-white border-blue-600  text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:opacity-95"
                href="/signin"
              >
                Sign In
              </Link>
              <Link
                className="rounded-full w-35 border  px-4 py-2 hover:bg-blue-700 border-blue-600  hover:text-white  bg-blue-600 text-white active:bg-blue-800 focus:opacity-95"
                href="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
