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
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachments, Job } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface AttachmentsFormProps {
  initialData: Job & { attachments: Attachments[] };
  jobId: string;
}

const formSchema = z.object({
  attachments: z.object({ url: z.string(), name: z.string() }).array(),
});

const AttachmentsForm = ({ initialData, jobId }: AttachmentsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const initialAttachments = Array.isArray(initialData?.attachments)
    ? initialData.attachments.map((attachment: any) => {
        if (
          typeof attachment === "object" &&
          attachment !== null &&
          "url" in attachment &&
          "name" in attachment
        ) {
          return { url: attachment.url, name: attachment.name };
        }
        return { url: "", name: "" };
      })
    : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: initialAttachments,
    },
  });


  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/jobs/${jobId}/attachments`,
        values
      );
      toast.success("Job Attachment updated successfully.");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Job Attachment!");
    }
  };

  
  const onDelete = async (attachment: Attachments) => {
    try {
      setDeletingId(attachment.id);

      await axios.delete(`/api/jobs/${jobId}/attachments/${attachment.id}`);
      toast.success("Attachment deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete the attachment!");
      
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Job Attachments
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
          {initialData.attachments.map((item) => (
            <div
              key={item.url}
              className='text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-[#0AAB7C]/10'
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
              name='attachments'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AttachmentsUploads
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(attachments) => {
                        if (attachments) {
                          onSubmit({ attachments });
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
                className="hidden"
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

export default AttachmentsForm;
