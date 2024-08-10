import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Education } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    const { education } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const createdEducations: Education[] = [];

    for (const resume of education) {
      const {
        university,
        degree,
        fieldOfStudy,
        grade,
        startDate,
        currentlyStudying,
        endDate,
        description,
      } = resume;

      const existingEducation = await db.education.findFirst({
        where: {
          userProfileId: userId,
          university,
          degree,
          fieldOfStudy,
        },
      });

      if (existingEducation) {
        continue;
      }

      const createdEducation = await db.education.create({
        data: {
          university,
          degree,
          fieldOfStudy,
          grade,
          startDate,
          currentlyStudying,
          endDate,
          description,
          userProfileId: userId,
        },
      });

      createdEducations.push(createdEducation);
    }

    return NextResponse.json(createdEducations);
  } catch (error) {
    console.log(`[USER_EDUCATION_POST]: ${error}`);
    return new NextResponse("Internal Server Error" + error, { status: 500 });
  }
};
