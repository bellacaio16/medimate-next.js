"use client";
import { createService } from "@/services/createService";
import { profileService } from "@/services/profileService";
import React, { useState,useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import UserContext from "@/context/userContext";
// console.log("Create page on client");
export const Create = () => {
  const userContext = useContext(UserContext);
  const initialPresData = {
    presName: "",
    dosage: "",
    frequency: "",
    timing: "",
    date: "",
    userId: "",
  };
  const [presData, setPresData] = useState(initialPresData);

  useEffect(() => {
    setPresData({...presData, userId:userContext.currentUser?._id})
    
  }, [userContext.currentUser?._id]);

  const handleCreate = async (event) => {
    // prevent form from submitting
    event.preventDefault();
    try {
      const result = createService(presData);
      console.log(result);
      setPresData(initialPresData);
      toast.success("Prescription added successfully!",{position:"top-right"});
    } catch (err) {
      console.log(err);
      toast.error("Prescription not added!",{position:"top-right"});
    }
  };
  return (
    <div className="flex items-center justify-center p-10">
      <div className="mx-auto w-full max-w-[550px]">
        <div className="mx-auto mb-8 text-2xl tracking-tight font-medium text-[#07074D] text-center">
          <h1>Create Prescription</h1>
        </div>
        <form action="#!" onSubmit={handleCreate} method="POST">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 ">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Medication Name
                </label>
                <input
                  type="text"
                  name="presName"
                  id="presName"
                  onChange={(event) => {
                    setPresData({ ...presData, presName: event.target.value });
                  }}
                  value={presData.presName}
                  placeholder="Medication Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Dosage
            </label>
            <input
              type="number"
              name="dosage"
              id="dosage"
              onChange={(event) => {
                setPresData({ ...presData, dosage: event.target.value });
              }}
              value={presData.dosage}
              placeholder="2"
              min="1"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(event) => {
                    setPresData({ ...presData, date: event.target.value });
                  }}
                  value={presData.date}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Dosage Timing
                </label>
                <input
                  type="time"
                  name="timing"
                  id="timing"
                  onChange={(event) => {
                    setPresData({ ...presData, timing: event.target.value });
                  }}
                  value={presData.timing}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Frequency
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency1"
                  className="h-5 w-5"
                  onChange={(event) => {
                    setPresData({ ...presData, frequency: "Daily" });
                  }}
                  checked={presData.frequency === "Daily"}
                />
                <label
                  htmlFor="radioButton1"
                  className="pl-3 text-base font-medium text-[#07074D]"
                >
                  Daily
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency2"
                  className="h-5 w-5"
                  onChange={(event) => {
                    setPresData({ ...presData, frequency: "Weekly" });
                  }}
                  checked={presData.frequency === "Weekly"}
                />
                <label
                  htmlFor="radioButton2"
                  className="pl-3 text-base font-medium text-[#07074D]"
                >
                  Weekly
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency3"
                  className="h-5 w-5"
                  onChange={(event) => {
                    setPresData({ ...presData, frequency: "Monthly" });
                  }}
                  checked={presData.frequency === "Monthly"}
                />
                <label
                  htmlFor="radioButton2"
                  className="pl-3 text-base font-medium text-[#07074D]"
                >
                  Monthly
                </label>
              </div>
            </div>
          </div>
          {/* {JSON.stringify(presData)} */}
          <div className="w-full text-right">
            <button
              type="submit"
              className="hover:bg-blue-700 active:bg-blue-800 rounded-md bg-blue-600 py-3.5 px-12 text-center text-base font-semibold text-white outline-none w-full my-2 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
