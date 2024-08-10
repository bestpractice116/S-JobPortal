import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard, ListCheck, Network } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import IconBadge from "@/components/IconBadge";
import NameForm from "./_components/NameForm";
import CompanyDescription from "./_components/CompanyDescription";
import CompanyLogo from "./_components/CompanyLogo";
import CompanySocialContacts from "./_components/CompanySocialContacts";
import CompanyCoverImage from "./_components/CompanyCoverImage";
import CompanyOverview from "./_components/CompanyOverview";
import WhyJoinUsForm from "./_components/WhyJoinUs";
import CompanyIndustryForm from "./_components/CompanyIndustry";

const CompanyDetailsPage = async ({
  params,
}: {
  params: { companyId: string };
}) => {
  // Verify the MongoDB ID
  const validObjectIdRegix = /^[0-9a-fA-F]{24}$/;
  if (!validObjectIdRegix.test(params.companyId)) {
    return redirect("/admin/companies");
  }

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  //   Fetch the Company details from the database
  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!company) {
    return redirect("/admin/companies");
  }

  const requiredFields = [
    company.name,
    company.description,
    company.industry,
    company.logo,
    company.coverImage,
    company.mail,
    company.website,
    company.linkedIn,
    company.address_line_1,
    company.city,
    company.state,
    company.overview,
    company.whyJoinUs,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className='p-6'>
      <Link href={"/admin/companies"}>
        <div className='flex items-center gap-2 text-sm text-neutral-500'>
          <ArrowLeft className='w-4 h-4' />
          Back
        </div>
      </Link>

      {/* Title */}
      <div className='flex items-center justify-between my-4'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-bold'>Company Setup</h1>
          <span className='text-sm text-neutral-500'>
            Complete All Fields {completionText}
          </span>
        </div>
      </div>

      {/* Container Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        {/* Left Container */}
        <div>
          {/* Title */}
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl text-neutral-700 font-semibold'>
              Customize your Company Details
            </h2>
          </div>

          {/* Title Form */}
          <NameForm initialData={company} companyId={company.id} />

          {/* Company Industry Form */}
          <CompanyIndustryForm initialData={company} companyId={company.id} />

          {/* Company Description */}
          <CompanyDescription initialData={company} companyId={company.id} />

          {/* Company Logo */}
          <CompanyLogo initialData={company} companyId={company.id} />

          
        </div>

        {/* Right Container */}
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Network} />
              <h2 className='text-xl text-neutral-700 font-semibold'>
                Company Social Contacts
              </h2>
            </div>

            <CompanySocialContacts
              initialData={company}
              companyId={company.id}
            />

            {/* Company Cover Image */}
            <CompanyCoverImage initialData={company} companyId={company.id} />
          </div>
        </div>

        {/* Overview Container */}
        <div className='col-span-2'>
          {/* Company Overview */}
          <CompanyOverview initialData={company} companyId={company.id} />

          {/* Why Join Us Form */}
          <WhyJoinUsForm initialData={company} companyId={company.id} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
