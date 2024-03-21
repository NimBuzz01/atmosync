"use client";
import Preloader from "@/components/preloader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
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
