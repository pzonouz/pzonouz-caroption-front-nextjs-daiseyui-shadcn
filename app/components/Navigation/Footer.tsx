import { FlyingButton } from "./FlyingButton";

const Footer = () => {
  return (
    <>
      {/* <div className="text-xs text-gray-500"> */}
      {/*   {article?.generated ? article?.main_article?.info : article?.info} */}
      {/* </div> */}
      {/* <div className="flex flex-row gap-1 text-emerald-500"> */}
      {/*   قیمت: تماس بگیرید */}
      {/* </div> */}
      <div
        className="text-white bg-red-600  p-3 leading-8 sticky bottom-0 z-[1000]"
        id="address"
      >
        <FlyingButton />
        <div className="flex items-center justify-between ">
          <div>
            اردبیل. میدان جهاد به سمت علی سرباز. نرسیده به حمام جام جم.کارآپشن
          </div>
          <div className="flex flex-col md:flex-row md:gap-6 text-left">
            <a href="tel:09196631457">09196631457</a>
            <a href="tel:04533814065">04533814065</a>
          </div>
        </div>
      </div>
    </>
  );
};
export { Footer };
