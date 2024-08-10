"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Company, Job } from "@prisma/client";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CompanyFollowButtonPageProps {
  userId: string | null;
  company: Company;
  jobs: Job[];
}

const CompanyFollowButtonPage = ({
  userId,
  company,
  jobs,
}: CompanyFollowButtonPageProps) => {
  const isFollower = userId && company?.followers?.includes(userId);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onCickAddRemoveFollowers = async () => {
    try {
      setIsLoading(true);
      if (isFollower) {
        await axios.patch(`/api/companies/${company?.id}/removeFollowers`);
        toast.success(`You have unfollowed ${company?.name}`);
        router.refresh();
      } else {
        await axios.patch(`/api/companies/${company?.id}/addFollowers`);
        toast.success(`You have followed ${company?.name}`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='flex md:ml-10 ml-6'>
        <Button
          onClick={onCickAddRemoveFollowers}
          variant={isFollower ? "outline" : "myPrimary"}
          className={cn(
            "hover:text-white hover:shadow-sm hover:bg-[#0AAB7C]/80 text-[#0AAB7C] border-[#0AAB7C]",
            !isFollower && "bg-[#0AAB7C]/80 hover:bg-[#0AAB7C] text-white"
          )}
        >
          {isLoading ? (
            <Loader2 className='w-3 h-3 animate-spin' />
          ) : isFollower ? (
            "Unfollow"
          ) : (
            <React.Fragment>
              <Plus className='w-4 h-4 mr-2' />
              Follow
            </React.Fragment>
          )}
        </Button>
      </div>
    </>
  );
};

export default CompanyFollowButtonPage;
