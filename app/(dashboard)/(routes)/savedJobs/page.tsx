import { getJobs } from "@/actions/get-jobs";
import Box from "@/components/Box";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import SearchContainer from "@/components/SearchContainer";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import PageContent from "../search/_components/PageContent";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    createdAt: string;
    shiftTiming: string;
    workMode: string;
    yearsOfExperience: string;
  };
}

const SavedJobsPage = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const jobs = await getJobs({ ...searchParams, savedJobs: true });

  return (
    <div className='flex-col p-4 md:p-8  flex'>
      <Box className='mt-2 items-center justify-start gap-2 mb-4 px-2'>
        <CustomBreadCrumb breadCrumbPage='Saved Jobs' />
      </Box>

      <div className='relative w-full h-28 md:h-48 rounded-t-xl aspect-square'>
        <Image
          alt='Saved Jobs Banner'
          fill
          className='w-full h-full rounded-t-xl object-cover'
          src='/img/savedJobsBanner.png'
        />
      </div>

      <div className='pt-6 block md:mb-0'>
        <SearchContainer />
      </div>

      {/* Page Content */}
      <PageContent jobs={jobs} userId={userId} />
    </div>
  );
};

export default SavedJobsPage;
