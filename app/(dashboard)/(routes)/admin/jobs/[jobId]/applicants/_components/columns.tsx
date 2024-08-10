"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, File, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import CellActions from "./CellActions";
import { title } from "process";

export type ApplicantsColumns = {
  id: string;
  fullName: string;
  email: string;
  title: string;
  contact: string;
  appliedAt: string;
  resume: string;
  resumeName: string;
};

export const columns: ColumnDef<ApplicantsColumns>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const { resume, resumeName } = row.original;
      return (
        <Link href={resume} target="_blank" className="flex items-center text-[#0AAB7C]">
          <File className="h-4 w-4 mr-2" />
          <p className="w-44 truncate">{resumeName}</p>
        </Link>
      )
    }
  },
  {
    accessorKey: "appliedAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, fullName, email, title } = row.original;
      return (
        <CellActions id={id} fullName={fullName} email={email}  title={title}/>
      );
    },
  },
];
