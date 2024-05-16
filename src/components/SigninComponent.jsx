"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import signinSvg from "../app/assets/signinSvg.svg";
import githubLogo from "../app/assets/githubLogo.svg";
import googleLogo from "../app/assets/googleLogo.svg";
import { toast } from "react-toastify";

import { signinService } from "@/services/signinService";
import { useRouter } from "next/navigation";
import Link from "next/link";

import UserContext from "@/context/userContext";
const SigninComponent = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const initialSigninData = {
    email: "",
    password: "",
  };
  const [signinData, setSigninData] = useState(initialSigninData);
  const validateInputs = () => {
    if (
      signinData.name === "" ||
      signinData.email === "" ||
      signinData.password === ""
    ) {
      toast.error(`Required fields missing `, { position: "top-right" });
      return false;
    } else {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (pattern.test(signinData.email)) {
        return true;
      }

      toast.error(`Please enter valid Email Address`, {
        position: "top-right",
      });

      return false;
    }
  };
  const handleSigninForm = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }
    try {
      const response = await signinService(signinData);
 
      if (response) {
        userContext.setCurrentUser(response.user)
        console.log("Result:", response);
        setSigninData(initialSigninData);
        toast.success("Welcome back.", { position: "top-right" });
        router.push("/");
      } else {
        toast.error(`User not Exist! `, { position: "top-right" });
        setSigninData(initialSigninData);
        return;
      }
    } catch (err) {
      // console.log(err);
      toast.error(`Sign In failed!`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex h-max mt-8 mx-auto w-8/12 shadow-stone-500 shadow-xl ">
      <div className="hidden p-12 lg:flex items-center justify-center flex-1 text-black">
        <div className="max-w-md text-center">
          <Image src={signinSvg} alt="signin" width="10%" height="10%" />
        </div>
      </div>
      <div className="w-full p-12 bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign In
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <Image src={googleLogo} alt="signin" width="20" height="20" />{" "}
                Sign In with Google{" "}
              </button>
            </div>
            <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <Image src={githubLogo} alt="signin" width="20" height="20" />{" "}
                Sign In with Github{" "}
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form
            action="#!"
            onSubmit={handleSigninForm}
            method="POST"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(event) => {
                  setSigninData({ ...signinData, email: event.target.value });
                }}
                value={signinData.email}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => {
                  setSigninData({
                    ...signinData,
                    password: event.target.value,
                  });
                }}
                value={signinData.password}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              New User?{" "}
              <Link href="/signup" className="text-black hover:underline">
                Sign Up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninComponent;
