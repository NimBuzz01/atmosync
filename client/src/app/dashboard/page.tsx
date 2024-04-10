"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/preloader";
import MainContainer from "@/components/dashboard/main-container";

const Dashboard = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Preloader />
      </div>
    );
  }

  if (status === "authenticated") {
    return <MainContainer />;
  }

  // You can return null or some placeholder here
  return null;
};

export default Dashboard;
