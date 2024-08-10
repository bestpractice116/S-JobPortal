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
import { job_tags } from "@/scripts/aiprompts";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@prisma/client";
import axios from "axios";
import { Divide, Lightbulb, Loader2, Pencil, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TagFormProps {
  initialData: Job;
  jobId: string;
}

const formSchema = z.object({
  tags: z.array(z.string()).min(1),
});

const TagForm = ({ initialData, jobId }: TagFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [jobTags, setJobTags] = useState<string[]>(initialData.tags);
  const [isPrompting, setIsPrompting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Short Description updated successfully!");
      toggleEiditing();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Short Description!");
    }
  };

  const toggleEiditing = () => setIsEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);
      job_tags;

      await getGenerativeAIResponse(job_tags(prompt)).then((data) => {
        if (Array.isArray(JSON.parse(data))) {
          setJobTags((prevTags) => [...prevTags, ...JSON.parse(data)]);
        }
        setIsPrompting(false);
      });
    } catch (error) {
      console.log(error);
      toast.error(`Failed to generate the prompt...: ${error}`);
    }
  };

  const handleTagRemove = (index: number) => () => {
    // setJobTags((tags) => tags.filter((_, i) => i !== index));
    const updatedTags = [...jobTags];
    updatedTags.splice(index, 1);
    setJobTags(updatedTags);
  };

  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Skills
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
      {!isEditing && <div className='flex items-center flex-wrap gap-2'>
          {initialData.tags.length > 0 ? (initialData.tags.map((tag, index)=> (
            <div key={index} className="text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-[#0AAB7C]/10">{tag}</div>
          ))) : (<p className="text-neutral-500 italic">No Tags</p>)}
        </div>}

      {/* Display the Form if Editing */}
      {isEditing && (
        <>
          <div className='flex items-center gap-2 my-2'>
            <input
              type='text'
              placeholder="e.g 'Full-Stack Developer'"
              className='w-full p-2 rounded-md'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
            Note*: Profession Name alone enough to generate the tags
          </p>

          <div className='flex items-center gap-2 flex-wrap'>
            {jobTags.length > 0 ? (
              jobTags.map((tag, index) => (
                <div
                  key={index}
                  className='text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-[#0AAB7C]/10'
                >
                  {tag}{" "}
                  {isEditing && (
                    <Button
                      variant={"ghost"}
                      className='p-0 h-auto'
                      onClick={handleTagRemove(index)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>No Tags</p>
            )}
          </div>

          <div className='flex items-center gap-2 justify-end mt-4'>
            <Button
              type='button'
              variant={"outline"}
              className='border-[#0AAB7C] text-[#0AAB7C] hover:text-white hover:bg-[#0AAB7C]/80'
              onClick={() => {
                setJobTags([]);
                onSubmit({ tags: [] });
              }}
              disabled={isSubmitting}
            >
              Clear All
            </Button>
            <Button
              type='submit'
              variant={"myPrimary"}
              disabled={isSubmitting}
              onClick={() => onSubmit({ tags: jobTags })}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TagForm;
