"use client";
import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "@/firebaseConfig";
import { TbLoader3 } from "react-icons/tb";
import { GrLogin } from "react-icons/gr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface User {
  uid: string;
  email: string | null;
  username?: string;
}

const Navbar = () => {
  const [status, setStatus] = useState("loading");
const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User authenticated:", currentUser);
  
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
  
          if (userDoc.exists()) {
            console.log("Fetched user data:", userDoc.data());  
  
            const userData = userDoc.data();
            setUser({ 
              uid: currentUser.uid, 
              email: currentUser.email, 
              username: userData.username || currentUser.email 
            });
          } else {
            console.warn("User document not found in Firestore.");
            setUser({ uid: currentUser.uid, email: currentUser.email });
          }
  
          setStatus("authenticated");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No authenticated user found.");
        setUser(null);
        setStatus("unauthenticated");
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
      setUser(null);
      setStatus("unauthenticated");
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <motion.main initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="flex justify-end gap-28 items-center bg-gray-200 ">
        
        {/* <Link href="/" className="flex items-center">
          
          <h1 className="font-bold text-2xl ml-20 max-md:hidden text-black">Biz-Metrics</h1>
        </Link> */}

      
        <div className="flex gap-6 font-semibold text-black items-center" style={{ margin:10}}>
          {status === "loading" ? (
            <FiLoader className="animate-spin text-3xl text-red-600" />
          ) : status === "unauthenticated" ? (
            <>
              <Link href="/login" className="  px-4 py-2 flex items-center gap-2 text-black  transition-all hover:text-orange-500 text-xl underline-offset-2 ">
                Login <GrLogin className="ml-2" />
              </Link>

              <Link href="/signup" className=" px-4 py-2  text-black transition-all text-xl hover:text-orange-500  underline-offset-2">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <span className="hidden sm:block">Welcome, {user.username || "User"}!</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2">
                  <DropdownMenuLabel className="text-lg font-bold text-black">{user.username || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-red-600 hover:text-white">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-red-600 hover:text-white">
                    <Link href="/contact">Contact Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-red-600 hover:text-white">
                    <Link href="/about">About Us</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-orange-500 px-4 py-6 rounded-md  font-bold hover:text-black transition-all flex items-center gap-2 mr-6"
              >
                Sign Out
                {signingOut && <TbLoader3 className="animate-spin text-xl" />}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Navbar;
