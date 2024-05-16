'use client'
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
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-l lg:py-10 lg:px-12 flex justify-center flex-col">
        <div className="mx-auto max-w-screen-sm text-center mb-4 lg:mb-10">
          <h2 className="mb-4 text-2xl tracking-tight font-medium text-gray-900 dark:text-white">
            {/* <CloseButton /> */}
            My Prescriptions ({prescriptions?.length})
          </h2>
        </div>
        <div className="flex gap-8 mb-6 lg:mb-16 flex-col w-6/12 mx-auto">
          {
            prescriptions.map((each,index)=>{

            
return ( 
            <div className="items-center bg-white rounded-lg grid grid-flow-col shadow-lg sm:flex p-4 grid-cols-3 relative" key={index}>
              <div className="p-1 mr-5">
                <Image
                  width="66"
                  height="66"
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={medicine}
                  alt="Bonnie Avatar"
                />
              </div>
              <div className="p-5">
                <div className="w-max grid grid-cols-2 mb-7">
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                    <a href="#">{each.name} </a>
                  </h3>
                </div>
                <div className=" mt-auto">
                  <h3 className="text-gray-800 dark:text-gray-400 ">
                    Dosage: {each.dosage}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-400">
                    Frequency:  {each.frequency}
                  </p>
                </div>
              </div>
              <div className="p-5 text-right mt-auto ml-auto">
                <h1 className="mb-5"></h1>
                <h3 className="text-gray-800 dark:text-gray-400">
                  Start Date:  {formatDate(each.date)}
                </h3>
                <p className="  text-gray-800 dark:text-gray-400">
                  Dosage Timing: { each.timing}
                </p>
              </div>
            </div> )
          })
          }
          
        </div>
      </div>
    </section>
  );
};
