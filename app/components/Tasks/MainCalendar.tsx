import moment from "moment-jalaali";

// Load Persian locale with Persian digits
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

// Get all weekdays starting from Saturday (Iranian convention)
const weekdays: string[] = [];
for (let i = 0; i < 7; i++) {
  weekdays.push(moment().weekday(i).format("dddd"));
}
const MainCalendar = () => {
  const n = 42; // specific number
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  console.log(year);
  console.log(month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  console.log(firstDayOfMonth);
  return (
    <>
      <div className="grid grid-cols-7 ">
        {weekdays?.map((day: string) => (
          <div
            className="text-center border-solid border-[2px] border-l-0 last:border-l-[2px] border-gray-400"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center  ">
        {arr?.map((i) => (
          <div
            className={`grid place-items-center border-solid border-b-[2px] border-r-[2px] border-gray-400 [aspect-ratio:3/2] ${
              i % 7 ? "" : "border-l-[2px]"
            }`}
            key={i}
          >
            <div>{i}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainCalendar;
