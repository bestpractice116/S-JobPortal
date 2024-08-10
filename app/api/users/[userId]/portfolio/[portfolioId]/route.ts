import { storage } from "@/config/firebase.config";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { portfolioId : string } }
) => {
  try {
    const { userId } = auth();
    const {portfolioId} = params;
        
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const portfolio = await db.portfolio.findUnique({
        where: {
            id: portfolioId
        }
    })

    if (!portfolio || portfolio.id !== portfolioId) {
        return new NextResponse("portfolio not found!", { status: 404 });
    }

    // Delete the portfolio from the firebase sotrage

    const storageRef =ref(storage, portfolio.url);
    await deleteObject(storageRef);

    await db.portfolio.delete({
        where: {
            id: portfolioId
        }
    });

    return NextResponse.json({message: "Portfolio deleted successfully"});

  } catch (error) {
    console.log(`[PORTFOLIO_DELETED]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
