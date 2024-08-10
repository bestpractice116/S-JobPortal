"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AppliedFiltersProps {
  value: string;
  label: string;
  checked?: boolean;
}

interface CheckBoxContainerProps {
  data: AppliedFiltersProps[];
  onChange: (dataValue: string[]) => void;
}

const CheckBoxContainer = ({ data, onChange }: CheckBoxContainerProps) => {
  const [filter, setFilter] = useState<AppliedFiltersProps[]>(data);

  useEffect(() => {
    setFilter(data);
  }, [data]);

  const handleCheckedChange = (applied: AppliedFiltersProps) => {
    const updatedFilter = filter.map((item) => {
      if (item.value === applied.value) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setFilter(updatedFilter);

    onChange(
      updatedFilter.filter((item) => item.checked).map((item) => item.value)
    );
  };

  return (
    <div className='flex w-full flex-col items-start justify-start gap-2'>
      {filter.map((item) => (
        <div
          key={item.value}
          className={cn(
            "flex items-center gap-2",
            item.checked ? "text-[#0AAB7C]" : "text-muted-foreground"
          )}
        >
          <Checkbox
            id={item.value}
            checked={item.checked || false}
            onCheckedChange={() => handleCheckedChange(item)}
            className='data-[state=checked]:bg-[#0AAB7C]/85 data-[state=checked]:border-[#0AAB7C]'
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxContainer;
