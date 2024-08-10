"use client";

import SearchContainer from "@/components/SearchContainer";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarRoutes = () => {
  const pathName = usePathname();
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-9 h-9", // Custom width and height
    },
  };

  const isAdminPage = pathName?.startsWith("/admin");
  const isPlayerPage = pathName?.startsWith("/jobs");
  const isSearchPage = pathName?.startsWith("/search");
  return (
    <>
      {isSearchPage && (
        <div className='hidden md:flex w-full px-2 pr-8 items-center gap-x-6'>
          <SearchContainer />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto items-center'>

        {isAdminPage || isPlayerPage ? (
          <Link href={"/"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className='border-[#0AAB7C] text-[#0AAB7C] hover:text-white hover:font-semibold hover:bg-[#0AAB7C]'
            >
              <LogOut className='pr-1' />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/admin/jobs"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className='border-[#0AAB7C] text-[#0AAB7C] hover:text-white hover:font-semibold hover:bg-[#0AAB7C]'
            >
              <UserRoundPen className='pr-1' />
              Admin Mode
            </Button>
          </Link>
        )}

        <UserButton appearance={userButtonAppearance} afterSignOutUrl='/' />
      </div>
    </>
  );
};

export default NavbarRoutes;
