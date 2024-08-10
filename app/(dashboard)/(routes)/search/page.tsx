import { getJobs } from "@/actions/get-jobs";
import SearchContainer from "@/components/SearchContainer";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CategoriesList from "./_components/CategoriesList";
import PageContent from "./_components/PageContent";
import AppliedFilters from "./_components/AppliedFilters";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    createdAt: string;
    shiftTiming: string;
    workMode: string;
    yearsOfExperience: string;
  };
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const { userId } = auth();

  const jobs = await getJobs({ ...searchParams });
  return (
    <div className="">
      <div className='px-6 pt-6 block md:hidden md:mb-0'>
        <SearchContainer />
      </div>

      <div className="p-6">
        {/* Categories */}
        <CategoriesList categories={categories} />

        {/* Applied Filters */}
        <AppliedFilters categories={categories} />

        {/* Page Content */}
        <PageContent jobs={jobs} userId={userId} />
      </div>
    </div>
  );
};

export default SearchPage;
