"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ListItemProps {
  category: any;
  onSelect: (category: any) => void;
  isChecked: boolean;
}

export const ListItem = ({ category, onSelect, isChecked }: ListItemProps) => {
  return (
    <div
      className='flex items-center px-2 py-1 cursor-pointer hover:bg-gray-500/5'
      onClick={() => onSelect(category)}
    >
        <Check className={cn("ml-auto h-4 w-4", isChecked ? "opacity-100" : "opacity-0")} />
        <p className="w-full truncate text-sm whitespace-nowrap">
            {category.label}
        </p>
    </div>
  );
};
