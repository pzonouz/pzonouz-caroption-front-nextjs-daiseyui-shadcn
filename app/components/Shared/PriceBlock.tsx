const PriceBlock = ({ price }: { price: string | number }) => {
  return (
    <div className="flex gap-2 text-emerald-500">
      برای استعلام قیمت تماس بگیرید
      {/* <div>{formatStringToCommaSeparatedNumber(price)}</div> */}
      {/* <div>تومان</div> */}
    </div>
  );
};

export default PriceBlock;
