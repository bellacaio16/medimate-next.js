"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profileService } from "@/services/profileService";
import logo from "../app/assets/profileLogo.png";
import bg from "../app/assets/profileBg.jpeg";
import { signoutService } from "@/services/signoutService";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";
import UserContext from "@/context/userContext";
export default function Profile() {
  const userContext =   useContext(UserContext);
  const router = useRouter();
    const initialUser = { name: "", _id: "", email: "" }
  const [user, setUser] = useState(initialUser);
  const fetchUser = async () => {
    try {
      const userData = await profileService();
      await setUser({
        name: userData.user?.name,
        email: userData.user?.email,
        _id: userData.user?._id,
      });
      //   console.log("Client: ", user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleSignout = async () => {
    try {
      const result = await signoutService();
      userContext.setCurrentUser(undefined);
      router.push("/");
      console.log(result);
      setUser(initialUser);
      toast.success("Signed Out!", { position: "top-right" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <Image
          width="100%"
          height="100%"
          className="object-cover object-top w-full"
          src={bg}
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white bg-white rounded-full overflow-hidden">
        <Image
          width={120}
          height={120}
          className="object-cover object-center "
          src={logo}
          alt="Woman looking front"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <button
          onClick={handleSignout}
          className="w-1/2 block mx-auto rounded-full bg-blue-600 hover:shadow-lg font-semibold text-white px-6 py-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
