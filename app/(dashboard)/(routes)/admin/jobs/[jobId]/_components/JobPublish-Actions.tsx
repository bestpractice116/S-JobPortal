"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface JobPublishActionsProps {
  disabled: boolean;
  jobId: string;
  isPublished: boolean;
}

const JobPublishActions = ({
  disabled,
  jobId,
  isPublished,
}: JobPublishActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/jobs/${jobId}/unpublish`);
        toast.success(`Job Un-Published Successfully!`);
      } else {
        await axios.patch(`/api/jobs/${jobId}/publish`);
        toast.success(`Job Published Successfully!`);
      }

      router.refresh();
    } catch (error) {
      toast.error(`Something Went Wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async() => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/jobs/${jobId}`);

      router.refresh();
      return router.push("/admin/jobs");
    } catch (error) {
      toast.error(`Something Went Wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-x-3'>
      <Button
        variant={"myPrimary"}
        // className="border-[#0AAB7C] text-[#0AAB7C]"
        size={"sm"}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button
        variant={"destructive"}
        size={"icon"}
        disabled={isLoading}
        onClick={onDelete}
      >
        <Trash className='w-4 h-4' />
      </Button>
    </div>
  );
};
export default JobPublishActions;
