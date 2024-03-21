"use client";
import Preloader from "@/components/preloader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Preloader />
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }
}
