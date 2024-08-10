import {
  getCompanyPieGraphCreatedByUser,
  getJobPieGraphCreatedByUser,
  getTotalCompaniesOnPortal,
  getTotalCompaniesOnPortalByUserId,
  getTotalJobsOnPortal,
  getTotalJobsOnPortalByUserId,
} from "@/actions/get-overview-analytics";
import Box from "@/components/Box";
import OverviewPieChart from "@/components/OverviewPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { BriefcaseBusiness } from "lucide-react";
import { redirect } from "next/navigation";

const DashboardAnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const totalJobsOnPortal = await getTotalJobsOnPortal();
  const totalJobsByUserOnPortal = await getTotalJobsOnPortalByUserId(userId);

  const totalCompaniesOnPortal = await getTotalCompaniesOnPortal();
  const totalCompaniesByUserOnPortal = await getTotalCompaniesOnPortalByUserId(
    userId
  );

  const totalGraphJob = await getJobPieGraphCreatedByUser(userId);
  const totalGraphcompany = await getCompanyPieGraphCreatedByUser(userId);
  return (
    <Box className='flex-col items-start p-4'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold tracking-wider'>Dashboard</h2>
        <p className='text-sm text-neutral-400'>Analytics of your account.</p>
      </div>

      <Separator className='my-4' />

      <div className='grid w-full gap-4 grid-cols-1 md:grid-cols-4'>
        {/* Total jobs on the Portal */}
        <Card>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>Total Jobs</CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-2xl font-bold text-[#0AAB7C]'>
            {totalJobsOnPortal}
          </CardContent>
        </Card>

        {/* Total jobs by Particular User on the Portal */}
        <Card>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>Posted Jobs</CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-2xl font-bold text-[#0AAB7C]'>
            {totalJobsByUserOnPortal}
          </CardContent>
        </Card>

        {/* Total Companies on the Portal */}
        <Card>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>
              Total Companies
            </CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-2xl font-bold text-[#0AAB7C]'>
            {totalCompaniesOnPortal}
          </CardContent>
        </Card>

        {/* Total Companies by Particular User on the Portal */}
        <Card>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>
              Created Companies
            </CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-2xl font-bold text-[#0AAB7C]'>
            {totalCompaniesByUserOnPortal}
          </CardContent>
        </Card>

        {/* Month Wise Jobs Count */}
        <Card className='col-span-1 md:col-span-2'>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>
              Month Wise Jobs Count
            </CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-xl font-bold'>
            <OverviewPieChart data={totalGraphJob} />
          </CardContent>
        </Card>

        {/* Month Wise Companies Count */}
        <Card className='col-span-1 md:col-span-2'>
          <CardHeader className='items-center justify-between flex-row'>
            <CardTitle className='text-sm font-medium'>
              Month Wise Companies Count
            </CardTitle>
            <BriefcaseBusiness className='w-4 h-4' />
          </CardHeader>
          <CardContent className='text-xl font-bold'>
            <OverviewPieChart data={totalGraphcompany} />
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default DashboardAnalyticsPage;