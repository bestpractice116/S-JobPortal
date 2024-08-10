"use client";

import Editor from "@/components/Editor";
import Preview from "@/components/PreviewEditorText";
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
import { company_overview} from "@/scripts/aiprompts";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company} from "@prisma/client";
import axios from "axios";
import { Copy, Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CompanyOverviewProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  overview: z.string().min(1),
});

const CompanyOverview = ({ initialData, companyId }: CompanyOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rollName, setRollName] = useState("");
  const [aiValue, setAiValue] = useState("");
  const [isPrompting, setIsPrompting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overview: initialData?.overview || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/companies/${companyId}`, values);
      toast.success("Company Overivew updated successfully!");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Company Overivew!");
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      company_overview;

      await getGenerativeAIResponse(company_overview(rollName)).then(
        (data) => {
          data = data.replace(/^'|'$/g, "");
          let cleanedText = data.replace(/[\*\#]/g, "");
          setAiValue(cleanedText);
          setIsPrompting(false);
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(`Failed to generate the prompt...: ${error}`);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(aiValue);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Company Overview
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

      {/* Display the Description if not Editing */}
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.overview && "text-neutral-500 italic"
          )}
        >
          {!initialData.overview && "No Overview Provided"}
          {initialData.overview && (
            <Preview value={initialData.overview}/>
          )}
        </div>
      )}

      {/* Display the Form if Editing */}
      {isEditing && (
        <>
          <div className='flex items-center gap-2 my-2'>
            <input
              type='text'
              placeholder="e.g 'Company Name...'"
              className='w-full p-2 rounded-md'
              value={rollName}
              onChange={(e) => setRollName(e.target.value)}
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
            Note*: Type the Company Name to generate the sample overview
          </p>

          {aiValue && (
            <div className='w-full h-96 max-h-96 rounded-md bg-white overflow-y-scroll p-3 relative mt-4 text-muted-foreground'>
              {aiValue}

              <Button
                className='absolute top-3 right-3 z-10'
                variant={"outline"}
                size={"icon"}
                onClick={onCopy}
              >
                <Copy className='w-full h-full text-[#0AAB7C]' />
              </Button>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-4'
            >
              <FormField
                control={form.control}
                name='overview'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
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

export default CompanyOverview;
