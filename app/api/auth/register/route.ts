import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { hash } from "bcryptjs";

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashed_password = await hash(data.password, 12);
    data.password = hashed_password;
    const user = await prisma.user.create({ data });
    const json_response = {
      status: "success",
      data: {
        user,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("Create Error", error)
    const error_response = { error: error.toString() }
    return new NextResponse(JSON.stringify(error_response), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}