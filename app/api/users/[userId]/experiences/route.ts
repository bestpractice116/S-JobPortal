import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Education, JobExperience } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    const { jobExperience } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const createdExperiences: JobExperience[] = [];

    for (const experience of jobExperience) {
      const {
        jobTitle,
        employmentType,
        companyName,
        location,
        startDate,
        currentlyWorking,
        endDate,
        description,
      } = experience;

      const existingExperience = await db.jobExperience.findFirst({
        where: {
          userProfileId: userId,
          jobTitle,
          employmentType,
          companyName,
          location,
        },
      });

      if (existingExperience) {
        continue;
      }

      const createdExperience = await db.jobExperience.create({
        data: {
          jobTitle,
          employmentType,
          companyName,
          location,
          startDate,
          currentlyWorking,
          endDate,
          description,
          userProfileId: userId,
        },
      });

      createdExperiences.push(createdExperience);
    }

    return NextResponse.json(createdExperiences);
  } catch (error) {
    console.log(`[USER_EXPERIENCE_POST]: ${error}`);
    return new NextResponse("Internal Server Error" + error, { status: 500 });
  }
};
