import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Resumes } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
) => {
  try {
    const { userId } = auth();

    const { resumes } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (
      !resumes ||
      !Array.isArray(resumes) ||
      resumes.length === 0
    ) {
      return new NextResponse("Invalid Resume Format", { status: 400 });
    }

    const createdResumes: Resumes[] = [];

    for (const resume of resumes) {
      const { url, name } = resume;

      const existingResume = await db.resumes.findFirst({
        where: {
          userProfileId: userId,
          url
        },
      });

      if (existingResume) {
        continue;
      }

      const createdResume = await db.resumes.create({
        data: {
          url,
          name,
          userProfileId: userId,
        },
      });

      createdResumes.push(createdResume);
    }

    return NextResponse.json(createdResumes);
  } catch (error) {
    console.log(`[USER_RESUME_POST]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
