import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userId: string = await request.json();
  const prisma = new PrismaClient();
  // const history = await prisma.history.findMany({
  //   where: {
  //     userId: userId,
  //   },
  // });
  const history = await prisma.history.findMany();
  console.log(history);
  prisma.$disconnect();

  if (!history) {
    return new NextResponse(
      JSON.stringify({ message: "No history found for this user." }),
      { status: 400 }
    );
  }

  return new NextResponse(JSON.stringify(history), {
    status: 200,
  });
}
