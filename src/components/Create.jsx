"use client";
import { createService } from "@/services/createService";
import { profileService } from "@/services/profileService";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import UserContext from "@/context/userContext";

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
    setPresData({ ...presData, userId: userContext.currentUser?._id });
  }, [userContext.currentUser?._id]);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const result = await createService(presData);
      console.log(result);
      setPresData(initialPresData);
      toast.success("Prescription added successfully!", { position: "top-right" });
    } catch (err) {
      console.log(err);
      toast.error("Prescription not added!", { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-8 text-2xl font-medium text-[#07074D] text-center">
          <h1>Create Prescription</h1>
        </div>
        <form action="#!" onSubmit={handleCreate} method="POST">
          <div className="mb-5">
            <label
              htmlFor="presName"
              className="block text-base font-medium text-[#07074D]"
            >
              Medication Name
            </label>
            <input
              type="text"
              name="presName"
              id="presName"
              onChange={(event) => setPresData({ ...presData, presName: event.target.value })}
              value={presData.presName}
              placeholder="Medication Name"
              className="mt-1 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:ring-1 focus:ring-[#6A64F1]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="dosage"
              className="block text-base font-medium text-[#07074D]"
            >
              Dosage
            </label>
            <input
              type="number"
              name="dosage"
              id="dosage"
              onChange={(event) => setPresData({ ...presData, dosage: event.target.value })}
              value={presData.dosage}
              placeholder="2"
              min="1"
              className="mt-1 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:ring-1 focus:ring-[#6A64F1]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-5">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label
                htmlFor="date"
                className="block text-base font-medium text-[#07074D]"
              >
                Start Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={(event) => setPresData({ ...presData, date: event.target.value })}
                value={presData.date}
                className="mt-1 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:ring-1 focus:ring-[#6A64F1]"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label
                htmlFor="timing"
                className="block text-base font-medium text-[#07074D]"
              >
                Dosage Timing
              </label>
              <input
                type="time"
                name="timing"
                id="timing"
                onChange={(event) => setPresData({ ...presData, timing: event.target.value })}
                value={presData.timing}
                className="mt-1 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:ring-1 focus:ring-[#6A64F1]"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-[#07074D]">
              Frequency
            </label>
            <div className="flex flex-wrap items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency1"
                  className="h-5 w-5"
                  onChange={() => setPresData({ ...presData, frequency: "Daily" })}
                  checked={presData.frequency === "Daily"}
                />
                <label
                  htmlFor="frequency1"
                  className="ml-3 text-base font-medium text-[#07074D]"
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
                  onChange={() => setPresData({ ...presData, frequency: "Weekly" })}
                  checked={presData.frequency === "Weekly"}
                />
                <label
                  htmlFor="frequency2"
                  className="ml-3 text-base font-medium text-[#07074D]"
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
                  onChange={() => setPresData({ ...presData, frequency: "Monthly" })}
                  checked={presData.frequency === "Monthly"}
                />
                <label
                  htmlFor="frequency3"
                  className="ml-3 text-base font-medium text-[#07074D]"
                >
                  Monthly
                </label>
              </div>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
