import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getJobs } from "@/actions/get-jobs";
import Box from "@/components/Box";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import CompanyFollowButtonPage from "./_components/CompanyDetailContentPage";
import TabContentSection from "./_components/TabContentSection";

const CompanyDetailsPage = async ({
  params,
}: {
  params: { companyId: string };
}) => {
  const { userId } = auth();

  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
    },
  });

  if (!company || !userId) {
    redirect("/");
  }

  const jobs = await db.job.findMany({
    where: {
      companyId: params.companyId,
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='flex-col p-4 md:p-8'>
      <Box className='mt-4'>
        <CustomBreadCrumb
          breadCrumbItem={[{ label: "Search", link: "/search" }]}
          breadCrumbPage={company?.name !== undefined ? company.name : ""}
        />
      </Box>

      {/* Company Cover Image */}
      <Box className='mt-4 relative'>
        <div className='w-full flex items-center md:h-72 h-40 relative rounded-lg'>
          {company?.coverImage ? (
            <Image
              alt={company.name}
              src={company.coverImage}
              fill
              className='object-fit w-full h-full rounded-lg'
            />
          ) : (
            <div className='w-full h-full relative bg-emerald-100 flex items-center justify-center'>
              <h2 className='text-3xl font-semibold tracking-wider text-[#0AAB7C]'>
                {company.name}
              </h2>
            </div>
          )}
          {/* User Image */}
          {company?.logo && company.logo && (
            <Link href={`/companies/${company.id}`}>
              <div className='aspect-square md:w-24 md:h-24 w-16 h-16 rounded-lg shadow-md absolute md:-bottom-10 md:left-10 -bottom-8 left-5 bg-white border-2'>
                <Image
                  alt={company.name}
                  fill
                  className='w-full h-full object-contain'
                  src={company.logo}
                />
              </div>
            </Link>
          )}
        </div>
      </Box>

      {/* Title and Action Buttons */}
      <div className='md:w-[78vw] w-[85vw] mt-14'>
        <div className='w-full flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start gap-5'>
          <div className='flex flex-col md:ml-10 ml-6'>
            <div className='flex items-center'>
              <h1 className='md:text-2xl text-md font-semibold'>
                {company.name}
              </h1>
            </div>
            <div className='text-sm font-medium text-neutral-500 flex flex-wrap truncate'>
              <h2 className='truncate'>
                {company?.industry ? company.industry : "Industry Not Added"}
              </h2>
              <Dot className='md:text-sm text-xs -mt-0.5' />
              {/* Inset how many followers for this company */}
              <h2 className='truncate text-[#0AAB7C]'>
                {company?.followers?.length}{" "}
                {company?.followers?.length > 1 ? "Followers" : "Follower"}
              </h2>
            </div>
          </div>

          {/* Follow Button */}
          <CompanyFollowButtonPage
            jobs={jobs}
            company={company}
            userId={userId}
          />

          {/* Tab Content */}
        </div>

        <TabContentSection userId={userId} company={company} jobs={jobs} />
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
