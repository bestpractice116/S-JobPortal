import { db } from "@/lib/db";

export const getTotalJobsOnPortal = async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs.length;
};

export const getTotalJobsOnPortalByUserId = async (userId: string | null) => {
  if (!userId) {
    return 0;
  }
  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs.length;
};

export const getTotalCompaniesOnPortal = async () => {
  const companies = await db.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return companies.length;
};

export const getTotalCompaniesOnPortalByUserId = async (
  userId: string | null
) => {
  if (!userId) {
    return 0;
  }
  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return companies.length;
};

interface PieChartMonthlyCount {
  name: string;
  value: number;
}

export const getJobPieGraphCreatedByUser = async (
  userId: string | null
): Promise<PieChartMonthlyCount[]> => {
  if (!userId) {
    return [];
  }

  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentYear = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyCount: PieChartMonthlyCount[] = months.map((month) => ({
    name: month,
    value: 0,
  }));

  const monthlyCountLookup: { [key: string]: PieChartMonthlyCount } =
    monthlyCount.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as { [key: string]: PieChartMonthlyCount });

  jobs.forEach((job) => {
    const createdAt = new Date(job.createdAt);
    const month = createdAt.toLocaleString("default", { month: "short" });
    const year = createdAt.getFullYear();

    if (year === currentYear) {
      if (monthlyCountLookup[month]) {
        monthlyCountLookup[month].value++;
      }
    }
  });

  return monthlyCount;
};


export const getCompanyPieGraphCreatedByUser = async (
  userId: string | null
): Promise<PieChartMonthlyCount[]> => {
  if (!userId) {
    return [];
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentYear = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyCount: PieChartMonthlyCount[] = months.map((month) => ({
    name: month,
    value: 0,
  }));

  const monthlyCountLookup: { [key: string]: PieChartMonthlyCount } =
    monthlyCount.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as { [key: string]: PieChartMonthlyCount });

  companies.forEach((company) => {
    const createdAt = new Date(company.createdAt);
    const month = createdAt.toLocaleString("default", { month: "short" });
    const year = createdAt.getFullYear();

    if (year === currentYear) {
      if (monthlyCountLookup[month]) {
        monthlyCountLookup[month].value++;
      }
    }
  });

  return monthlyCount;
};
