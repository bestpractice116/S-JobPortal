import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { experienceId : string } }
) => {
  try {
    const { userId } = auth();
    const {experienceId} = params;
        
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const experience = await db.jobExperience.findUnique({
        where: {
            id: experienceId
        }
    })

    if (!experience || experience.id !== experienceId) {
        return new NextResponse("Experience not found!", { status: 404 });
    }

   
    await db.jobExperience.delete({
        where: {
            id: experienceId
        }
    });

    return NextResponse.json({message: "Experience deleted successfully"});

  } catch (error) {
    console.log(`[EXPERIENCE_DELETED]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
