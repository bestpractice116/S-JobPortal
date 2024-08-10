"use client";

import Banner from "@/components/Banner";
import Box from "@/components/Box";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import Preview from "@/components/PreviewEditorText";
import { ApplyModel } from "@/components/ui/apply-model";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import {
  Attachments,
  Company,
  Job,
  Resumes,
  UserProfile,
} from "@prisma/client";
import axios from "axios";
import { Bookmark, BookmarkCheck, Dot, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface JobDetailsPageComponentProps {
  job: Job & { company: Company | null; attachments: Attachments[] };
  jobId: string;
  userProfile: (UserProfile & { resumes: Resumes[] }) | null;
  userId: string | null;
}

const experienceData = [
  {
    value: "0",
    label: "Fresher",
  },
  {
    value: "1",
    label: "0-2 years",
  },
  {
    value: "2",
    label: "2-5 years",
  },
  {
    value: "3",
    label: "5-10 years",
  },
  {
    value: "4",
    label: "10+ years",
  },
];

const JobDetailsPageComponent = ({
  job,
  jobId,
  userProfile,
  userId,
}: JobDetailsPageComponentProps) => {
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const isSavedByUser = userId && job.savedUsers?.includes(userId);
  const SavedUserIcon = isSavedByUser ? BookmarkCheck : Bookmark;

  const saveJob = async () => {
    try {
      setIsBookmarkLoading(true);

      if (isSavedByUser) {
        await axios.patch(`/api/jobs/${job.id}/removeJobToCollection`);
        toast.success("Job removed from collection");
      } else {
        await axios.patch(`/api/jobs/${job.id}/saveJobToCollection`);
        toast.success("Job saved to collection");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Please try again later");
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const getExperienceLabel = (years: string | null) => {
    const experience = experienceData.find((exp) => exp.value === years);
    return experience ? experience.label : "NA";
  };

  const onApplied = async () => {
    setisLoading(true);
    try {
      await axios.patch(`/api/users/${userProfile?.userId}/appliedJobs`, {
        jobId,
      });

      // Send Emai to User
      await axios.post("/api/thankyou", {
        fullName: userProfile?.fullName,
        email: userProfile?.email,
        title: job?.title,
        name: job?.company?.name,
      });

      toast.success("Job Appied! We're reviewing it carefuly.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Please try again later");
    } finally {
      setOpen(false);
      setisLoading(false);
      router.refresh();
    }
  };
  return (
    <>
      <ApplyModel
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onApplied}
        loading={isLoading}
        userProfile={userProfile}
      />

      {userProfile &&
        userProfile?.appliedJobs?.some(
          (appliedJob) => appliedJob.jobId === jobId
        ) && <Banner variant={"success"} label="Thank you for applying! We're reviewing it carefuly. We'll be in touch soon if your application matches our needs." />}

      <Box className='mt-4'>
        <CustomBreadCrumb
          breadCrumbItem={[{ label: "Search", link: "/search" }]}
          breadCrumbPage={job?.title !== undefined ? job.title : ""}
        />
      </Box>

      {/* Job Cover Image */}
      <Box className='mt-4 relative'>
        <div className='w-full flex items-center md:h-72 h-40 relative rounded-lg'>
          {job?.imageUrl ? (
            <Image
              alt={job.title}
              src={job.imageUrl}
              fill
              className='object-fit w-full h-full rounded-lg'
            />
          ) : (
            <div className='w-full h-full relative bg-emerald-100 flex items-center justify-center'>
              <h2 className='text-3xl font-semibold tracking-wider text-emerald-500'>
                {job.title}
              </h2>
            </div>
          )}
          {/* User Image */}
          {job.company?.logo && job.company.logo && (
            <Link href={`/companies/${job.companyId}`}>
              <div className='aspect-square md:w-24 md:h-24 w-16 h-16 rounded-lg shadow-md absolute md:-bottom-10 md:left-10 -bottom-8 left-5 bg-white border-2'>
                <Image
                  alt={job.company.name}
                  fill
                  className='w-full h-full object-contain'
                  src={job.company.logo}
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
              <h1 className='md:text-2xl text-md font-semibold'>{job.title}</h1>
              <Button variant={"ghost"} size={"icon"}>
                {isBookmarkLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <div onClick={saveJob}>
                    <SavedUserIcon
                      className={cn(
                        "w-5 h-5",
                        isSavedByUser
                          ? "text-emerald-500"
                          : " text-muted-foreground"
                      )}
                    />
                  </div>
                )}
              </Button>
            </div>
            <div className='text-sm font-medium text-neutral-500 flex flex-wrap truncate'>
              <Link href={`/companies/${job.companyId}`}>
                <h2 className='truncate text-[#0AAB7C]'>{job.company?.name}</h2>
              </Link>
              <Dot className='md:text-sm text-xs -mt-0.5' />
              {/* Inset how many days before this job */}
              <h2 className='truncate'>{job.createdAt.getDay()} days ago</h2>
            </div>
          </div>

          <div className='flex md:ml-10 ml-6'>
            {userProfile ? (
              <>
                {!userProfile.appliedJobs.some(
                  (appliedJob) => appliedJob.jobId === jobId
                ) ? (
                  <Button
                    variant={"myPrimary"}
                    type='submit'
                    onClick={() => setOpen(true)}
                  >
                    Apply Now
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    className='hover:text-white hover:shadow-sm hover:bg-[#0AAB7C]/80 text-[#0AAB7C] border-[#0AAB7C]'
                    type='button'
                    disabled
                  >
                    Already Applied
                  </Button>
                )}
              </>
            ) : (
              <Link href={"/user"}>
                <Button variant={"myPrimary"} type='submit'>
                  Update Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Experience, Work Mode, Employee Type, Offer Salary */}
      <div className='md:w-[78vw] w-[85vw] mt-10 md:ml-10'>
        <div className='md:ml-10 ml-6 flex flex-col md:flex-row md:justify-between items-start md:gap-10 gap-5'>
          <div className='flex md:flex-col w-full md:justify-start justify-between flex-row items-center md:items-start gap-3'>
            <h2 className='text-md font-medium text-neutral-400'>Experience</h2>
            <h3 className='text-sm font-medium'>
              {getExperienceLabel(job.yearsOfExperience)}
            </h3>
          </div>
          <div className='flex md:flex-col w-full md:justify-start justify-between flex-row items-center md:items-start gap-3'>
            <h2 className='text-md font-medium text-neutral-400'>Work Mode</h2>
            <h3 className='text-sm font-medium'>{job.workMode}</h3>
          </div>
          <div className='flex md:flex-col w-full md:justify-start justify-between flex-row items-center md:items-start gap-3'>
            <h2 className='text-md font-medium text-neutral-400'>
              Employee Type
            </h2>
            <h3 className='text-sm font-medium'>{job.shiftTiming}</h3>
          </div>
          <div className='flex md:flex-col w-full md:justify-start justify-between flex-row items-center md:items-start gap-3'>
            <h2 className='text-md font-medium text-neutral-400'>
              Offer Salary
            </h2>
            <h3 className='text-sm font-medium'>{job.hourlyRate}</h3>
          </div>
        </div>
        <Separator className='mt-10 mb-10 md:ml-0 ml-3' />
      </div>

      {/* Job Short Description */}
      <div className='md:w-[76vw] w-[80vw] mt-10 md:ml-10 ml-6'>
        <h2 className='text-md font-semibold'>About the Job</h2>
        <p className='text-sm mt-2 text-justify'>{job.short_description}</p>
      </div>

      {/* Job Description */}
      {job?.description && (
        <div className='md:w-[76vw] w-[80vw] mt-10 md:ml-6 ml-3'>
          <Preview value={job?.description} />

          <Separator className='mt-10 mb-10 md:ml-0 ml-3' />
        </div>
      )}

      {/* Attachments */}
      <div className='md:w-[76vw] w-[80vw] mt-10 md:ml-10 ml-6'>
        <h2 className='text-md font-semibold'>Attachments</h2>
        <p className='text-neutral-300 font-medium text-sm'>
          Download the attachment(s) to get more information about the job
        </p>
        {job?.attachments &&
          job?.attachments.length > 0 &&
          job.attachments.map((attachment) => (
            <div className='mt-2' key={attachment.id}>
              <Link
                href={attachment.url}
                target='_blank'
                download
                className='text-[#0AAB7C] hover:underline'
              >
                {attachment.name}
              </Link>
            </div>
          ))}

        <Separator className='mt-10 mb-10 md:-ml-3' />
      </div>
    </>
  );
};

export default JobDetailsPageComponent;
