import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Portfolio } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
) => {
  try {
    const { userId } = auth();

    const { portfolio } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (
      !portfolio ||
      !Array.isArray(portfolio) ||
      portfolio.length === 0
    ) {
      return new NextResponse("Invalid Portfolio Format", { status: 400 });
    }

    const createdPortfolio: Portfolio[] = [];

    for (const portfolios of portfolio) {
      const { url, name } = portfolios;

      const existingPortfolio = await db.portfolio.findFirst({
        where: {
          userProfileId: userId,
          url
        },
      });

      if (existingPortfolio) {
        continue;
      }

      const portfolioCreated = await db.portfolio.create({
        data: {
          url,
          name,
          userProfileId: userId,
        },
      });

      createdPortfolio.push(portfolioCreated);
    }

    return NextResponse.json(createdPortfolio);
  } catch (error) {
    console.log(`[USER_RESUME_POST]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
