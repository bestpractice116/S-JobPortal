"use client";

import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

const HomeSearchContainer = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleClick = () => {
    const href = qs.stringifyUrl({
      url: "/search",
      query: {
        title: title || undefined,
      },
    });

    router.push(href);
  };
  return (
    <div className='w-full items-center justify-center hidden md:flex mt-8 px-4'>
      <Box className='w-3/4 p-4'>
        <div className='flex items-center gap-x-2 relative flex-1'>
          <Button
            variant={"ghost"}
            size={"icon"}
            className='left-2 absolute'
            onClick={handleClick}
          >
            <SearchIcon className='w-4 h-4 text-[#0AAB7C]' />
          </Button>
          <Input
            placeholder='Search for a Job using title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='ml-2 w-full pl-9 rounded-lg focus-visible:ring-[#0AAB7C]/20 text-sm'
          />
          {title && (
            <Button
              variant={"ghost"}
              size={"icon"}
              type='button'
              onClick={() => setTitle("")}
              className='cursor-pointer absolute right-3 hover:scale-125 hover:bg-transparent'
            >
              <X className='w-4 h-4 text-[#0AAB7C]' />
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default HomeSearchContainer;
