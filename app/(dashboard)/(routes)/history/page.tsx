import Box from "@/components/Box";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Image from "next/image";
import { UserProfile } from "@clerk/nextjs";
import { DataTable } from "@/components/ui/data-table";
import { AppliedJobsColumn, columns } from "./_components/column";
import { format } from "date-fns";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { truncate } from "lodash";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CompanyFollowButtonPage from "./_components/CompanyFollowPage";

const ProfilePage = async () => {
  const { userId } = auth();
  const user = await currentUser();

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

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    include: {
      company: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const filteredJobs =
    profile && profile?.appliedJobs.length > 0
      ? jobs
          .filter((job) =>
            profile.appliedJobs.some(
              (appliedJob) => appliedJob.jobId === job.id
            )
          )
          .map((job) => ({
            ...job,
            appliedAt: profile.appliedJobs.find(
              (appliedJob) => appliedJob.jobId == job.id
            )?.appliedAt,
          }))
      : [];

  const formatedJobs: AppliedJobsColumn[] = filteredJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company ? job.company.name : "",
    category: job.category ? job.category.name : "",
    appliedAt: job.appliedAt
      ? format(new Date(job.appliedAt), "MMMM do, yyyy")
      : "",
  }));

  const followedCompanies = await db.company.findMany({
    where: {
      followers: {
        has: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='flex-col p-4 md:p-8 items-center justify-center flex'>
      <Box>
        <CustomBreadCrumb breadCrumbPage='History' />
      </Box>

      {/* Applied Jobs */}
      <Box className='flex-col items-start justify-start mt-12'>
        <h1 className='font-medium text-xl'>Applied Jobs</h1>
        <div className='w-full'>
          <DataTable
            columns={columns}
            searchKey='company'
            data={formatedJobs}
          />
        </div>
      </Box>

      {/* Followed Companies */}
      <Box className='flex-col items-start justify-start mt-12'>
        <h1 className='font-medium text-xl'>Followed Companies</h1>

        <div className='mt-6 w-full flex md:flex-row flex-col gap-5'>
          {followedCompanies.length === 0 ? (
            <p>You are not following any companies.</p>
          ) : (
            followedCompanies.map((company) => (
              <Card className='p-3 space-y-2 relative' key={company.id}>
                {/* Company Details */}
                <Box className='items-center justify-start gap-x-4'>
                  <div className='w-12 h-12 min-w-12 min-h-12 border rounded-md p-2 relative flex items-center justify-center overflow-hidden'>
                    {company?.logo && (
                      <Image
                        src={company?.logo}
                        alt={company?.name}
                        width={40}
                        height={40}
                        className='object-contain'
                      />
                    )}
                  </div>

                  <div className='w-full'>
                    <p className='text-stone-700 font-semibold text-base w-full truncate'>
                      {company.name}
                    </p>
                    <p className='text-xs text-[#0AAB7C] w-full truncate'>
                      {company?.industry}
                    </p>
                  </div>
                </Box>

                {/* Company Short Description */}
                {company.description && (
                  <CardDescription className='text-xs'>
                    {truncate(company.description, {
                      length: 180,
                      omission: "...",
                    })}
                  </CardDescription>
                )}

                {/* Action Buttons */}
                <Box className='gap-2'>
                  <Link href={`/companies/${company.id}`} className='w-full'>
                    <Button
                      className='w-full border-[#0AAB7C] text-[#0AAB7C]/65 hover:bg-[#0AAB7C]/80 hover:border-none hover:text-white'
                      variant={"outline"}
                    >
                      Visit Company
                    </Button>
                  </Link>
                  <CompanyFollowButtonPage
                    jobs={jobs}
                    company={company}
                    userId={userId}
                  />
                </Box>
              </Card>
            ))
          )}
        </div>
      </Box>
    </div>
  );
};

export default ProfilePage;
