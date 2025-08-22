"use client";

import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import DateObject from "react-date-object";

export function PersianDatePicker() {
  const [date, setDate] = useState<DateObject | null | undefined>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {date ? date.format("YYYY/MM/DD") : "تاریخ را انتخاب کنید"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          value={date}
          onChange={setDate}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          style={{
            backgroundColor: "white",
            border: "none",
            boxShadow: "none",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
