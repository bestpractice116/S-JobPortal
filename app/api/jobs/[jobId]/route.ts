import { storage } from "@/config/firebase.config";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Attachments } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    const updatedValues = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID is missing!", { status: 401 });
    }

    const job = await db.job.update({
      where: {
        id: jobId,
        userId,
      },
      data: {
        ...updatedValues,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(`[JOB_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Delete the Job Id
export const DELETE = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID is missing!", { status: 401 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!job) {
      return new NextResponse("Job Not Found!", { status: 404 });
    }

    // Delete the Images from the firebase sotrage
    if (job.imageUrl) {
      const storageRef = ref(storage, job.imageUrl);
      await deleteObject(storageRef);
    }

    // Delete the attachments
    if (Array.isArray(job.attachments) && job.attachments.length > 0) {
      await Promise.all(
        job.attachments.map(async (attachment: Attachments) => {
          const attachmentStorageRef = ref(storage, attachment.url);
          await deleteObject(attachmentStorageRef);
        })
      );
    }

    await db.attachments.deleteMany({
      where: {
        jobId,
      },
    });

    const deletedJob = await db.job.delete({
      where: {
        id: jobId,
        userId,
      },
    });

    return NextResponse.json(deletedJob);
  } catch (error) {
    console.log(`[JOB_DELETE]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
