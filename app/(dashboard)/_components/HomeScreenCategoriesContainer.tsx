"use client";

import Box from "@/components/Box";
import { Card } from "@/components/ui/card";
import { IconName, iconMapping } from "@/lib/utils";
import { Category } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";

interface HomeScreenCategoriesContainerProps {
  categories: Category[];
}

export const Icon = ({ name }: { name: IconName }) => {
  const IconComponent = iconMapping[name];

  return IconComponent ? <IconComponent className='md:w-5 md:h-5 w-3 h-3 text-[#0AAB7C]' /> : null;
};

export const CategoryListItemCard = ({ data }: { data: Category }) => {
  const router = useRouter();
    const handleClick = (categoryId: string) => {
      const href = qs.stringifyUrl({
        url: "/search",
        query: {
          categoryId: categoryId || undefined,
        },
      });
  
      router.push(href);
    }
  return (
    <Card className='flex items-center gap-2 p-2 text-muted-foreground hover:text-[#0AAB7C] hover:border-[#0AAB7C] hover:shadow-md cursor-pointer md:text-sm text-xs' onClick={()=>handleClick(data.id)}>
      <Icon name={data.name as IconName} />
      <span className="md:w-28 w-12 truncate whitespace-nowrap">{data.name}</span>
      <ChevronRight className='md:w-4 w-2 md:h-4 h-2' />
    </Card>
  );
};

const HomeScreenCategoriesContainer = ({
  categories,
}: HomeScreenCategoriesContainerProps) => {
  return (
    <Box className='flex flex-wrap gap-2 mt-12 w-full justify-center items-center'>
      {categories.map((item) => (
        <CategoryListItemCard key={item.id} data={item} />
      ))}
    </Box>
  );
};

export default HomeScreenCategoriesContainer;
