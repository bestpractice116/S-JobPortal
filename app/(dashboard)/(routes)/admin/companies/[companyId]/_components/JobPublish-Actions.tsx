"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

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

  const onClick = () => {};

  const onDelete = () => {};

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

      <Button variant={"destructive"} size={"icon"} disabled={isLoading} onClick={onDelete}>
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default JobPublishActions;
