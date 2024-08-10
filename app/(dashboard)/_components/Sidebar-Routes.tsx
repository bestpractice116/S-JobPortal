"use client";

import { BookMarked, Compass, History, Home, List, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SidebarRouteItem from "./Sidebar-Route-Item";
import Box from "@/components/Box";
import { Separator } from "@/components/ui/separator";
import DateFilter from "./DateFilter";
import CheckBoxContainer from "./CheckBoxContainer";

import qs from "query-string";

const adminRoutes = [
  {
    icon: List,
    label: "Jobs",
    href: "/admin/jobs",
  },
  {
    icon: List,
    label: "Companies",
    href: "/admin/companies",
  },
  {
    icon: Compass,
    label: "Analytics",
    href: "/admin/analytics",
  },
];

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
  {
    icon: User,
    label: "Profile",
    href: "/user",
  },
  {
    icon: History,
    label: "History",
    href: "/history",
  },
  {
    icon: BookMarked,
    label: "Saved Jobs",
    href: "/savedJobs",
  },
];

const shiftTimingData = [
  {
    value: "full-time",
    label: "Full Time",
  },
  {
    value: "part-time",
    label: "Part Time",
  },
  {
    value: "internship",
    label: "Internship",
  },
  {
    value: "contract",
    label: "Contract",
  },
  {
    value: "freelance",
    label: "Freelance",
  },
];

const workingModesData = [
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
  {
    value: "onsite",
    label: "Onsite",
  },
];

const experienceData = [
  {
    value: "0",
    label: "Fresher",
  },
  {
    value: "1",
    label: "0-2 years",
  },
  {
    value: "2",
    label: "2-5 years",
  },
  {
    value: "3",
    label: "5-10 years",
  },
  {
    value: "4",
    label: "10+ years",
  },
];

const SidebarRoutes = () => {
  const pathName = usePathname();
  const router = useRouter();

  const isAdminPage = pathName?.startsWith("/admin");
  const isSearchPage = pathName?.startsWith("/search");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  const handleShiftTiming = (shiftTimings: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
      ...currentQueryParams,
      shiftTiming: shiftTimings,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: updatedQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: "comma",
      }
    );

    router.push(url);
  };

  const handleWorkingModes = (workingModes: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
      ...currentQueryParams,
      workMode: workingModes,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: updatedQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: "comma",
      }
    );

    router.push(url);
  };

  const handleExperience = (experience: any[]) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
      ...currentQueryParams,
      yearsOfExperience: experience,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: updatedQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: "comma",
      }
    );

    router.push(url);
  };
  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarRouteItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

      {isSearchPage && (
        <Box className='px-4 py-4 items-start justify-start space-y-4 flex-col'>
          <Separator />
          <h2 className='text-lg text-muted-foreground tracking-wider'>
            Filters
          </h2>

          {/* Filter the Data by createdAt */}
          <DateFilter />

          <Separator />

          {/* Filter the Data by Shift Timing */}
          <h2 className='text-lg text-muted-foreground tracking-wider'>
            Working Schedule
          </h2>
          <CheckBoxContainer
            data={shiftTimingData}
            onChange={handleShiftTiming}
          />

          <Separator />

          {/* Filter the Data by Working Modes */}
          <h2 className='text-lg text-muted-foreground tracking-wider'>
            Working Mode
          </h2>
          <CheckBoxContainer
            data={workingModesData}
            onChange={handleWorkingModes}
          />

          <Separator />
          {/* Filter the Data by Experience Level */}
          <h2 className='text-lg text-muted-foreground tracking-wider'>
            Experience Level
          </h2>
          <CheckBoxContainer
            data={experienceData}
            onChange={handleExperience}
          />
        </Box>
      )}
    </div>
  );
};

export default SidebarRoutes;
