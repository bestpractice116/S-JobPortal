import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    const { userId } = auth();
    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Company ID is missing!", { status: 401 });
    }

    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found!", { status: 404 });
    }

    // remove userId from the followers
    const userIndex = company?.followers.indexOf(userId);

    let updatedCompany;

    if (userIndex !== -1) {
      const updatedCompany = await db.company.update({
        where: {
          id: companyId,
        },
        data: {
          followers: {
            set: company?.followers.filter((f) => f !== userId),
          },
        },
      });
      return new NextResponse(JSON.stringify(updatedCompany), { status: 200 });
    } else {
      return new NextResponse("User not found in followers!", { status: 404 });
    }
  } catch (error) {
    console.log(`[COMPANY_PATCH]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
