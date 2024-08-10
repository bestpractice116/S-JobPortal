import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Job } from "@prisma/client";

type GetJobs = {
  title?: string;
  categoryId?: string;
  createdAt?: string;
  shiftTiming?: string;
  workMode?: string;
  yearsOfExperience?: string;
  savedJobs?: boolean;
};

export const getJobs = async ({
  title,
  categoryId,
  createdAt,
  shiftTiming,
  workMode,
  yearsOfExperience,
  savedJobs,
}: GetJobs): Promise<Job[]> => {
  const { userId } = auth();

  try {
    // Initilize the query object with common options

    let query: any = {
      where: {
        isPublished: true,
      },
      include: {
        company: true,
        category: true,
        attachments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
      query.where = {
        AND: [
          typeof title !== "undefined" && {
            title: { contains: title, mode: "insensitive" },
          },
          typeof categoryId !== "undefined" && {
            categoryId: { equals: categoryId },
          },
        ].filter(Boolean),
      };
    }

    // Check weather the createdAt filter is present or not
    if (createdAt) {
      const currentDate = new Date();
      let startDate: Date;
      switch (createdAt) {
        case "today":
          startDate = new Date(currentDate);
          break;
        case "yesterday":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 1);
          break;
        case "this-week":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - currentDate.getDay());
          break;
        case "last-week":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - currentDate.getDay() - 7);
          break;
        case "this-month":
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          break;
        default:
          startDate = new Date(0);
          break;
      }

      query.where.createdAt = {
        gte: startDate,
        lte: currentDate,
      };
    }

    // Filter the jobs based on the shiftTimings also for mulitple values
    let formatedShiftTiming= shiftTiming?.split(",");

    if (formatedShiftTiming && formatedShiftTiming.length > 0) {
      query.where.shiftTiming = {
        in: formatedShiftTiming,
      };
    }

    // Filter the jobs based on the workMode also for mulitple values
    let formatedWorkMode = workMode?.split(",");
    if (formatedWorkMode && formatedWorkMode.length > 0) {
      query.where.workMode = {
        in: formatedWorkMode,
      };
    }

    // Filter the jobs based on the yearsOfExperience also for mulitple values
    let formatedYearsOfExperience = yearsOfExperience?.split(",");
    if (formatedYearsOfExperience && formatedYearsOfExperience.length > 0) {
      query.where.yearsOfExperience = {
        in: formatedYearsOfExperience,
      };
    }

    if(savedJobs){
      query.where.savedUsers = {
        has: userId,
      }
    }
    

    // Execute the Query to fetch the jobs based on the parameter
    const jobs = await db.job.findMany(query);
    return jobs;
  } catch (error) {
    console.log("[GET_JOBS]:", error);
    return [];
  }
};
