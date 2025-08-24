"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

export function Combobox<T extends { id: string | number; name: string }>({
  value,
  setValue,
  array,
}: {
  value: string;
  setValue: Function;
  array: T[];
}) {
  const options = React.useMemo<Option[]>(() => {
    return array.map((item) => ({
      value: item?.id?.toString() ?? "",
      label: item?.name,
    }));
  }, [array]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className="z-[10000]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-1/2 text-start flex flex-row justify-center items-center"
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
                  {options.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0",
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
