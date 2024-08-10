"use client";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BadgeCent,
  BadgeCheck,
  BadgeX,
  Eye,
  Loader,
  Loader2,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { title } from "process";

interface CellActionsProps {
  id: string;
  fullName: string;
  email: string;
  title: string;
}

const CellActions = ({ id, fullName, email, title }: CellActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRejection, setIsRejection] = useState(false);

  const sendSelected = async () => {
    setIsLoading(true);
    try {
        await axios.post("/api/sendSelected", {email, fullName, title})
        toast.success("Email sent successfully");
        setIsLoading(false);
    } catch (error) {
        toast.error("Failed to send email");
    }
  };

  const Rejected = async () => {
    setIsRejection(true);
    try {
        await axios.post("/api/sendRejected", {email, fullName})
        toast.success("Email sent successfully");
        setIsLoading(false);
    } catch (error) {
        toast.error("Failed to send email");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading ? (
          <DropdownMenuItem>
            <Loader className='w-4 h-4 animate-spin text-[#0AAB7C]' />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={sendSelected}>
            <BadgeCheck className='w-4 h-4 mr-2 text-[#0AAB7C]' />
            Selected
          </DropdownMenuItem>
        )}

        {isRejection ? (
          <DropdownMenuItem>
            <Loader className='w-4 h-4 animate-spin text-[#0AAB7C]' />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={Rejected}>
            <BadgeX className='w-4 h-4 mr-2 text-[#0AAB7C]' />
            Rejected
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
