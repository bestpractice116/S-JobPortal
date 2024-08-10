import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { userId } = auth();

    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });

    let userProfile;

    if (profile) {
      userProfile = await db.userProfile.update({
        where: {
          userId,
        },
        data: {
          ...values,
        },
      });
    } else {
      userProfile = await db.userProfile.create({
        data: {
          userId,
          ...values,
        },
      });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.log(`[JOB_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    const { userId: authUserId } = auth();

    if (!authUserId || authUserId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await db.userProfile.findUnique({
      where: { userId },
      include: { education: true }, // Include education records
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error(`[USER_GET]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
