import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { UserProvider } from './../context/userProvider';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "medimate : Keep track of Your Medication easily",
};


export default  function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className } style={{backgroundColor:"rgb(251,251,251"}}>
        <UserProvider>
        <Navbar />
        <ToastContainer />
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
