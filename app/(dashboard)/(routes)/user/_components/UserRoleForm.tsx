"use client";

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

interface UserRoleFormProps {
  initialData: UserProfile | null;
  userId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  roleId: z.string().min(1),
});

const UserRoleForm = ({ initialData, userId, options }: UserRoleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: initialData?.roleId || "",
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
    (option) => option.value === initialData?.roleId
  );

  return (
    <div className='mt-6 border w-full bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between'>
        User Role
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
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 text-neutral-500",
            !initialData?.roleId && "italic"
          )}
        >
          {selectedOption?.label || "No Role Added"}
        </p>
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
              name='roleId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox
                      options={options}
                      heading='User Role'
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

export default UserRoleForm;
