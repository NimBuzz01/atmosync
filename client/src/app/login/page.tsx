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

export default function Login() {
  // extracting data from usesession as session
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // checking if sessions exists
  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex justify-center items-center">
        <Card className="mx-auto max-w-sm">
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
              <div className="flex justify-center w-full items-center space-x-2">
                <Separator className="w-2/5" />
                <Label className="text-gray-400 text-xs">OR</Label>
                <Separator className="w-2/5" />
              </div>
              <Button
                className="w-full flex items-center gap-2"
                variant="outline"
                onClick={() => signIn("github")}
              >
                <FaGithub className="text-lg text-gray-600" />
                Sign in with Github
              </Button>
              <Label className="text-gray-400 text-xs">New to Atmosync?</Label>
              <Button
                variant="link"
                className="text-blue-500 text-xs p-0 h-auto ml-1 "
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
