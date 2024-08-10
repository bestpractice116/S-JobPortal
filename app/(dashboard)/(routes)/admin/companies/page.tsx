import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns, CompanyColumns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";

const CompanyPageOverview = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedCompanies: CompanyColumns[] = companies.map((company) => ({
    id: company.id,
    name: company.name ? company.name : "N/A",
    logo: company.logo ? company.logo : "N/A",
    createdAt: company.createdAt ? format(new Date(company.createdAt), "MMMM do, yyyy") : "N/A",
  }));
  return (
    <div className='p-6'>
      <div className='flex items-end justify-end'>
        <Link href={"/admin/companies/create"}>
          <Button variant={"myPrimary"}>
            <Plus className='w-5 h-5 mr-2' /> New Company
          </Button>
        </Link>
      </div>

      {/* Datatable - List of Companies */}
      <div className='mt-6'>
        <DataTable columns={columns} data={formatedCompanies} searchKey="name" />
      </div>
    </div>
  );
};

export default CompanyPageOverview;
