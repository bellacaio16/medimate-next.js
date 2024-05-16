"use client"
import Image from "next/image";
import React from "react";
import Link  from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className="p-4 mt-8  opacity-8 md:p-8 lg:p-10 bg-gray-800 ">
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
      <Image width={30} height="30" src="/fav.png" alt="logo" />
           <p className="ml-2 text-xl text-white font-light">medimate</p>
      </a>
      <p className="my-6 mt-2 text-gray-300">Your Personal Medication Organizer</p>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-slate-200 gap-4">
      <Link href="/" className="hover:scale-105 hover:text-white">Home</Link>
          <Link href="/create" className="hover:scale-105 hover:text-white">Create</Link>
          <Link href="/view" className="hover:scale-105 hover:text-white">View</Link>
      </ul>
      <span className="text-sm text-gray-400 sm:text-center dark:text-gray-400">© 2024-2025 <a href="#" className="hover:underline">medimate</a>. All Rights Reserved.</span>
  </div>
</footer>
    </>
  );
};
