import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import JobDetailsPageComponent from "./_components/JobDetailsPageComponent";
import { getJobs } from "@/actions/get-jobs";
import PageContent from "../_components/PageContent";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const { userId } = auth();

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      company: true,
      attachments: true,
    },
  });

  if (!job) {
    redirect("/search");
  }

  const profile = await db.userProfile.findUnique({
    where: {
      userId: userId as string,
    },
    include: {
      resumes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const jobs = await getJobs({});

  const filteredJobs = jobs.filter((j) => j.id !== job.id && j.categoryId === job.categoryId);

  return (
    <div className='flex-col p-4 md:p-8'>
      <JobDetailsPageComponent
        userId={userId}
        job={job}
        jobId={job.id}
        userProfile={profile}
      />

      {filteredJobs.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold'>Related Jobs</h2>
          <div className='flex flex-col gap-4 mt-4'>
            <PageContent jobs={filteredJobs} userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
