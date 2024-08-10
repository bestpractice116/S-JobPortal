"use client";

import { Job } from "@prisma/client";
import PageContent from "../(routes)/search/_components/PageContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Box from "@/components/Box";

interface RecomendedJobsListProps {
  jobs: Job[];
  userId: string | null;
}

const RecomendedJobsList = ({ jobs, userId }: RecomendedJobsListProps) => {
  return (
    <Box className="flex flex-wrap gap-2 md:p-5 p-5 w-full justify-center items-center">
      <PageContent jobs={jobs} userId={userId} />

      <Link href='/search' className='my-8'>
        <Button
          variant={"outline"}
          className='border-[#0AAB7C] text-[#0AAB7C] hover:text-white hover:font-semibold hover:bg-[#0AAB7C]'
        >
          View All Jobs
        </Button>
      </Link>
    </Box>
  );
};

export default RecomendedJobsList;
