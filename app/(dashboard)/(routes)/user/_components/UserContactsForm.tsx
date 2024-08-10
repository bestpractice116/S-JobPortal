"use client";

import { Button } from "@/components/ui/button";
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
import { UserProfile } from "@prisma/client";
import axios from "axios";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserContactsFormProps {
  initialData: UserProfile | null;
  userId: string;
}

const formSchema = z.object({
  city: z.string(),
  country: z.string(),
  website: z.string(),
  contact: z.string(),
  linkedIn: z.string(),
  github: z.string(),
  twitter: z.string(),
  facebook: z.string(),
  instagram: z.string(),
});

const UserContactsForm = ({ initialData, userId }: UserContactsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: initialData?.city || "",
      website: initialData?.website || "",
      country: initialData?.country || "",
      contact: initialData?.contact || "",
      linkedIn: initialData?.linkedIn || "",
      github: initialData?.github || "",
      twitter: initialData?.twitter || "",
      facebook: initialData?.facebook || "",
      instagram: initialData?.instagram || "",
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
    <div className='border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium text-sm flex items-center justify-between mb-2'>
        Contact Information
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

      {/* Display the Company Name if not Editing */}
      {!isEditing && (
        <div className='grid grid-cols-3 gap-2'>
          <div className='md:col-span-1 col-span-3'>
            {initialData?.linkedIn ? (
              <Link
                href={initialData.linkedIn}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Linkedin className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.linkedIn}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Linkedin className='w-3 h-3 mr-2' />
                No LinkedIn
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.website ? (
              <Link
                href={initialData.website}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Globe className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.website}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Globe className='w-3 h-3 mr-2' />
                No Website
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.github ? (
              <Link
                href={initialData.github}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Github className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.github}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Github className='w-3 h-3 mr-2' />
                No Github
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.twitter ? (
              <Link
                href={initialData.twitter}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Twitter className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.twitter}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Twitter className='w-3 h-3 mr-2' />
                No Twitter
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.facebook ? (
              <Link
                href={initialData.facebook}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Facebook className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.facebook}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Facebook className='w-3 h-3 mr-2' />
                No Facebook
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.instagram ? (
              <Link
                href={initialData.instagram}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Instagram className='w-3 h-3 mr-2' />
                <p className='truncate'>{initialData.instagram}</p>
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Instagram className='w-3 h-3 mr-2' />
                No Instagram
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.city || initialData?.country ? (
              <div className='flex text-neutral-500 items-center gap-2 justify-start'>
                <MapPin className='w-3 h-3' />
                <div>
                  <p className='text-sm text-muted-foreground'>
                    {initialData.city ? initialData.city : ""}{" "}
                    {initialData.country ? `, ` + initialData.country : ""}{" "}
                  </p>
                </div>
              </div>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <MapPin className='w-3 h-3 mr-2' />
                No Address
              </div>
            )}
          </div>

          <div className='md:col-span-1 col-span-3'>
            {initialData?.contact ? (
              <div className='flex text-neutral-500 items-center gap-2 justify-start'>
                <Phone className='w-3 h-3' />
                <p className='truncate'>{initialData.contact}</p>
              </div>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Phone className='w-3 h-3 mr-2' />
                No Contact
              </div>
            )}
          </div>
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
                name='linkedIn'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.linkedin.com/company/example'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.example.com'
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
                name='github'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.github.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='twitter'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.twitter.com'
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
                name='facebook'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.facebook.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='https://www.instagram.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid md:grid-cols-3 grid-cols-1 gap-2'>
              <FormField
                control={form.control}
                name='contact'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g +1234567890'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='City'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='Country'
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

export default UserContactsForm;
