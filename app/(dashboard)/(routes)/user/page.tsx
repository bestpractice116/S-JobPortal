import Box from "@/components/Box";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserBannerImage from "./_components/UserBannerImage";
import { db } from "@/lib/db";
import Image from "next/image";
import { UserProfile } from "@clerk/nextjs";
import UserProfileEdit from "./_components/UserProfileEdit";

const ProfilePage = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  let profile = await db.userProfile.findUnique({
    where: {
        userId,
    },
    include: {
        resumes : {
            orderBy: {
                createdAt: 'desc'
            }
        },
        education: {
            orderBy: {
                createdAt: 'desc'
            }
        },
        jobExperience: {
            orderBy: {
                createdAt: 'desc'
            }
        },
        portfolio: {
            orderBy: {
                createdAt: 'desc'
            }
        },
    }
  })

  return (
    <div className='flex-col p-4 md:p-8 items-center justify-center flex'>
      <Box>
        <CustomBreadCrumb breadCrumbPage='My Profile' />
      </Box>
      

      {/* <Box className="flex-col p-4 rounded-md border mt-8 w-full space-y-6">
      </Box> */}

      {/* User Banner Image */}
      <UserBannerImage user={user} />

      {/* User Profile Edit Page */}
      <UserProfileEdit user={user} profile={profile} />

      
      
    </div>
  );
};

export default ProfilePage;
