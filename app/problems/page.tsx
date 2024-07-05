"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/crud";
import { useRouter } from "next/navigation";
import LCForm from "@/components/custom/lc-form"

const ProblemsPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState<string | null>(null);

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    setUserSession(session);

    if (!user && !session) {
      router.push("/sign-in");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user && userSession === null) {
      router.push("/sign-in");
    }
  }, [user, userSession, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 rounded-lg shadow-xl w-300">
        <h1 className="text-center text-3xl mb-5 font-bold">Enter Problem ID</h1>
        <div className="border p-5 mb-96 rounded-lg">
          <LCForm />
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage
