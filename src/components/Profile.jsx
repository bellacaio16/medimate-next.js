'use client';
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { profileService } from "@/services/profileService";
import logo from "../app/assets/profileLogo.png";
import bg from "../app/assets/profileBg.jpeg";
import { signoutService } from "@/services/signoutService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserContext from "@/context/userContext";

export default function Profile() {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const initialUser = { name: "", _id: "", email: "" };
  const [user, setUser] = useState(initialUser);

  const fetchUser = async () => {
    try {
      const userData = await profileService();
      setUser({
        name: userData.user?.name,
        email: userData.user?.email,
        _id: userData.user?._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSignout = async () => {
    try {
      await signoutService();
      userContext.setCurrentUser(undefined);
      router.push("/");
      setUser(initialUser);
      toast.success("Signed Out!", { position: "top-right" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto shadow-xl rounded-lg -z-20 pt-8 text-gray-900">
      <div className="relative h-32 c overflow-hidden rounded-t-lg">
        <Image
          layout="fill"
          className="object-cover -z-10 object-top w-full "
          src={bg}
          alt="Background"
        />
      </div>
      <div className="relative -z-10 mx-auto w-24 h-24 sm:w-32 sm:h-32 border-4 border-white bg-white rounded-full overflow-hidden">
        <Image
          width={120}
          height={120}
          className="object-cover -z-10  object-center"
          src={logo}
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>
      </div>
      <div className="p-4 border-t mx-4 mt-4">
        <button
          onClick={handleSignout}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 font-semibold text-white px-6 py-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
