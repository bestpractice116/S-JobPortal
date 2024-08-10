interface ImageFormProps {
  user: any;
}

import { UserProfile } from "@clerk/nextjs";
import Image from "next/image";

const ImageForm = ({ user }: ImageFormProps) => {
  return (
    <>
      <div className='w-full mt-6 border bg-neutral-100 rounded-t-3xl'>
        <div className='relative w-full h-28 md:h-48 rounded-t-3xl aspect-square'>
          <Image
            alt='Cover Image'
            fill
            className='w-full h-full rounded-t-xl object-cover'
            src='/img/userBanner.png'
          />

          {/* User Image */}
          {user && user.hasImage ? (
            <div className='aspect-square md:w-24 md:h-24 w-16 h-16 rounded-full shadow-md absolute md:-bottom-10 md:left-10 -bottom-8 left-5 bg-white border-2'>
              <Image
                alt='User Image'
                fill
                className='w-full h-full rounded-full object-cover'
                src={user.imageUrl}
              />
            </div>
          ): (
            <div className='aspect-square md:w-24 md:h-24 w-16 h-16 rounded-full shadow-md absolute md:-bottom-10 md:left-10 -bottom-8 left-5 bg-white border-2'>
              <Image
                alt='User Image'
                fill
                className='w-full h-full rounded-full object-cover'
                src={user.imageUrl}
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className='mt-10 w-full flex items-center justify-center'>
        <UserProfile routing='hash' />
      </div> */}
    </>
  );
};

export default ImageForm;
