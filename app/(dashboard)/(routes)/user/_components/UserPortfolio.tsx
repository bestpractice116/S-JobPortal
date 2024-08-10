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
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserPortfolioFormProps {
  initialData: UserProfile;
  userId: string;
}

const formSchema = z.object({
  portfolioDescription: z.string().min(1),
});

const UserPortfolioForm = ({ initialData, userId, }: UserPortfolioFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioDescription: initialData?.portfolioDescription || "",
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
  

  return (
    <div className=''>
      <div className='font-medium text-sm flex items-center justify-between'>
        Portfolio Projects
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
            !initialData?.portfolioDescription && "italic"
          )}
        >
          {initialData?.portfolioDescription || "No Portfolio Description Added"}
        </p>
      )}

      {/* Display the Form if Editing */}
      {isEditing && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-4'
            >
              <FormField
                control={form.control}
                name='portfolioDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                      rows={5}
                        disabled={isSubmitting}
                        placeholder='Add a short description of your portfolio projects'
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

export default UserPortfolioForm;
