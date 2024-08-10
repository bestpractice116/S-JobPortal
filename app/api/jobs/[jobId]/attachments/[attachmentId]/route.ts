import { storage } from "@/config/firebase.config";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { jobId: string, attachmentId : string } }
) => {
  try {
    const { userId } = auth();
    const {jobId, attachmentId} = params;
        
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID is missing!", { status: 401 });
    }

    const attachment = await db.attachments.findUnique({
        where: {
            id: attachmentId
        }
    })

    if (!attachment || attachment.jobId !== params.jobId) {
        return new NextResponse("Attachment not found!", { status: 404 });
    }

    // Delete the attachment from the firebase sotrage

    const storageRef =ref(storage, attachment.url);
    await deleteObject(storageRef);

    await db.attachments.delete({
        where: {
            id: attachmentId
        }
    });

    return NextResponse.json({message: "Attachment deleted successfully"});

  } catch (error) {
    console.log(`[JOB_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
