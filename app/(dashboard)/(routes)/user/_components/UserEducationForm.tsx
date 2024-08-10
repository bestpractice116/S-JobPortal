"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education, UserProfile } from "@prisma/client";
import axios from "axios";
import {
  Dot,
  Facebook,
  File,
  Github,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Twitter,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserEducationFormProps {
  initialData: UserProfile & { education: Education[] };
  userId: string;
}

const formSchema = z.object({
  education: z.object({
    university: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    grade: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    currentlyStudying: z.boolean().optional(),
    description: z.string().optional(),
  }),
});

const UserEducationForm = ({ initialData, userId }: UserEducationFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/users/${userId}/educations`,
        // create values not iterable
        { education: [values.education] }
      );
      toast.success("Profile updated successfully");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Profile");
    }
  };

  const onDelete = async (education: Education) => {
    try {
      setDeletingId(education.id);

      await axios.delete(`/api/users/${userId}/educations/${education.id}`);
      toast.success("Education Detail deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete the Education Detail!");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  return (
    <div className='border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between mb-2'>
        Education Details
        <Button onClick={toggleEiditing} variant={"ghost"}>
          {isEditing ? (
            <div className='text-neutral-500'>Cancel</div>
          ) : (
            <div className='text-[#0AAB7C] hover:font-semibold flex items-center'>
              <Plus className='w-4 text-[#0AAB7C] hover:font-semibold h-4 mr-2' />
              Add
            </div>
          )}
        </Button>
      </div>

      {/* Display the Company Name if not Editing */}
      {!isEditing && (
        <div className=''>
          {initialData.education?.map((item) => (
            <div className='flex flex-col mt-5' key={item.id}>
              <div className='flex justify-between'>
                <div>
                  <div className='flex'>
                    <div>
                      <p className='font-medium md:text-sm text-xs'>
                        {item.degree}, {item.fieldOfStudy}
                      </p>
                    </div>
                  </div>
                  <div className='flex mt-1'>
                    <p className='text-neutral-500 md:text-sm text-xs flex'>
                      {item.university}{" "}
                      <Dot className='md:text-sm text-xs -mt-0.5 md:block hidden' />
                      {item.startDate?.getFullYear()}{" "}
                      {!item.endDate || item.currentlyStudying
                        ? " - Present"
                        : item.endDate?.getFullYear()
                        ? `- ${item.endDate?.getFullYear()}`
                        : ""}
                    </p>
                  </div>
                </div>
                <div>
                  {deletingId === item.id && (
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className='p-1'
                      type='button'
                    >
                      <Loader2 className='h-full w-full text-emerald-500 animate-spin' />
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
                      <X className='h-4 w-4 text-red-500' />
                    </Button>
                  )}
                </div>
              </div>
              <div className='flex mt-3'>
                <p className='text-neutral-500 md:text-sm text-xs'>
                  {item.description}
                </p>
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
            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
              <FormField
                control={form.control}
                name='education.university'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'University of Lagos'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='education.degree'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'Bachelor'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
              <FormField
                control={form.control}
                name='education.fieldOfStudy'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'Computer Science'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='education.grade'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'A+'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
              <FormField
                control={form.control}
                name='education.startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='date'
                        disabled={isSubmitting}
                        placeholder="e.g '2021-01-01'"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='education.endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='date'
                        disabled={isSubmitting}
                        placeholder="e.g '2021-01-01'"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex ml-1.5">
              <FormField
                control={form.control}
                name='education.currentlyStudying'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center'>
                        <Checkbox
                          id='currentlyStudying'
                          className='data-[state=checked]:bg-[#0AAB7C]/85 data-[state=checked]:border-[#0AAB7C] border-neutral-600'
                          disabled={isSubmitting}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                        <label htmlFor='currentlyStudying' className='ml-2 text-neutral-500'>
                          Currently Studying
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=' w-full'>
              <FormField
                control={form.control}
                name='education.description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder='e.g "I studied Computer Science at the University of Lagos"'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default UserEducationForm;
