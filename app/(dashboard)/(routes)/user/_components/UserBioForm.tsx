"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { user_Bio } from "@/scripts/aiprompts";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserBioFormProps {
  initialData: UserProfile;
  userId: string;
}

const formSchema = z.object({
  biography: z.string().min(1),
});

const UserBioForm = ({ initialData, userId, }: UserBioFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const getFullName = initialData?.fullName;
  const [isPrompting, setIsPrompting] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      biography: initialData?.biography || "",
    },
  });
  
  

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
      user_Bio
      if (!getFullName) {
        toast.error("Full Name is required to generate the prompt!");
        setIsPrompting(false);
        return;
      }

      await getGenerativeAIResponse(user_Bio(getFullName, prompt)).then((data)=>{
        form.setValue('biography', data);
        setIsPrompting(false);
      })
    } catch (error) {
      console.log(error);
      toast.error(`Failed to generate the prompt...: ${error}`);
    }
  };

  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        Biography
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
        <p
          className={cn(
            "text-sm mt-2 text-neutral-500 text-justify",
            !initialData?.biography && "italic"
          )}
        >
          {initialData?.biography || "No Biography Added"}
        </p>
      )}

      {/* Display the Form if Editing */}
      {isEditing && (
        <>
          <div className='flex items-center gap-2 my-2'>
            <input
              type='text'
              placeholder="e.g 'Full-Stack Developer'"
              className='w-full p-2 rounded-md'
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
            Note*: User Role alone enough to generate the Biography.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-4'
            >
              <FormField
                control={form.control}
                name='biography'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                      rows={5}
                        disabled={isSubmitting}
                        placeholder='Bio of User.'
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
        </>
      )}
    </div>
  );
};

export default UserBioForm;
