import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Attachments } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    const { attachments } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID is missing!", { status: 401 });
    }

    if (
      !attachments ||
      !Array.isArray(attachments) ||
      attachments.length === 0
    ) {
      return new NextResponse("Invalid Attachment Format", { status: 400 });
    }

    const createdAttachments: Attachments[] = [];

    for (const attachment of attachments) {
      const { url, name } = attachment;

      const existingAttachment = await db.attachments.findFirst({
        where: {
          jobId,
          url,
        },
      });

      if (existingAttachment) {
        continue;
      }

      const createdAttachment = await db.attachments.create({
        data: {
          url,
          name,
          jobId,
        },
      });

      createdAttachments.push(createdAttachment);
    }

    return NextResponse.json(createdAttachments);
  } catch (error) {
    console.log(`[JOB_ATTACHMENT_POST]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
