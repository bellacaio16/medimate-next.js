import Image from "next/image";
import loadingSvg from "../app/assets/loading.svg";
export default function loading() {
  return (
    <div className="flex justify-center align-center h-screen">
      <Image width={60} height="60" src={loadingSvg} alt="logo" />
    </div>
  );
}
