import { getJobs } from "@/actions/get-jobs";
import Box from "@/components/Box";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomeSearchContainer from "../_components/HomeSearchContainer";
import HomeScreenCategoriesContainer from "../_components/HomeScreenCategoriesContainer";
import HomeCompaniesContainer from "../_components/HomeCompaniesContainer";
import RecomendedJobsList from "../_components/RecomendedJobsList";
import { Footer } from "../_components/Footer";
import { File } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DashboardHomePage = async () => {
  const { userId } = auth();
  const user = await currentUser();

  const currentHour = new Date().getHours();
  const now = new Date();
  const getday = now.toLocaleDateString("en-US", { weekday: "long" });
  const day = now.getDate();
  const getMonth = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  const formatedDate = `${getday}, ${day} ${getMonth}, ${year}`;

  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 17) {
    // Adjusted to end of afternoon at 5 PM
    greeting = "Good Afternoon";
  } else if (currentHour < 21) {
    // Adjusted to end of evening at 9 PM
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  if (!userId) {
    redirect("/sign-in");
  }

  let profile = await db.userProfile.findUnique({
    where: {
      userId,
    },
    include: {
      resumes: {
        orderBy: {
          createdAt: "desc",
        },
      },
      education: {
        orderBy: {
          createdAt: "desc",
        },
      },
      jobExperience: {
        orderBy: {
          createdAt: "desc",
        },
      },
      portfolio: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const jobs = getJobs({});

  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const companies = await db.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='overflow-hidden w-full'>
      {/* Greeting user like Good Morning, Evening, Night */}
      <Box className='mt-10 md:ml-10 ml-3 flex-col items-start'>
        <h1 className='md:text-xl text-sm flex flex-wrap font-medium text-gray-800 tracking-wide'>
          Welcome{" "}
          <span className='text-[#0AAB7C] font-semibold'>
            {profile?.fullName ? ", " + profile.fullName : user?.fullName}
          </span>
        </h1>
        <p>
          <span className='text-xs text-gray-400'>{formatedDate}</span>
        </p>
      </Box>

      <Box className='flex-col justify-center w-full space-y-2 mt-12'>
        <h2 className='md:text-2xl text-xl font-bold tracking-wider'>
          Find your dream job now
        </h2>

        <p className='md:text-base text-sm text-gray-400'>
          <span className='text-[#0AAB7C]'>{(await jobs).length}+</span> jobs
          for you to Explore
        </p>
      </Box>

      <HomeSearchContainer />

      <Box className='flex-col items-center justify-center w-full'>
        <HomeScreenCategoriesContainer categories={categories} />
      </Box>

      <Box className='flex-col justify-center items-center w-full space-y-2 mt-12'>
        <div className='flex w-full items-center justify-center'>
          <h2 className='md:text-2xl text-center text-xl font-bold tracking-wider'>
            Featured Companies
          </h2>
        </div>

        <div className='mt-12'>
          <HomeCompaniesContainer companies={companies} />
        </div>
      </Box>

      <Box className='flex-col justify-center w-full mt-12'>
        <h2 className='md:text-2xl text-xl font-bold tracking-wider'>
          Recomended Jobs
        </h2>

        <RecomendedJobsList jobs={(await jobs).splice(0, 6)} userId={userId} />
      </Box>

      <Footer />
    </div>
  );
};

export default DashboardHomePage;
