// imports
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
  // pages: {
  //   signIn: "/login",
  // },
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "jsmith@example.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       return null;
    //     }

    //     const existingUser = await prisma.user.findFirst({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });

    //     if (!existingUser) {
    //       return null;
    //     }

    //     const passwordValid = await compare(
    //       credentials?.password,
    //       existingUser.password
    //     );

    //     if (!passwordValid) {
    //       return null;
    //     }

    //     return {
    //       id: `${existingUser.id}`,
    //       username: existingUser.username,
    //       email: existingUser.email,
    //     };
    //   },
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
