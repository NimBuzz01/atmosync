import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, ambiance, genrePlayed } = await request.json();
  const prisma = new PrismaClient();
  const history = await prisma.history.create({
    data: {
      userId: userId,
      ambiance: ambiance,
      genrePlayed: genrePlayed,
    },
  });
  prisma.$disconnect();
  if (!history) {
    return new NextResponse(
      JSON.stringify({ message: "No history found for this user." }),
      { status: 400 }
    );
  }

  return new NextResponse(JSON.stringify("Successfully created entry"), {
    status: 200,
  });
}
