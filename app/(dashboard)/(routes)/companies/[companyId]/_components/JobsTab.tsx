"use client";

import { Job } from "@prisma/client";
import PageContent from "../../../search/_components/PageContent";


interface JobsTabProps {
    jobs: Job[];
    userId: string | null;
}

const JobsTab = ({jobs, userId}:JobsTabProps) => {
  return (
   <PageContent jobs={jobs} userId={userId} />
  )
}

export default JobsTab
