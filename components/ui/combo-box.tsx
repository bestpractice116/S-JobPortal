"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListItem } from "./list-item";

interface ComboBoxProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
  heading: string;
}

const ComboBox = ({ options, value, onChange, heading }: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filtered, setFiltered] = React.useState<
    { label: string; value: string }[]
  >([]);

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
    setFiltered(
      options.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 md:min-w-96'>
        <Command>
          <div className='w-full px-2 py-2 flex items-center border rounded-md'>
            <Search className='mr-2 h-4 w-4 min-w-4' />
            <input
              type='text'
              placeholder='Search Catogory'
              onChange={handleSearchTerm}
              className='flex-1 w-full outline-none text-sm py-1'
            />
          </div>
          <CommandList>
            <CommandGroup heading={heading}>
              {searchTerm === "" ? (
                options.map((option) => (
                  <ListItem
                    key={option.value}
                    category={option}
                    onSelect={() => {
                      onChange(option.value === value ? "" : option.value);
                      setOpen(false);
                    }}
                    isChecked={option?.value === value}
                  />
                ))
              ) : filtered.length > 0 ? (
                filtered.map((option) => (
                  <ListItem
                    key={option.value}
                    category={option}
                    onSelect={() => {
                      onChange(option.value === value ? "" : option.value);
                      setOpen(false);
                    }}
                    isChecked={option?.value === value}
                  />
                ))
              ) : (
                <CommandEmpty>No Category found</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
