"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Textarea } from "@/components/ui/textarea";
import { skillsImage } from "@/lib/skill-image";
import { job_tags, user_Software_Skills } from "@/scripts/aiprompts";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job, UserProfile } from "@prisma/client";
import axios from "axios";
import { Divide, Lightbulb, Loader2, Pencil, Tag, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SoftwareSkillsFormProps {
  initialData: UserProfile;
  userId: string;
}

const formSchema = z.object({
  skills: z.array(z.string()).min(1),
});

const SoftwareSkillsForm = ({
  initialData,
  userId,
}: SoftwareSkillsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [userSkills, setUserSkills] = useState<string[]>(initialData?.skills);
  const [isPrompting, setIsPrompting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to toggle view
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const fetchSkills = async () => {
    return [...skills];
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/users/${userId}`, values);
      toast.success("Profile updated successfully!");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Profile!");
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      user_Software_Skills;

      // Assuming user_Software_Skills is defined elsewhere
    const response = await getGenerativeAIResponse(user_Software_Skills(prompt));

    console.log(response); // Debugging step: Check the response format

    let jsonResponse = response.trim(); // Remove any leading/trailing whitespace

    // If the response contains a JSON prefix like "json", remove it
    if (jsonResponse.startsWith('json')) {
      jsonResponse = jsonResponse.slice(4).trim(); // Remove the "json" prefix
    }

    try {
      const parsedData = JSON.parse(jsonResponse);

      if (Array.isArray(parsedData)) {
        setUserSkills((prevTags) => [...prevTags, ...parsedData]);
      }
    } catch (jsonError) {
      console.log("Failed to parse JSON:", jsonError);
      toast.error(`Failed to parse JSON: ${jsonError}`);
    }

    setIsPrompting(false);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to generate the prompt...: ${error}`);
    }
  };

  // useEffect(() => {
  //   const loadSkills = async () => {
  //     const userSkills = await fetchSkills();
  //     setSkills(userSkills);
  //   };

  //   loadSkills();
  // },[]);

  // Define how many skills to show initially
  const initialDisplayCount = 5;

  // Determine the skills to show based on state
  const displayedSkills = showAll
    ? initialData?.skills
    : initialData?.skills.slice(0, initialDisplayCount);

  const handleTagRemove = (index: number) => () => {
    // setUserSkills((skills) => skills.filter((_, i) => i !== index));
    const updatedSkills = [...userSkills];
    updatedSkills.splice(index, 1);
    setUserSkills(updatedSkills);
  };

  return (
    <div className='border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        Skills
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

      {/* Display the Short Description if not Editing */}
      {!isEditing && (
        <div className='mt-1.5 flex items-center flex-wrap gap-2'>
          {displayedSkills?.length > 0 ? (
            <HoverCard>
              <HoverCardTrigger className='flex gap-2'>
                {displayedSkills?.length > 0 ? (
                  displayedSkills?.map((skill, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-center w-9 gap-2 py-1 px-2 rounded-md bg-[#0AAB7C]/10'
                    >
                      {/* Skill Images */}
                      <Image
                        src={skillsImage(skill)}
                        alt={skill}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                  ))
                ) : (
                  <p className='text-sm mb-2.5 text-neutral-500 truncate w-full italic'>
                    No Skill
                  </p>
                )}
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>Skills</h4>
                    <p className='text-sm'>
                      {initialData?.fullName} has skills in{" "}
                      {initialData?.skills.length} areas.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {initialData?.skills.map((skill, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-2 py-1 px-2 rounded-md bg-[#0AAB7C]/10'
                        >
                          {/* Skill Images */}
                          <Image
                            src={skillsImage(skill)}
                            alt={skill}
                            width={20}
                            height={20}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='flex items-center pt-2'>
                      {/* <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{" "} */}
                      <span className='text-xs text-muted-foreground'>
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <p className='text-sm mb-2.5 text-neutral-500 truncate w-full italic'>
              No Skill
            </p>
          )}
          {/* {initialData?.skills.length > 0 ? (
            initialData?.skills.map((skill, index) => (
              <div
                key={index}
                className='text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-[#0AAB7C]/10'
              >
                {skill}
              </div>
            ))
          ) : (
            <p className='text-sm text-neutral-500 truncate w-full italic'>
              No Skill
            </p>
          )} */}
        </div>
      )}

      {/* Display the Form if Editing */}
      {isEditing && (
        <>
          <div className='flex items-center gap-2 my-2'>
            <input
              type='text'
              placeholder="e.g 'Full-Stack Developer'"
              className='w-full p-2 rounded-md text-sm'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {isPrompting ? (
              <>
                <Button variant={"myPrimary"}>
                  <Loader2 className='w-4 h-4 animate-spin' />
                </Button>
              </>
            ) : (
              <>
                <Button variant={"myPrimary"} onClick={handlePromptGeneration}>
                  <Lightbulb className='w-4 h-4' />
                </Button>
              </>
            )}
          </div>
          <p className='text-xs text-muted-foreground text-right'>
            Note*: Type your Role here to get skills
          </p>

          <div className='flex items-center gap-2 flex-wrap'>
            {userSkills?.length > 0 ? (
              userSkills?.map((skill, index) => (
                <div
                  key={index}
                  className='text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-[#0AAB7C]/10'
                >
                  {skill}{" "}
                  {isEditing && (
                    <Button
                      variant={"ghost"}
                      className='p-0 h-auto'
                      onClick={handleTagRemove(index)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p className='text-sm mt-2 text-neutral-500 italic'>No Tags</p>
            )}
          </div>

          <div className='flex items-center gap-2 justify-end mt-4'>
            <Button
              type='button'
              variant={"outline"}
              className='border-[#0AAB7C] text-[#0AAB7C] hover:text-white hover:bg-[#0AAB7C]/80'
              onClick={() => {
                setUserSkills([]);
                onSubmit({ skills: [] });
              }}
              disabled={isSubmitting}
            >
              Clear All
            </Button>
            <Button
              type='submit'
              variant={"myPrimary"}
              disabled={isSubmitting}
              onClick={() => onSubmit({ skills: userSkills })}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SoftwareSkillsForm;
