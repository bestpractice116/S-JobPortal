"use client";

import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Company } from "@prisma/client";
import { truncate } from "lodash";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HomeCompaniesContainerProps {
  companies: Company[];
}

export const CompanyListItemCard = ({ data }: { data: Company }) => {
  const router = useRouter();
  return (
    <div className='mt-6 w-full flex md:flex-row flex-col gap-5'>
      {/* <Card
        className='flex items-center gap-2 p-2 text-muted-foreground hover:text-[#0AAB7C] hover:border-[#0AAB7C] hover:shadow-md cursor-pointer md:text-sm text-xs'
        onClick={() => router.push(`/companies/${data.id}`)}
      >
        <span className='md:w-28 w-16 truncate whitespace-nowrap'>
          {data.name}
        </span>
        <ChevronRight className='md:w-4 w-2 md:h-4 h-2' />
      </Card> */}
      <Card className='p-3 space-y-2 relative' key={data.id}>
        {/* Company Details */}
        <Box className='items-center justify-start gap-x-4'>
          <div className='w-12 h-12 min-w-12 min-h-12 border rounded-md p-2 relative flex items-center justify-center overflow-hidden'>
            {data?.logo && (
              <Image
                src={data?.logo}
                alt={data?.name}
                width={40}
                height={40}
                className='object-contain'
              />
            )}
          </div>

          <div className='w-full'>
            <p className='text-stone-700 font-semibold text-base w-full truncate'>
              {data.name}
            </p>
            <p className='text-xs text-[#0AAB7C] w-full truncate'>
              {data?.industry}
            </p>
          </div>
        </Box>

        {/* Company Short Description */}
        {data.description && (
          <CardDescription className='text-xs'>
            {truncate(data.description, {
              length: 180,
              omission: "...",
            })}
          </CardDescription>
        )}

        {/* Action Buttons */}
        <Box className='gap-2'>
          <Link href={`/companies/${data.id}`} className='w-full'>
            <Button
              className='w-full border-[#0AAB7C] text-[#0AAB7C]/65 hover:bg-[#0AAB7C]/80 hover:border-none hover:text-white'
              variant={"outline"}
            >
              Visit Company
            </Button>
          </Link>
        </Box>
      </Card>
    </div>
  );
};

const HomeCompaniesContainer = ({ companies }: HomeCompaniesContainerProps) => {
  return (
    <Box className='flex flex-wrap mt-5 w-full justify-center items-center px-5'>
      <div className='w-full flex md:flex-row flex-col md:gap-2'>
        {companies.map((item) => (
          <CompanyListItemCard key={item.id} data={item} />
        ))}
      </div>
    </Box>
  );
};

export default HomeCompaniesContainer;
