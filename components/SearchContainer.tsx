"use client";

import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import qs from "query-string";

const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const createdAtFilter = searchParams.get("createdAt");
  const currentShiftTiming = searchParams.get("shiftTiming");
  const currentWorkMode = searchParams.get("workMode");

  const [value, setValue] = useState(currentTitle || "");

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
          createdAt: createdAtFilter,
          shiftTiming: currentShiftTiming,
          workMode: currentWorkMode,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  },[
    debouncedValue,
    currentCategoryId,
    router,
    pathName,
    createdAtFilter,
    currentShiftTiming,
    currentWorkMode,
  ]);

  return (
    <>
      <div className='flex items-center gap-x-2 relative flex-1'>
        <SearchIcon className='w-4 h-4 text-[#0AAB7C] absolute left-3' />

        <Input
          placeholder='Search for a Job using title'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full pl-9 rounded-lg focus-visible:ring-[#0AAB7C]/20 text-sm'
        />
        {value && (
          <Button
            variant={"ghost"}
            size={"icon"}
            type='button'
            onClick={() => setValue("")}
            className='cursor-pointer absolute right-3 hover:scale-125 hover:bg-transparent'
          >
            <X className='w-4 h-4 text-[#0AAB7C]' />
          </Button>
        )}
      </div>
    </>
  );
};

export default SearchContainer;
