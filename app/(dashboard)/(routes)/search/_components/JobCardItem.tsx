"use client";

import { Company, Job } from "@prisma/client";
import { Card, CardDescription } from "@/components/ui/card";

import { motion } from "framer-motion";
import Box from "@/components/Box";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Currency,
  Layers,
  Loader2,
  Network,
} from "lucide-react";
import { cn, formatedString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "lodash";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface JobCardItemProps {
  job: Job;
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

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
  const typeJob = job as Job & {
    company: Company | null;
  };

  const company = typeJob.company;

  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const isSavedByUser = userId && job.savedUsers?.includes(userId);
  const SavedUserIcon = isSavedByUser ? BookmarkCheck : Bookmark;
  const router = useRouter();

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

  const getExperienceLabel = (years: string) => {
    const experience = experienceData.find((exp) => exp.value === years);
    return experience ? experience.label : "NA";
  };

  return (
    <motion.div layout>
      <Card>
        <div className='w-full h-full p-4 flex flex-col items-start justify-start gap-y-4'>
          {/* Saved Job By User */}
          <Box>
            <p className='text-sm text-muted-foreground'>
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </p>

            <Button variant={"ghost"} size={"icon"}>
              {isBookmarkLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <div onClick={saveJob}>
                  <SavedUserIcon
                    className={cn(
                      "w-4 h-4",
                      isSavedByUser
                        ? "text-emerald-500"
                        : " text-muted-foreground"
                    )}
                  />
                </div>
              )}
            </Button>
          </Box>

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
                {truncate(job?.title, {
                  length: 25,
                  omission: "...",
                })}
              </p>
              <Link
                href={`/companies/${company?.id}`}
                className='text-xs text-[#0AAB7C] w-full truncate'
              >
                {company?.name}
              </Link>
            </div>
          </Box>

          {/* Job Details */}
          <Box>
            {job.shiftTiming && (
              <div className='text-xs text-muted-foreground flex items-center'>
                <BriefcaseBusiness className='w-3 h-3 mr-1' />
                {formatedString(job.shiftTiming)}
              </div>
            )}
            {job.workMode && (
              <div className='text-xs text-muted-foreground flex items-center'>
                <Layers className='w-3 h-3 mr-1' />
                {formatedString(job.workMode)}
              </div>
            )}
            {job.hourlyRate && (
              <div className='text-xs text-muted-foreground flex items-center'>
                <Currency className='w-3 h-3 mr-1' />
                {`${formatedString(job.hourlyRate)}$/hr`}
              </div>
            )}
            {job.yearsOfExperience && (
              <div className='text-xs text-muted-foreground flex items-center'>
                <Network className='w-3 h-3 mr-1' />
                {getExperienceLabel(job.yearsOfExperience)}
              </div>
            )}
          </Box>

          {/* Job Short Description */}
          {job.short_description && (
            <CardDescription className='text-xs'>
              {truncate(job.short_description, {
                length: 180,
                omission: "...",
              })}
            </CardDescription>
          )}

          {/* Jobs Tags */}
          {job.tags.length > 0 && (
            <Box className='flex-wrap justify-start gap-1'>
              {job.tags.slice(0, 6).map((tag, i) => (
                <p
                  key={i}
                  className='bg-gray-100 text-xs rounded-md px-2 py-[2px] font-semibold text-neutral-500'
                >
                  {truncate(tag, {
                    length: 12,
                    omission: "...",
                  })}
                </p>
              ))}
            </Box>
          )}

          {/* Action Buttons */}
          <Box className='gap-2 mt-auto'>
            <Link href={`/search/${job.id}`} className='w-full'>
              <Button
                className='w-full border-[#0AAB7C] text-[#0AAB7C]/65 hover:bg-[#0AAB7C]/80 hover:border-none hover:text-white'
                variant={"outline"}
              >
                Details
              </Button>
            </Link>
            <Button
              className='w-full text-white hover:text-[#0AAB7C]/65 hover:bg-transparent hover:border-[#0AAB7C] bg-[#0AAB7C]/80'
              variant={"outline"}
              onClick={saveJob}
            >
              {isSavedByUser ? "Saved" : "Save for Later"}
            </Button>
          </Box>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCardItem;
