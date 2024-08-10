"use client";

import { Company, Job } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Preview from "@/components/PreviewEditorText";
import JobsTab from "./JobsTab";

interface CompanyFollowButtonPageProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

const TabContentSection = ({
  userId,
  company,
  jobs,
}: CompanyFollowButtonPageProps) => {
  return (
    <div className='md:w-[78vw] w-[85vw] mt-10 md:ml-10 ml-6'>
      <Tabs defaultValue='about' className='w-full'>
        <TabsList className='bg-transparent'>
          <TabsTrigger
            value='about'
            className='data-[state=active]:border-b-2 data-[state=active]:text-[#0AAB7C] border-emerald-500 bg-transparent rounded-none text data-[state=active]:shadow-none'
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value='joinus'
            className='data-[state=active]:border-b-2 border-[#0AAB7C] bg-transparent rounded-none text data-[state=active]:shadow-none'
          >
            Why Join Us
          </TabsTrigger>
          <TabsTrigger
            value='jobs'
            className='data-[state=active]:border-b-2 border-[#0AAB7C] bg-transparent rounded-none text data-[state=active]:shadow-none'
          >
            Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value='about'>
          <div className='mt-10'>
            <h2 className='font-medium text-lg'>Overview</h2>
            <p className='mt-2 text-sm text-neutral-500'>
              {company?.description
                ? company.description
                : "No Industry available."}
            </p>

            <h2 className='font-medium text-lg mt-10'>Industry</h2>
            <p className='mt-2 text-sm text-neutral-500'>
              {company?.industry ? company.industry : "No Industry available."}
            </p>

            <h2 className='font-medium text-lg mt-10'>Website</h2>
            <Link
              href={company?.website ? company.website : ""}
              className='mt-2 text-sm text-[#0AAB7C]'
            >
              {company?.website ? company.website : "No Website available."}
            </Link>

            <h2 className='font-medium text-lg mt-10'>Location</h2>
            <p className='mt-2 text-sm text-neutral-500'>
              {company?.address_line_1 ? (
                <>
                  <span>{company?.address_line_1}</span>
                  <span>
                    {company?.address_line_2 ? (
                      <>
                        <span>, </span>
                        {company.address_line_2}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <span>
                    {company?.city ? (
                      <>
                        <span>, </span>
                        {company.city}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <span>
                    {company?.state ? (
                      <>
                        <span>, </span>
                        {company.state}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <span>
                    {company?.zipcode ? (
                      <>
                        <span>, </span>
                        {company.zipcode}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </>
              ) : (
                "No Location available."
              )}
            </p>

            <h2 className='font-medium text-lg mt-10'>What we are</h2>
            {company?.overview ? (
              <Preview value={company.overview} />
            ) : (
              "Company details not available."
            )}
          </div>
        </TabsContent>
        <TabsContent value='joinus'>
          <div className='mt-10'>
            {company?.whyJoinUs ? (
              <Preview value={company.whyJoinUs} />
            ) : (
              "Company details not available."
            )}
          </div>
        </TabsContent>
        <TabsContent value='jobs' className="-ml-6 md:-ml-10">
          <div className='mt-10'>
            <JobsTab jobs={jobs} userId={userId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabContentSection;
