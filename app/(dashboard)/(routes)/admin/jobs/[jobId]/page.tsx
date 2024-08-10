import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowLeft,
  Building2,
  File,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobPublishActions from "./_components/JobPublish-Actions";
import Banner from "@/components/Banner";
import IconBadge from "@/components/IconBadge";
import TitleForm from "./_components/TitleForm";
import CategoryForm from "./_components/CategoryForm";
import ImageForm from "./_components/ImageForm";
import ShortDescription from "./_components/ShortDescription";
import ShiftTimingMode from "./_components/ShiftTiming-Mode";
import JobHourlyRateForm from "./_components/JobHourly-Rate";
import JobMode from "./_components/JobMode";
import WorkExperienceForm from "./_components/WorkExperience-Form";
import JobDescription from "./_components/JobDescription";
import TagForm from "./_components/TagForm";
import CompanyForm from "./_components/CompanyForm";
import AttachmentsForm from "./_components/AttachmentsForm";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  // Verify the MongoDB ID
  const validObjectIdRegix = /^[0-9a-fA-F]{24}$/;
  if (!validObjectIdRegix.test(params.jobId)) {
    return redirect("/admin/jobs");
  }

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  //   Fetch the job details from the database
  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: { name: "asc" },
  });

  if (!job) {
    return redirect("/admin/jobs");
  }

  const requiredFields = [
    job.title,
    job.description,
    job.imageUrl,
    job.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className='p-6'>
      <Link href={"/admin/jobs"}>
        <div className='flex items-center gap-2 text-sm text-neutral-500'>
          <ArrowLeft className='w-4 h-4' />
          Back
        </div>
      </Link>

      {/* Title */}
      <div className='flex items-center justify-between my-4'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-bold'>Job Setup</h1>
          <span className='text-sm text-neutral-500'>
            Complete All Fields {completionText}
          </span>
        </div>

        {/* Action Button */}
        <JobPublishActions
          jobId={params.jobId}
          isPublished={job.isPublished}
          disabled={!isComplete}
        />
      </div>

      {/* Warning before Publishing the Job */}
      {!job.isPublished && (
        <Banner
          variant={"warning"}
          label='This Job is upublished. It will not be visible in the jobs list'
        />
      )}

      {/* Container Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        {/* Left Container */}
        <div>
          {/* Title */}
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl text-neutral-700 font-semibold'>
              Customize your Job Details
            </h2>
          </div>

          {/* Title Form */}
          <TitleForm initialData={job} jobId={job.id} />

          {/* Cover Image */}
          <ImageForm initialData={job} jobId={job.id} />

          {/* Category Form */}
          <CategoryForm
            initialData={job}
            jobId={job.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          {/* Short Description */}
          <ShortDescription initialData={job} jobId={job.id} />

          {/* Shift Timing Form */}
          <ShiftTimingMode initialData={job} jobId={job.id} />

          {/* Job Hourly Rate Form */}
          <JobHourlyRateForm initialData={job} jobId={job.id} />

          {/* Job Work Mode Form */}
          <JobMode initialData={job} jobId={job.id} />

          {/* Job Work Experience Form */}
          <WorkExperienceForm initialData={job} jobId={job.id} />
        </div>

        {/* Right Container */}
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListCheck} />
              <h2 className='text-xl text-neutral-700 font-semibold'>
                Job Requirements
              </h2>
            </div>

            {/* Tag Form */}
            <TagForm initialData={job} jobId={job.id} />
          </div>

          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Building2} />
              <h2 className='text-xl text-neutral-700 font-semibold'>
                Company Details
              </h2>
            </div>

            {/* Category Form */}
            <CompanyForm
              initialData={job}
              jobId={job.id}
              options={companies.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
            />
          </div>

          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={File} />
              <h2 className='text-xl text-neutral-700 font-semibold'>
                Job Attachments
              </h2>
            </div>

            {/* Job Attachments Form */}
            <AttachmentsForm initialData={job} jobId={job.id} />
          </div>
        </div>

        {/* Description Container */}
        <div className='col-span-2'>
          {/* Job Description */}
          <JobDescription initialData={job} jobId={job.id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
