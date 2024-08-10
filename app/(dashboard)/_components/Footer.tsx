"use client";

import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Box from "@/components/Box";
import Logo from "./Logo";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const menuOne = [
  { href: "/history", label: "History" },
  { href: "/savedJobs", label: "Saved Jobs" },
  { href: "/user", label: "Your Profile" },
  { href: "/search", label: "Search" },
  { href: "/admin/jobs", label: "Admin Mode" },
];

export const Footer = () => {
  return (
    <div className='h-[250px] md:h-20 p-5'>
      <div className='md:hidden grid md:grid-cols-2 grid-cols-1 justify-between w-full'>
        <div className='w-full flex gap-6 mb-3'>
          {/* first section */}
          <Box className='flex-col items-start gap-3'>
            <div className='flex items-center gap-3'>
              <Logo />
            </div>
            <div className='flex flex-col gap-3'>
              <p className='font-semibold text-sm text-neutral-500'>
                Connect with us
              </p>
              <div className='flex items-center w-full gap-6'>
                <Link href={"www.facebook.com"}>
                  <Facebook className='w-5 h-5 text-muted-foreground hover:text-[#0AAB7C] hover:scale-125 transition-all' />
                </Link>

                <Link href={"www.facebook.com"}>
                  <Twitter className='w-5 h-5 text-muted-foreground hover:text-[#0AAB7C] hover:scale-125 transition-all' />
                </Link>

                <Link href={"www.facebook.com"}>
                  <Linkedin className='w-5 h-5 text-muted-foreground hover:text-[#0AAB7C] hover:scale-125 transition-all' />
                </Link>

                <Link href={"www.facebook.com"}>
                  <Youtube className='w-5 h-5 text-muted-foreground hover:text-[#0AAB7C] hover:scale-125 transition-all' />
                </Link>
              </div>
            </div>
          </Box>

          {/* second */}

          <Box className='flex-col items-start w-full gap-y-4 ml-4'>
            {menuOne.map((item) => (
              <Link key={item.label} href={item.href}>
                <p className='text-sm font-sans text-neutral-500 hover:text-[#0AAB7C]'>
                  {item.label}
                </p>
              </Link>
            ))}
          </Box>
        </div>
      </div>

      <Separator />
      <p className='justify-center p-4 text-center md:text-sm text-xs text-muted-foreground'>
        All rights reserved by{" "}
        <span className='text-[#0AAB7C] ml-0.5 mr-0.5 hover:underline'>
          <Link href={"https://smkbukhari.netlify.app/"} target="_blank">SMKBukhari</Link>
          </span> &copy;
        2024
      </p>
    </div>
  );
};
