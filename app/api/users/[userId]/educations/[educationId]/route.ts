import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { educationId : string } }
) => {
  try {
    const { userId } = auth();
    const {educationId} = params;
        
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const education = await db.education.findUnique({
        where: {
            id: educationId
        }
    })

    if (!education || education.id !== educationId) {
        return new NextResponse("education not found!", { status: 404 });
    }

   
    await db.education.delete({
        where: {
            id: educationId
        }
    });

    return NextResponse.json({message: "Education deleted successfully"});

  } catch (error) {
    console.log(`[EDUCATION_DELETED]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
