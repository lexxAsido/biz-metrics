"use client";
import React, { useEffect, useState, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";
import { GrLogin } from "react-icons/gr";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "@/firebaseConfig";
import Link from "next/link";

interface User {
  uid: string;
  email: string | null;
  username?: string;
}

const AUTO_LOGOUT_TIME = 60000; 

const Navbar = () => {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User authenticated:", currentUser);

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              username: userData.username || currentUser.email,
            });
          } else {
            setUser({ uid: currentUser.uid, email: currentUser.email });
          }

          setStatus("authenticated");

          
          const storedKeepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";
          setKeepLoggedIn(storedKeepLoggedIn);

          if (!storedKeepLoggedIn) {
            resetLogoutTimer(); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!keepLoggedIn) {
      document.addEventListener("mousemove", resetLogoutTimer);
      document.addEventListener("keypress", resetLogoutTimer);
      document.addEventListener("touchstart", resetLogoutTimer);
    }

    return () => {
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keypress", resetLogoutTimer);
      document.removeEventListener("touchstart", resetLogoutTimer);
    };
  }, [keepLoggedIn]);

  const resetLogoutTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(handleSignOut, AUTO_LOGOUT_TIME);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
      setUser(null);
      setStatus("unauthenticated");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <motion.main initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="flex justify-end gap-28 items-center bg-gray-200">
        <div className="flex gap-6 font-semibold text-black items-center" style={{ margin: 10 }}>
          {status === "loading" ? (
            <FiLoader className="animate-spin text-3xl text-red-600" />
          ) : status === "unauthenticated" ? (
            <>
              <Link href="/login" className="px-4 py-2 flex items-center gap-2 text-black transition-all hover:text-orange-500 text-xl underline-offset-2">
                Login <GrLogin className="ml-2" />
              </Link>
              <Link href="/signup" className="px-4 py-2 text-black transition-all text-xl hover:text-orange-500 underline-offset-2">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-orange-500 px-4 py-6 rounded-md font-bold hover:text-black transition-all flex items-center gap-2 mr-6"
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
