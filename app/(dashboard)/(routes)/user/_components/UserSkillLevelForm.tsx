"use client";

import SkillBar from "@/components/SkillBar";
import { Button } from "@/components/ui/button";
import ComboBox from "@/components/ui/combo-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserSkillLevelFormProps {
  initialData: UserProfile | null;
  userId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  skillLevelId: z.string().min(1),
});

const SkillLevels: Record<
  string,
  {
    primaryColor: string;
    primaryCount: number;
    secondaryColor: string;
    totalCount: number;
  }
> = {
  "Entry-Level": {
    primaryColor: "#0AAB7C",
    primaryCount: 1,
    secondaryColor: "#f7f6f5",
    totalCount: 5,
  },
  Junior: {
    primaryColor: "#0AAB7C",
    primaryCount: 2,
    secondaryColor: "#f7f6f5",
    totalCount: 5,
  },
  "Mid-Level": {
    primaryColor: "#0AAB7C",
    primaryCount: 3,
    secondaryColor: "#f7f6f5",
    totalCount: 5,
  },
  Senior: {
    primaryColor: "#0AAB7C",
    primaryCount: 4,
    secondaryColor: "#f7f6f5",
    totalCount: 5,
  },
  Expert: {
    primaryColor: "#0AAB7C",
    primaryCount: 5,
    secondaryColor: "#0AAB7C",
    totalCount: 5,
  },
};

const UserSkillLevelForm = ({
  initialData,
  userId,
  options,
}: UserSkillLevelFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillLevelId: initialData?.skillLevelId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/users/${userId}`, values);
      toast.success("Profile updated successfully");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Profile");
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  const selectedOption = options.find(
    (option) => option.value === initialData?.skillLevelId
  );

  const skillLevel = selectedOption?.label;
  const skillData = SkillLevels[skillLevel || ""];

  return (
    <div className='border w-full bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        <p>
          Skill Level{" "}
          {selectedOption?.label && (
            <span className='ml-2 text-[#0AAB7C] font-medium text-sm'>
              ({selectedOption?.label})
            </span>
          )}
        </p>
        <Button onClick={toggleEiditing} variant={"ghost"}>
          {isEditing ? (
            <div className='text-neutral-500'>Cancel</div>
          ) : (
            <div className='text-[#0AAB7C] hover:font-semibold flex items-center'>
              <Pencil className='w-4 text-[#0AAB7C] hover:font-semibold h-4 mr-2' />
              Edit
            </div>
          )}
        </Button>
      </div>

      {/* Display the Category if not Editing */}
      {!isEditing &&
        (initialData?.skillLevelId ? (
          <>
            <div className='mt-6 mb-5 text-sm font-medium text-[#0AAB7C] flex items-center gap-2'>
              {skillData ? (
                <>
                  {Array.from({ length: skillData.totalCount }).map(
                    (_, index) => (
                      <SkillBar
                        key={index}
                        color={
                          skillLevel === "Expert"
                            ? skillData.primaryColor
                            : index < skillData.primaryCount
                            ? skillData.primaryColor
                            : skillData.secondaryColor
                        }
                      />
                    )
                  )}
                </>
              ) : (
                <span>No Skill Level Data</span>
              )}
            </div>
          </>
        ) : (
          <p className='text-sm mt-2 text-neutral-500 italic'>No Skill Level</p>
        ))}

      {/* Display the Form if Editing */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='skillLevelId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox
                      options={options}
                      heading='Skill Level'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center gap-x-2'>
              <Button
                variant={"myPrimary"}
                disabled={!isValid || isSubmitting}
                typeof='submit'
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UserSkillLevelForm;
