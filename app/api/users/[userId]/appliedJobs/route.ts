import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { userId } = auth();

    const jobId = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("Job Id is required!", { status: 400 });
    }

    const profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return new NextResponse("User Profile not found!", { status: 404 });
    }

    const updateProfile = await db.userProfile.update({
        where:{
            userId
        },
        data: {
            appliedJobs:{
                push: jobId
            }
        }
    })

    

    return NextResponse.json(updateProfile);
  } catch (error) {
    console.log(`[JOB_APPLY_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
