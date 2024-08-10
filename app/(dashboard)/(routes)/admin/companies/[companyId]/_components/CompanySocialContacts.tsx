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
import { Company } from "@prisma/client";
import axios from "axios";
import { Globe, Linkedin, Mail, MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CompanySocialContactsProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  mail: z.string(),
  website: z.string(),
  linkedIn: z.string(),
  address_line_1: z.string(),
  address_line_2: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
});

const CompanySocialContacts = ({
  initialData,
  companyId,
}: CompanySocialContactsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mail: initialData?.mail || "",
      website: initialData?.website || "",
      linkedIn: initialData?.linkedIn || "",
      address_line_1: initialData?.address_line_1 || "",
      address_line_2: initialData?.address_line_2 || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipcode: initialData?.zipcode || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/companies/${companyId}`, values);
      toast.success("Company Description updated successfully");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Company Description");
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Company Socials
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
          <div className='col-span-3'>
            {initialData.mail ? (
              <div className='text-sm text-neutral-500 flex items-center w-full truncate'>
                <Mail className='w-3 h-3 mr-2' />
                {initialData.mail}
              </div>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Mail className='w-3 h-3 mr-2' />
                No Mail
              </div>
            )}

            {initialData.linkedIn ? (
              <Link
                href={initialData.linkedIn}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Linkedin className='w-3 h-3 mr-2' />
                {initialData.linkedIn}
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Linkedin className='w-3 h-3 mr-2' />
                No LinkedIn
              </div>
            )}

            {initialData.website ? (
              <Link
                href={initialData.website}
                className='text-sm text-neutral-500 flex items-center w-full truncate'
              >
                <Globe className='w-3 h-3 mr-2' />
                {initialData.website}
              </Link>
            ) : (
              <div className='text-sm text-neutral-500 italic flex items-center w-full truncate'>
                <Globe className='w-3 h-3 mr-2' />
                No Website
              </div>
            )}
          </div>
          <div className='col-span-3'>
            {initialData.address_line_1 ? (
              <div className='flex items-center gap-2 justify-start'>
                <MapPin className='w-3 h-3 mt-1' />
                <div>
                  <p className='text-sm text-muted-foreground'>
                    {initialData.address_line_1 && initialData.address_line_1}{" "}
                    {initialData.address_line_2 &&
                      `, ` + initialData.address_line_2}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {initialData.city ? initialData.city : ""}{" "}
                    {initialData.state ? `, ` + initialData.state : ""}{" "}
                    {initialData.zipcode ? `, ` + initialData.zipcode : ""}
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
              name='mail'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Mail: 'sample@mildomain.com'"
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
                      placeholder="Website Link: 'https://www.example.com'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='linkedIn'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="LinkedIn Link: 'https://www.linkedin.com/company/example'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address_line_1'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Address Line 1 : '123, Example Street'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address_line_2'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Address Line 2 : 'Near Example Park'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-3 gap-2'>
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
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='State'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='zipcode'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='Zipcode'
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

export default CompanySocialContacts;
