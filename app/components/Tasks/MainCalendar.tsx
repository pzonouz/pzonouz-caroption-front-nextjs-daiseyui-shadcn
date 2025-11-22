"use client";

import { useState, useRef, useEffect } from "react";
import moment from "moment-jalaali";
import { Undo, Plus, Trash, Pencil } from "lucide-react";

// shadcn/ui components
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Persian date picker
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

type Event = {
  start: number; // 0–23
  end: number; // 0–23
  name: string;
  customer: string;
  color?: string; // Tailwind class like "bg-blue-500"
  day?: number; // Jalali day (1..daysInMonth)
};

const START_HOUR = 10;
const END_HOUR = 20;
const TOTAL_HOURS = END_HOUR - START_HOUR;

export default function MainCalendar() {
  const now = moment();

  // Month and selected date state
  const [jYear, setJYear] = useState(now.jYear());
  const [jMonth, setJMonth] = useState(now.jMonth());
  const [selectedDate, setSelectedDate] = useState({
    year: now.jYear(),
    month: now.jMonth(),
    day: now.jDate(),
  });

  // Scroll refs
  const todayRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  // Prevent scroll on first render
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip auto-scroll on initial load
    }
    selectedRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedDate]);

  // Month layout
  const daysInMonth = moment.jDaysInMonth(jYear, jMonth);
  const weekdayOfFirst = moment(
    `${jYear}/${jMonth + 1}/1`,
    "jYYYY/jM/jD"
  ).day();
  const firstOffset = (weekdayOfFirst + 1) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => i);

  // Events by day (sample + state)
  const [eventsByDay, setEventsByDay] = useState<Record<number, Event[]>>({
    5: [
      {
        start: 10,
        end: 20,
        name: "Conference",
        customer: "Acme Corp",
        color: "bg-blue-500",
        day: 5,
      },
      {
        start: 14,
        end: 18,
        name: "Workshop",
        customer: "John Doe",
        color: "bg-green-500",
        day: 5,
      },
      {
        start: 15,
        end: 17,
        name: "Call",
        customer: "Sara",
        color: "bg-red-500",
        day: 5,
      },
    ],
    12: [
      {
        start: 11,
        end: 13,
        name: "Meeting",
        customer: "Sara",
        color: "bg-purple-500",
        day: 12,
      },
      {
        start: 11,
        end: 12,
        name: "Quick Sync",
        customer: "Ali",
        color: "bg-yellow-500",
        day: 12,
      },
    ],
  });

  // Overlap handling (Google-like side-by-side)
  const assignColumns = (dayEvents: Event[]) => {
    const sorted = [...dayEvents].sort(
      (a, b) => a.start - b.start || a.end - b.end
    );
    const positioned: (Event & { col: number; totalCols: number })[] = [];
    const groups: Event[][] = [];

    // build groups
    for (const ev of sorted) {
      let placed = false;
      for (const g of groups) {
        const overlaps = g.some((e) => ev.start < e.end && ev.end > e.start);
        if (overlaps) {
          g.push(ev);
          placed = true;
          break;
        }
      }
      if (!placed) groups.push([ev]);
    }

    // assign columns per group
    for (const g of groups) {
      const positionedGroup: (Event & { col: number })[] = [];
      for (const ev of g) {
        let col = 0;
        while (true) {
          const conflict = positionedGroup.some(
            (other) =>
              other.col === col && ev.start < other.end && ev.end > other.start
          );
          if (!conflict) break;
          col++;
        }
        positionedGroup.push({ ...ev, col });
      }
      const totalCols = Math.max(...positionedGroup.map((e) => e.col)) + 1;
      for (const e of positionedGroup) positioned.push({ ...e, totalCols });
    }
    return positioned;
  };

  // Actions
  const goToday = () => {
    const t = moment();
    setJYear(t.jYear());
    setJMonth(t.jMonth());
    setSelectedDate({ year: t.jYear(), month: t.jMonth(), day: t.jDate() });
    setTimeout(() => {
      todayRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handlePickDate = (date: any) => {
    if (!date) return;
    const m = moment(`${date.year}/${date.month}/${date.day}`, "jYYYY/jM/jD");
    setJYear(m.jYear());
    setJMonth(m.jMonth());
    setSelectedDate({ year: m.jYear(), month: m.jMonth(), day: m.jDate() });
  };

  // Add Event dialog state (with Jalali day selection)
  const [newEvent, setNewEvent] = useState<Event>({
    start: 10,
    end: 11,
    name: "",
    customer: "",
    color: "bg-blue-500",
    day: selectedDate.day,
  });

  const addEvent = () => {
    const day = newEvent.day ?? selectedDate.day;
    if (!day || day < 1 || day > daysInMonth) return;
    if (newEvent.end <= newEvent.start) return;
    setEventsByDay((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { ...newEvent, day }],
    }));
    setNewEvent({
      start: 10,
      end: 11,
      name: "",
      customer: "",
      color: "bg-blue-500",
      day,
    });
  };

  // Edit/Delete state
  const [editingEvent, setEditingEvent] = useState<{
    day: number;
    index: number;
    event: Event;
  } | null>(null);

  const saveEditedEvent = () => {
    if (!editingEvent) return;
    const { day, index, event } = editingEvent;
    const targetDay = event.day ?? day;
    if (!targetDay || targetDay < 1 || targetDay > daysInMonth) return;

    setEventsByDay((prev) => {
      // remove from old day if moved
      const next = { ...prev };
      const fromList = [...(next[day] || [])];
      fromList.splice(index, 1);
      next[day] = fromList;

      // add to target day
      next[targetDay] = [
        ...(next[targetDay] || []),
        { ...event, day: targetDay },
      ];
      return next;
    });
    setEditingEvent(null);
  };

  const deleteEvent = () => {
    if (!editingEvent) return;
    const { day, index } = editingEvent;
    setEventsByDay((prev) => {
      const updated = [...(prev[day] || [])];
      updated.splice(index, 1);
      return { ...prev, [day]: updated };
    });
    setEditingEvent(null);
  };

  return (
    <TooltipProvider>
      <div>
        {/* Controls */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow z-50 p-2 flex gap-3 items-center">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={`${selectedDate.year}/${selectedDate.month + 1}/${
              selectedDate.day
            }`}
            onChange={handlePickDate}
          />
          <Button
            onClick={goToday}
            variant="outline"
            className="gap-1 bg-blue-50 hover:bg-blue-100"
          >
            <Undo size={16} /> امروز
          </Button>

          {/* Add Event Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="افزودن رویداد">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>افزودن رویداد</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  placeholder="نام رویداد"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                />
                <Input
                  placeholder="مشتری"
                  value={newEvent.customer}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, customer: e.target.value })
                  }
                />
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={`${jYear}/${jMonth + 1}/${newEvent.day}`}
                  onChange={(date: any) =>
                    setNewEvent({ ...newEvent, day: Number(date.day) })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="شروع (ساعت)"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: Number(e.target.value),
                      })
                    }
                  />
                  <Input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="پایان (ساعت)"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: Number(e.target.value) })
                    }
                  />
                </div>
                <Input
                  placeholder="رنگ (مثل bg-red-500)"
                  value={newEvent.color}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, color: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">انصراف</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={addEvent}>ذخیره</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Calendar grid */}
        <div className="pt-20">
          <div className="grid grid-cols-7 gap-px bg-gray-300 mt-4">
            {cells.map((i) => {
              const dayNumber = i - firstOffset;
              const isValidDay = dayNumber >= 0 && dayNumber < daysInMonth;
              const displayDay = isValidDay ? dayNumber + 1 : null;

              const isToday =
                isValidDay &&
                jYear === now.jYear() &&
                jMonth === now.jMonth() &&
                displayDay === now.jDate();

              const isSelected =
                isValidDay &&
                selectedDate.year === jYear &&
                selectedDate.month === jMonth &&
                selectedDate.day === displayDay;

              const dayEvents = isValidDay
                ? eventsByDay[displayDay!] || []
                : [];
              const positionedEvents = assignColumns(dayEvents);

              return (
                <div
                  key={i}
                  ref={isToday ? todayRef : isSelected ? selectedRef : null}
                  onClick={() =>
                    isValidDay &&
                    setSelectedDate({
                      year: jYear,
                      month: jMonth,
                      day: displayDay!,
                    })
                  }
                  className={`relative aspect-[4/5] p-2 flex flex-col cursor-pointer bg-white
                    ${!isValidDay ? "bg-gray-100 text-gray-400" : ""}
                    ${isToday ? "ring-2 ring-blue-600 bg-blue-50" : ""}
                    ${isSelected ? "ring-2 ring-green-600" : ""}
                  `}
                >
                  {/* Day header */}
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-bold">{displayDay ?? ""}</span>
                    {isToday && (
                      <span className="text-blue-700 font-medium">امروز</span>
                    )}
                  </div>

                  {/* Time grid (10 → 20) */}
                  <div className="relative flex-1 border-t border-gray-200 overflow-hidden">
                    {[10, 12, 14, 16, 18, 20].map((h) => (
                      <div
                        key={h}
                        className="absolute w-full border-t border-gray-200 text-[10px] text-gray-500"
                        style={{
                          top: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%`,
                        }}
                      >
                        <span className="absolute left-0 -translate-y-1 bg-white/80 px-1">
                          {h}:00
                        </span>
                      </div>
                    ))}

                    {/* Events (side-by-side overlaps, tooltips, edit/delete) */}
                    {positionedEvents.map((ev, idx) => {
                      if (ev.end <= START_HOUR || ev.start >= END_HOUR)
                        return null;

                      const top =
                        ((Math.max(ev.start, START_HOUR) - START_HOUR) /
                          TOTAL_HOURS) *
                        100;
                      const height =
                        ((Math.min(ev.end, END_HOUR) -
                          Math.max(ev.start, START_HOUR)) /
                          TOTAL_HOURS) *
                        100;
                      const width = 100 / ev.totalCols;
                      const left = ev.col * width;
                      const showInlineText = height > 12;

                      const originalIndex = dayEvents.findIndex(
                        (d) =>
                          d.start === ev.start &&
                          d.end === ev.end &&
                          d.name === ev.name &&
                          d.customer === ev.customer &&
                          d.color === ev.color
                      );

                      return (
                        <Tooltip key={`${displayDay}-${idx}`}>
                          <TooltipTrigger asChild>
                            <Card
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingEvent({
                                  day: displayDay!,
                                  index:
                                    originalIndex === -1 ? idx : originalIndex,
                                  event: { ...ev, day: displayDay! },
                                });
                              }}
                              className={`absolute rounded-sm shadow-sm text-xs text-white ${ev.color}`}
                              style={{
                                top: `${top}%`,
                                height: `${height}%`,
                                left: `${left}%`,
                                width: `${width}%`,
                                cursor: "pointer",
                              }}
                            >
                              {showInlineText && (
                                <div className="p-1 leading-tight">
                                  <div className="font-bold">
                                    {ev.start}:00–{ev.end}:00
                                  </div>
                                  <div className="whitespace-normal break-words">
                                    {ev.name}
                                  </div>
                                  <div className="italic whitespace-normal break-words">
                                    {ev.customer}
                                  </div>
                                </div>
                              )}
                            </Card>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 text-white rounded-md p-3 shadow-lg max-w-xs">
                            <div className="flex gap-2 items-start">
                              <div
                                className={`w-1.5 h-10 rounded ${
                                  ev.color ?? "bg-gray-500"
                                }`}
                              />
                              <div className="space-y-1">
                                <div className="font-bold">
                                  {ev.start}:00–{ev.end}:00
                                </div>
                                <div>{ev.name}</div>
                                <div className="italic text-gray-300">
                                  {ev.customer}
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingEvent({
                                        day: displayDay!,
                                        index:
                                          originalIndex === -1
                                            ? idx
                                            : originalIndex,
                                        event: { ...ev, day: displayDay! },
                                      });
                                    }}
                                  >
                                    <Pencil size={14} /> ویرایش
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingEvent({
                                        day: displayDay!,
                                        index:
                                          originalIndex === -1
                                            ? idx
                                            : originalIndex,
                                        event: { ...ev, day: displayDay! },
                                      });
                                      deleteEvent();
                                    }}
                                  >
                                    <Trash size={14} /> حذف
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit Event Dialog */}
        <Dialog
          open={!!editingEvent}
          onOpenChange={(open) => !open && setEditingEvent(null)}
        >
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>ویرایش رویداد</DialogTitle>
            </DialogHeader>
            {editingEvent && (
              <div className="space-y-3">
                <Input
                  placeholder="نام رویداد"
                  value={editingEvent.event.name}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      event: { ...editingEvent.event, name: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="مشتری"
                  value={editingEvent.event.customer}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      event: {
                        ...editingEvent.event,
                        customer: e.target.value,
                      },
                    })
                  }
                />
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={`${jYear}/${jMonth + 1}/${
                    editingEvent.event.day ?? editingEvent.day
                  }`}
                  onChange={(date: any) =>
                    setEditingEvent({
                      ...editingEvent,
                      event: { ...editingEvent.event, day: Number(date.day) },
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="شروع (ساعت)"
                    value={editingEvent.event.start}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        event: {
                          ...editingEvent.event,
                          start: Number(e.target.value),
                        },
                      })
                    }
                  />
                  <Input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="پایان (ساعت)"
                    value={editingEvent.event.end}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        event: {
                          ...editingEvent.event,
                          end: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <Input
                  placeholder="رنگ (مثل bg-red-500)"
                  value={editingEvent.event.color ?? ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      event: { ...editingEvent.event, color: e.target.value },
                    })
                  }
                />

                <div className="flex justify-between">
                  <Button
                    variant="destructive"
                    className="gap-1"
                    onClick={deleteEvent}
                  >
                    <Trash size={16} /> حذف
                  </Button>
                  <div className="flex gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">انصراف</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={saveEditedEvent} className="gap-1">
                        <Pencil size={16} /> ذخیره
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
