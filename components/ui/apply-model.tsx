"use client";

import { Resumes, UserProfile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Model } from "./model";
import Box from "../Box";
import Link from "next/link";
import { Button } from "./button";

interface ApplyModelComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  userProfile: (UserProfile & { resumes: Resumes[] }) | null;
}

export const ApplyModel = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  userProfile,
}: ApplyModelComponentProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // Actove Resume Fetch
  const activeResume = userProfile?.resumes.find(
    (resume) => resume.id === userProfile?.activeResumeId
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Model
      title='Are you sure?'
      description='This action cannot be undone'
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* User Basic Details */}
      <Box>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-2 w-full'>
          <label className='md:text-md text-sm p-3 w-full truncate border rounded-md'>
            {userProfile?.fullName}
          </label>
          <label className='md:text-md text-sm p-3 w-full truncate border rounded-md'>
            {userProfile?.contact}
          </label>
          <label className='md:text-md text-sm p-3 md:col-span-2 w-full truncate border rounded-md'>
            {userProfile?.email}
          </label>
          <label className='p-3 w-full md:col-span-2 flex md:flex-row flex-col md:items-center gap-2 whitespace-nowrap truncate border rounded-md'>
            <span className='md:text-md text-sm text-neutral-400 font-medium'>
              Your Active Resume
            </span>
            <span className='md:text-md text-sm text-[#0AAB7C]'>
              <Link
                href={
                  userProfile?.resumes.find(
                    (resume) => resume.id === userProfile?.activeResumeId
                  )?.url || "#"
                }
                target='_blank'
                download
              >
                {
                  userProfile?.resumes.find(
                    (resume) => resume.id === userProfile?.activeResumeId
                  )?.name
                }
              </Link>
            </span>
          </label>

          <div className='md:col-span-2 col-span-1 flex items-center justify-end text-sm text-muted-foreground'>
            Change your Details
            <Link href={"/user"} className='text-[#0AAB7C] ml-2'>
              Over Here
            </Link>
          </div>
        </div>
      </Box>

      <div className='pt-2 space-x-2 flex items-center justify-end w-full'>
        <Button
          variant={"outline"}
          className='hover:text-white hover:shadow-sm hover:bg-[#0AAB7C]/80 text-[#0AAB7C] border-[#0AAB7C]'
          type='button'
        >
          Cancel
        </Button>
        {/* disables if there is no Active Resume */}
        <Button
          variant={"myPrimary"}
          disabled={loading || !activeResume || !userProfile?.fullName || !userProfile.contact || !userProfile.email}
          onClick={onConfirm}
          type='submit'
        >
          Continue
        </Button>
      </div>
      {!activeResume && (
        <div className='mt-2 text-end text-xs text-muted-foreground'>
          You don&apos;t have any Active Resume. You can&apos;t apply without a resume.
        </div>
      )}

      {!userProfile?.fullName && (
        <div className='mt-2 text-end text-xs text-muted-foreground'>
          Your Full Name is missing. Please update your profile to continue.
        </div>
      )}

      {!userProfile?.contact && (
        <div className='mt-2 text-end text-xs text-muted-foreground'>
          Your Contact is missing. Please update your profile to continue.
        </div>
      )}
      
      {!userProfile?.email && (
        <div className='mt-2 text-end text-xs text-muted-foreground'>
          Your Email is missing. Please update your profile to continue.
        </div>
      )}
    </Model>
  );
};
