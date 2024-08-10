"use client";

import AttachmentsUploads from "@/components/AttachmentsUpoads";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachments, Job, Resumes, UserProfile } from "@prisma/client";
import axios from "axios";
import {
  File,
  ImageIcon,
  Loader2,
  Pencil,
  ShieldCheck,
  ShieldX,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserAddResumesFormProps {
  initialData: UserProfile & { resumes: Resumes[] };
  userId: string;
}

const formSchema = z.object({
  resumes: z.object({ url: z.string(), name: z.string() }).array(),
});

const UserAddResumesForm = ({
  initialData,
  userId,
}: UserAddResumesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isActiveResumeId, setIsActiveResumeId] = useState<string | null>(null);
  const router = useRouter();

  const initialResumes = Array.isArray(initialData?.resumes)
    ? initialData.resumes.map((resume: any) => {
        if (
          typeof resume === "object" &&
          resume !== null &&
          "url" in resume &&
          "name" in resume
        ) {
          return { url: resume.url, name: resume.name };
        }
        return { url: "", name: "" };
      })
    : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumes: initialResumes,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/users/${userId}/resumes`, values);
      toast.success("User Resume updated successfully.");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update User Resume!");
    }
  };

  const onDelete = async (resume: Resumes) => {
    try {
      setDeletingId(resume.id);
      if(initialData.activeResumeId === resume.id) {
        toast.error("Cannot delete the active resume!");
        return;
      }

      await axios.delete(`/api/users/${userId}/resumes/${resume.id}`);
      toast.success("Attachment deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete the attachment!");
    }finally {
      setDeletingId(null);
    }
  };

  const setActiveResumeId = async (resumeId: string) => {
    setIsActiveResumeId(resumeId);

    try {
      const response = await axios.patch(`/api/users/${userId}`,{
        activeResumeId: resumeId
      })
      toast.success("Resume activated successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to activate the resume!");
    }
    finally {
      setIsActiveResumeId(null);
    }
  }

  const toggleEiditing = () => setIsEditing((current) => !current);

  return (
    <div className='border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        Your Resumes
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

      {/* Display the attachments if not Editing */}
      {!isEditing && (
        <div className='space-y-2'>
          {initialData?.resumes.map((item) => (
            <div className='grid md:grid-cols-12 grid-cols-6' key={item.url}>
              <div
                key={item.url}
                className='text-xs flex items-center gap-1 whitespace-nowrap md:py-1 px-2 rounded-md bg-[#0AAB7C]/10 md:col-span-11 col-span-4'
              >
                <File className='w-4 h-4 mr-2' />
                <p className='text-xs w-full truncate'>{item.name}</p>
                {deletingId === item.id && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className='p-1'
                    type='button'
                  >
                    <Loader2 className='h-full w-full animate-spin' />
                  </Button>
                )}
                {deletingId !== item.id && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className='p-1'
                    type='button'
                    onClick={() => onDelete(item)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>

              <div className='col-span-1 flex items-center justify-start'>
                {isActiveResumeId === item.id ? (
                  <div className='flex items-center justify-center w-full'>
                    <Loader2 className='md:h-5 h-3 md:w-5 w-3 animate-spin' />
                  </div>
                ) : (
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "flex items-center justify-center",
                      initialData.activeResumeId === item.id
                        ? "text-emerald-500"
                        : "text-red-500"
                    )}
                    onClick={()=> setActiveResumeId(item.id)}
                  >
                    <p className="text-xs md:text-sm">
                      {initialData.activeResumeId === item.id
                        ? "Live"
                        : "Activate"}
                    </p>

                    {initialData.activeResumeId === item.id ? (
                      <ShieldCheck className='md:h-4 h-3 md:w-4 w-3 ml-2' />
                    ) : (
                      <ShieldX className='md:h-4 h-3 md:w-4 w-3 ml-2' />
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display the Form if Editing */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='resumes'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AttachmentsUploads
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(resumes) => {
                        if (resumes) {
                          onSubmit({ resumes });
                        }
                      }}
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
                className='hidden'
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

export default UserAddResumesForm;
