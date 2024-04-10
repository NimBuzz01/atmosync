"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/preloader";
import LoginForm from "@/components/login-form";
import { useEffect } from "react";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Preloader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <LoginForm />;
  }

  // You can return null or some placeholder here
  return null;
};

export default Login;
