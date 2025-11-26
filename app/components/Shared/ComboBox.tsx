"use client";

import * as React from "react";
import { Check } from "lucide-react";

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
import { Portal } from "@radix-ui/react-popover";

interface Option {
  label: string;
  value: string;
}

export function Combobox<T extends { id?: string | number; name: string }>({
  value,
  setValue,
  array,
  title,
  disabled = false,
  className = "",
}: {
  value: string;
  setValue: Function;
  array: T[];
  title: string;
  disabled?: boolean;
  className?: string;
}) {
  const options = React.useMemo<Option[]>(() => {
    return array?.map((item) => ({
      value: item?.id?.toString() ?? "",
      label: item?.name,
    }));
  }, [array]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className={`z-[10000] flex flex-row gap-4 items-center ${className}`}>
      <p className=" text-black whitespace-nowrap">{title}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            className="w-auto min-w-max whitespace-nowrap text-start flex flex-row bg-white justify-center items-center !border-gray-800 !border  p-2"
          >
            {value
              ? options.find((item) => item.value === value)?.label
              : "انتخاب کنید"}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent className="w-full p-0 bg-white z-[100000]">
            <Command>
              <CommandInput placeholder="جستجو" className="h-9" />
              <CommandList>
                <CommandEmpty>پیدا نشد</CommandEmpty>
                <CommandGroup>
                  {options?.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={(currentValue) => {
                        const selected = options.find(
                          (opt) => opt.label === currentValue
                        );
                        if (selected?.value === value) {
                          // already selected → unselect
                          setValue("");
                        } else {
                          setValue(selected?.value ?? "");
                        }
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  );
}
