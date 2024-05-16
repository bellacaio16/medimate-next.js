// import Image from "next/image";
// 'use client'
import { HeroSection } from "@/components/Homepage/HeroSection";
import { Benefits } from "@/components/Homepage/Benefits";
import { Footer } from "../components/Footer";

async function timetake(){
  await new Promise((resolve)=>{
    setTimeout(resolve, 500);
  });
}
export default async function Home() {
  await timetake();
  return (
    <main>
      <HeroSection />
      <Benefits />
      <Footer />
    </main>
  );
}
