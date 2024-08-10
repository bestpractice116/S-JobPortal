"use client";

import { storage } from "@/config/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { File, FilePlus, ImagePlus, Trash, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { url } from "inspector";

interface PortfolioUploadsProps {
  disabled?: boolean;
  onChange: (value: { url: string; name: string }[]) => void;
  value: { url: string; name: string }[];
}

const PortfolioUploads = ({
  disabled,
  onChange,
  value,
}: PortfolioUploadsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);

    setIsLoading(true);

    // Array to store Newly Uploaded URLs
    const newUrls: { url: string; name: string }[] = [];

    // Counter to keep track the uploaded files
    let completedFiles = 0;

    files.forEach((file: File) => {
      const uploadTask = uploadBytesResumable(
        ref(storage, `Attachments/${Date.now()}-${file?.name}`),
        file,
        { contentType: file?.type }
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            // Store this URL
            newUrls.push({ url: downloadUrl, name: file.name });

            // increase the count of the counter
            completedFiles++;

            // check the files are uploaded or not
            if (completedFiles === files.length) {
              setIsLoading(false);

              onChange([...value, ...newUrls]);
            }
          });
        }
      );
    });
  };

  return (
    <div>
      <div className='w-56 h-40 border-2 border-dashed rounded-lg border-[#0AAB7C] p-2 flex items-center justify-center bg-[#0AAB7C]/10'>
        {isLoading ? (
          <>
            <p className='text-emerald-500 font-medium text-sm'>{`${progress.toFixed(
              2
            )}%`}</p>
          </>
        ) : (
          <>
            <label className='w-full h-full flex items-center justify-center'>
              <div className='w-full h-full text-neutral-500 flex flex-col gap-2 items-center justify-center cursor-pointer'>
                <UploadCloud className='w-5 h-5 mr-2' />
                <p>Add your Portfolio</p>
              </div>
              <input
                type='file'
                accept='image/*'
                multiple
                className='w-0 h-0'
                onChange={onUpload}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioUploads;
