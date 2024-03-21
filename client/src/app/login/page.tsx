"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Preloader from "@/components/preloader";
import WelcomeTitle from "@/components/welcome-title";

export default function Login() {
  // extracting data from usesession as session
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Preloader />
      </div>
    );
  }

  // checking if sessions exists
  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-10">
        <WelcomeTitle />
        <Card className="max-w-sm mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" />
              </div>
              <Button
                className="w-full"
                type="submit"
                onClick={(e) => {
                  signIn("credentials");
                }}
              >
                Login
              </Button>
              <div className="flex items-center justify-center w-full space-x-2">
                <Separator className="w-2/5" />
                <Label className="text-xs text-gray-400">OR</Label>
                <Separator className="w-2/5" />
              </div>
              <Button
                className="flex items-center w-full gap-2"
                variant="outline"
                onClick={() => signIn("github")}
              >
                <FaGithub className="text-lg text-gray-600" />
                Sign in with Github
              </Button>
              <Label className="text-xs text-gray-400">New to Atmosync?</Label>
              <Button
                variant="link"
                className="h-auto p-0 ml-1 text-xs text-blue-500 "
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
