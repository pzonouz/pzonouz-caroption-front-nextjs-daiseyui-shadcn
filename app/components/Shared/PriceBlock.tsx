import { formatStringToCommaSeparatedNumber } from "@/app/lib/utils";

const PriceBlock = ({ price }: { price: string | number }) => {
  return (
    <div className="flex gap-2 text-emerald-500">
      <div>{formatStringToCommaSeparatedNumber(price)}</div>
      <div>تومان</div>
    </div>
  );
};

export default PriceBlock;
