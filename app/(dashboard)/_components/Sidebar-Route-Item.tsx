"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarRouteItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarRouteItem = ({
  icon: Icon,
  label,
  href,
}: SidebarRouteItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName.startsWith(`${href}/`);

  const onclick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onclick}
      className={cn(
        "flex items-center gap-x-2 text-neutral-500 text-sm font-[500] pl-6 transition-all hover:text-neutral-600 hover:bg-neutral-300/20",
        isActive &&
          "text-[#0AAB7C] font-semibold bg-[#28b78c]/20 hover:bg-[#0AAB7C]/20 hover:text-[#0AAB7C]"
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          className={cn("text-neutral-500", isActive && "text-[#0AAB7C]")}
          size={22}
        />
        {label}
      </div>

      {/* Highlighter */}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-[#0AAB7C] h-full transition-all", isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default SidebarRouteItem;
