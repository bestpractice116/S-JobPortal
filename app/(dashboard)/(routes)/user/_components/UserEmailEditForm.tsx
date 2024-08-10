"use client";

import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@prisma/client";
import axios from "axios";
import { Mail, Pencil, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserEmailEditFormProps {
  initialData: UserProfile | null;
  userId: string;
}

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
});

const UserEmailEditForm = ({ initialData, userId }: UserEmailEditFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [clerkEmail, setClerkEmail] = useState("");
  const router = useRouter();

  const { user } = useUser(); // Fetching user info from Clerk

  useEffect(() => {
    if (user && user.emailAddresses) {
      setClerkEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialData?.email || "",
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

  return (
    <div className='w-full border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        Email
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

      {/* Display the Title if not Editing */}
      {!isEditing && (
        <div className='text-sm mt-2 flex items-center gap-2 text-neutral-500'>
          <Mail className='w-4 h-4 mr-2' />
          <p
          className={cn(
            "text-sm text-neutral-500 truncate w-full",
            !initialData?.email && "italic"
          )}
        >
          {initialData?.email || "No Email Added"}
        </p>
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'example@mail.com'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex md:flex-row flex-col md:items-center gap-3'>
              <Button
                variant={"myPrimary"}
                disabled={!isValid || isSubmitting}
                typeof='submit'
              >
                Save
              </Button>
              <p className='text-xs text-muted-foreground text-left'>
                Note*: Make Sure to update that activate email address, it will
                be used for all future communication. And Note that it will not
                be used for login.
              </p>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UserEmailEditForm;
