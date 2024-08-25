"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import signupSvg from "../app/assets/signupSvg.svg";
import githubLogo from "../app/assets/githubLogo.svg";
import googleLogo from "../app/assets/googleLogo.svg";
import { toast } from "react-toastify";
import { signupService } from "@/services/signupService";
import { useRouter } from "next/navigation";
import Link from "next/link";

import UserContext from "@/context/userContext";

export const SignupComponent = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  
  const initialSignupData = {
    name: "",
    email: "",
    password: "",
  };
  const [signupData, setSignupData] = useState(initialSignupData);

  const validateInputs = () => {
    if (
      signupData.name === "" ||
      signupData.email === "" ||
      signupData.password === ""
    ) {
      toast.error("Required fields missing", { position: "top-right" });
      return false;
    } else {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (pattern.test(signupData.email)) {
        return true;
      }

      toast.error("Please enter a valid Email Address", { position: "top-right" });
      return false;
    }
  };

  const handleSignupForm = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await signupService(signupData);

      if (response) {
        userContext.setCurrentUser(response.user);
        setSignupData(initialSignupData);
        toast.success("Signup Successful!", { position: "top-right" });
        router.push("/");
      } else {
        toast.error("Email already registered!", { position: "top-right" });
        setSignupData(initialSignupData);
      }
    } catch (err) {
      toast.error("Signup Failed!", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-max mt-4 mb-4 mx-auto w-full lg:w-10/12 xl:w-8/12 shadow-stone-500 shadow-xl">
      <div className="hidden lg:flex items-center justify-center w-1/2 p-8 bg-gray-50">
        <div className="max-w-xs">
          <Image src={signupSvg} alt="signup" width={150} height={150} />
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-6 py-8 bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-2xl lg:text-3xl font-semibold mb-4 text-black text-center">
            Sign Up
          </h1>
          <h2 className="text-sm lg:text-base font-semibold mb-4 text-gray-500 text-center">
            Join our community with all-time access and free benefits
          </h2>
          <div className="mt-4 flex flex-col lg:flex-row items-center lg:items-start justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <Image src={googleLogo} alt="signup" width={20} height={20} />
                Sign Up with Google
              </button>
            </div>
            <div className="w-full lg:w-1/2 lg:ml-2">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <Image src={githubLogo} alt="signup" width={20} height={20} />
                Sign Up with Github
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleSignupForm} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(event) => setSignupData({ ...signupData, name: event.target.value })}
                value={signupData.name}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
                value={signupData.email}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                value={signupData.password}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already a user?{" "}
              <Link href="/signin" className="text-black hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
