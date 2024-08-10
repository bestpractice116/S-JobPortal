import { Separator } from "@/components/ui/separator";
import UserNameEditForm from "./UserNameEditForm";
import {
  BookUser,
  Brain,
  BriefcaseBusiness,
  Dot,
  File,
  GraduationCap,
  LayoutDashboard,
  NotebookText,
  User2Icon,
  UserRound,
} from "lucide-react";
import IconBadge from "@/components/IconBadge";
import UserEmailEditForm from "./UserEmailEditForm";
import UserContactsForm from "./UserContactsForm";
import UserRoleForm from "./UserRoleForm";
import { db } from "@/lib/db";
import UserBioForm from "./UserBioForm";
import UserSkillLevelForm from "./UserSkillLevelForm";
import SoftwareSkillsForm from "./SoftwareSkillsForm";
import UserAddResumesForm from "./UserAddResumesForm";
import UserEducationForm from "./UserEducationForm";
import UserExperienceForm from "./UserExperienceForm";
import UserPortfolioForm from "./UserPortfolio";
import UserAddPortfolioForm from "./UserAddPortfolioForm";

interface UserProfileEditProps {
  user: any;
  profile: any;
}

const UserProfileEdit = async ({ user, profile }: UserProfileEditProps) => {
  const userId = user.id;

  const requiredFields = [
    profile?.fullName && profile?.fullName.length > 0,
    profile?.email && profile?.email.length > 0,
    profile?.role && profile?.role.length > 0,
    profile?.biography && profile?.biography.length > 0,
    profile?.website && profile?.website.length > 0,
    profile?.city && profile?.city.length > 0,
    profile?.country && profile?.country.length > 0,
    profile?.contact && profile?.contact.length > 0,
    profile?.skills && profile?.skills.length > 0,
    profile?.resumes && profile?.resumes.length > 0,
    profile?.jobExperience && profile?.jobExperience.length > 0,
    profile?.education && profile?.education.length > 0,
    profile?.portfolio && profile?.portfolio.length > 0,
    profile?.portfolioDescription && profile?.portfolioDescription.length > 0,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  const roles = await db.role.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const skillLevels = await db.skillLevel.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className='w-[76vw] mt-14'>
      <div className='w-full flex flex-col md:flex-row md:justify-between justify-start md:items-center items-start gap-5'>
        <div className='flex flex-col'>
          <div>
            {profile?.fullName && profile?.fullName.length > 0 ? (
              <h2 className='text-2xl font-medium tracking-normal'>
                {profile?.fullName}
              </h2>
            ) : (
              <h2 className='text-2xl font-medium tracking-normal'>
                {user.fullName}
              </h2>
            )}
          </div>

          <div className='mt-1'>
            {profile?.roleId && profile?.roleId.length > 0 ? (
              <p className='text-md text-neutral-700'>
                {roles
                  .filter((role) => profile.roleId.includes(role.id)) // Assuming `role.id` is the unique identifier for each role
                  .map((role) => role.name) // Assuming `role.name` is the name of the role
                  .join(", ")}{" "}
                {/* Join the role names with a comma */}
              </p>
            ) : (
              <p className='text-md text-neutral-500 italic'>No Role Added</p>
            )}
          </div>

          <div className='mt-1.5 flex'>
            {profile?.city && profile?.city.length > 0 ? (
              <p className='md:text-sm text-xs text-neutral-400'>
                {profile?.city}
              </p>
            ) : (
              <p className='md:text-sm text-xs text-neutral-400'>No City</p>
            )}
            {profile?.country && profile?.country.length > 0 ? (
              <p className='md:text-sm text-xs text-neutral-400'>
                , {profile?.country}
              </p>
            ) : (
              <p className='md:text-sm text-xs text-neutral-400'>
                , No Country
              </p>
            )}
            {/* {profile?.connections && profile?.connections.length > 0 ? (
              <p className='md:text-sm text-xs text-neutral-400 flex items-start justify-center'>
                <Dot className='md:text-sm text-xs -mt-0.5' />
                {profile?.connections} Connection
              </p>
            ) : (
              <p className='md:text-sm text-xs text-neutral-400 flex items-start justify-center'>
                <Dot className='md:text-sm text-xs -mt-0.5' /> 0 Connection
              </p>
            )} */}
          </div>
        </div>

        {/* <div className='flex gap-2'>
          <Button variant={"outline"} type='button'>
            Cancel
          </Button>
          <Button variant={"myPrimary"} type='submit'>
            Save
          </Button>
        </div> */}

        {/* Title */}
        <div className='flex flex-col gap-y-2'>
          <span className='text-sm text-neutral-500'>
            Complete All Fields {completionText}
          </span>
        </div>
      </div>

      <Separator className='mt-10 mb-10' />

      <div className='flex items-center gap-x-2 mb-5'>
        <IconBadge icon={LayoutDashboard} />
        <h2 className='text-xl text-neutral-700 font-semibold'>
          Basic Details
        </h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* UserName Edit Form */}
        <div className='w-full'>
          <UserNameEditForm initialData={profile} userId={userId} />
        </div>

        {/* User Email Edit Form */}
        <div className='w-full'>
          <UserEmailEditForm initialData={profile} userId={userId} />
        </div>
      </div>

      <div className='w-full'>
        {/* User Role Form */}
        <UserRoleForm
          initialData={profile}
          userId={userId}
          options={roles.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
        />
      </div>
      {/* User Bio Form */}
      <div>
        <UserBioForm initialData={profile} userId={userId} />
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={BookUser} />
        <h2 className='text-xl text-neutral-700 font-semibold'>
          Contact Details
        </h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* User Contacts Edit Form */}
        <div className='w-full'>
          <UserContactsForm initialData={profile} userId={userId} />
        </div>
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={Brain} />
        <h2 className='text-xl text-neutral-700 font-semibold'>Skills</h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* Skills Level Form */}
        <div className='w-full'>
          <UserSkillLevelForm
            initialData={profile}
            userId={userId}
            options={skillLevels.map((skillLevel) => ({
              label: skillLevel.name,
              value: skillLevel.id,
            }))}
          />
        </div>

        {/* Software Skills Edit Form */}
        <div className='w-full'>
          <SoftwareSkillsForm initialData={profile} userId={userId} />
        </div>
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={GraduationCap} />
        <h2 className='text-xl text-neutral-700 font-semibold'>Education</h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* User Education Form */}
        <div className='w-full'>
          <UserEducationForm initialData={profile} userId={userId} />
        </div>
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={BriefcaseBusiness} />
        <h2 className='text-xl text-neutral-700 font-semibold'>
          Job Experience
        </h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* User Expereince Form */}
        <div className='w-full'>
          <UserExperienceForm initialData={profile} userId={userId} />
        </div>
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={UserRound} />
        <h2 className='text-xl text-neutral-700 font-semibold'>
          Portfolio Projects
        </h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* User Expereince Form */}
        <div className='w-full mt-6 border bg-neutral-100 rounded-md p-4'>
          <UserPortfolioForm initialData={profile} userId={userId} />
          <div>
            <UserAddPortfolioForm initialData={profile} userId={userId} />
          </div>
        </div>
      </div>

      <div className='flex items-center gap-x-2 mb-5 mt-10'>
        <IconBadge icon={NotebookText} />
        <h2 className='text-xl text-neutral-700 font-semibold'>Resumes</h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* User Resume Form */}
        <div className='w-full'>
          <UserAddResumesForm initialData={profile} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
