"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/preloader";
import MainContainer from "@/components/dashboard/main-container";

const Dashboard = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Preloader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated") {
    return <MainContainer />;
  }
};

export default Dashboard;
