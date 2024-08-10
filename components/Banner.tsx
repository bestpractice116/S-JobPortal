import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle } from "lucide-react";


const bannerVariants = cva(
  "border text-center md:p-4 p-3 text-sm flex items-center w-full rounded-md shadow-md",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-300 text-primary",
        success: "bg-[#0AAB7C]/80 border-[#0AAB7C]/60 text-white ",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);


const iconMap = {
    warning : AlertTriangle,
    success: CheckCircle,
}

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const Banner = ({variant, label}:BannerProps) => {
    const Icon = iconMap[variant || "warning"];
  return (
    <div className={`md:text-sm text-xs ${cn(bannerVariants({variant}))}`}>
      <Icon className="h-4 w-4 md:block hidden mr-2" />
      {label}
    </div>
  )
}

export default Banner
