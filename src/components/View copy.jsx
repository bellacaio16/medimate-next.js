'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import medicine from "../app/assets/medicine.png";
import { viewService } from "@/services/viewService";

export const View = () => {
  const userId = "65fdd30329619fbde2900ecc";
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    try {
      const response = await viewService(userId);
      setPrescriptions(response.result);
      console.log(response.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Function to format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract and return date portion
  };

  return (
    <section className="py-8 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
      <div className="text-center mb-4 lg:mb-10">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
          My Prescriptions ({prescriptions?.length})
        </h2>
      </div>
      <div className="flex flex-col gap-8 lg:gap-12">
        {
          prescriptions.map((each, index) => (
            <div
              className="bg-white rounded-lg shadow-lg flex flex-col sm:flex-row p-4"
              key={index}
            >
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <Image
                  width="66"
                  height="66"
                  className="w-16 h-16 rounded-lg"
                  src={medicine}
                  alt="Medicine"
                />
              </div>
              <div className="flex-1 mb-4 sm:mb-0">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {each.name}
                </h3>
                <p className="text-gray-800 dark:text-gray-400 mb-1">
                  Dosage: {each.dosage}
                </p>
                <p className="text-gray-800 dark:text-gray-400">
                  Frequency: {each.frequency}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 dark:text-gray-400 mb-1">
                  Start Date: {formatDate(each.date)}
                </p>
                <p className="text-gray-800 dark:text-gray-400">
                  Dosage Timing: {each.timing}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};
