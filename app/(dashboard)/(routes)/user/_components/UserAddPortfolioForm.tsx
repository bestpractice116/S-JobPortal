"use client";

import AttachmentsUploads from "@/components/AttachmentsUpoads";
import ImageUpload from "@/components/ImageUpload";
import PortfolioUploads from "@/components/PortfolioUploads";
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
import {
  Attachments,
  Job,
  Portfolio,
  Resumes,
  UserProfile,
} from "@prisma/client";
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

interface UserAddPortfolioFormProps {
  initialData: UserProfile & { portfolio: Portfolio[] };
  userId: string;
}

const formSchema = z.object({
  portfolio: z.object({ url: z.string(), name: z.string() }).array(),
});

const UserAddPortfolioForm = ({
  initialData,
  userId,
}: UserAddPortfolioFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isActiveResumeId, setIsActiveResumeId] = useState<string | null>(null);
  const router = useRouter();

  const initialPortfolio = Array.isArray(initialData?.portfolio)
    ? initialData.portfolio.map((portfolio: any) => {
        if (
          typeof portfolio === "object" &&
          portfolio !== null &&
          "url" in portfolio &&
          "name" in portfolio
        ) {
          return { url: portfolio.url, name: portfolio.name };
        }
        return { url: "", name: "" };
      })
    : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolio: initialPortfolio,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/users/${userId}/portfolio`,
        values
      );
      toast.success("Portfolio updated successfully.");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Portfolio!");
    }
  };

  const onDelete = async (portfolio: Portfolio) => {
    try {
      setDeletingId(portfolio.id);

      await axios.delete(`/api/users/${userId}/portfolio/${portfolio.id}`);
      toast.success("Portfolio deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete the Portfolio!");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  return (
    <div className='mt-6'>
      {/* Display the Form if Editing */}
      <div className='w-full flex flex-wrap gap-5 md:justify-start justify-center'>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='portfolio'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PortfolioUploads
                        value={field.value}
                        disabled={isSubmitting}
                        onChange={(portfolio) => {
                          if (portfolio) {
                            onSubmit({ portfolio });
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
        </div>

        {initialData?.portfolio?.map((portfolio) => (
          <div className=''>
            <div className='w-56 h-40 rounded-lg flex items-center justify-center bg-[#0AAB7C]/10'>
              <div key={portfolio.id} className='w-full h-40 flex gap-5'>
                <div className='w-full h-full rounded-md relative'>
                  <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <div className=''>
                      <Button
                        variant={"ghost"}
                        onClick={() => onDelete(portfolio)}
                        disabled={deletingId === portfolio.id}
                        className='flex items-center justify-center text-red-500'
                      >
                        {deletingId === portfolio.id ? (
                          <Loader2 className='w-6 h-6' />
                        ) : (
                          <X className='w-6 h-6' />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className='w-full h-full'>
                    <Image
                      src={portfolio.url}
                      alt={portfolio.name}
                      width={250}
                      height={250}
                      className='w-full h-full object-fit rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddPortfolioForm;
