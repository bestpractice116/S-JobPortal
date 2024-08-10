"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";

const DateFilter = () => {
  const Data = [
    {
      value: "today",
      label: "Today",
    },
    {
      value: "yesterday",
      label: "Yesterday",
    },
    {
      value: "this-week",
      label: "This Week",
    },
    {
      value: "last-week",
      label: "Last Week",
    },
    {
      value: "this-month",
      label: "This Month",
    },
  ];

  const router = useRouter();
  const pathName = usePathname();


  const onChange = (value:string) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
        ...currentQueryParams,
        createdAt: value,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: updatedQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }

  return (
    <Select onValueChange={(selected)=> onChange(selected)}>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Filter By Date' />
      </SelectTrigger>
      <SelectContent>
        {Data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
                {item.label}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateFilter;
