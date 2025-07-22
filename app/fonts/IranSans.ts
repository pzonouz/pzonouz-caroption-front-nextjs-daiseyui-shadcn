import localFont from "next/font/local";

const iransans = localFont({
  src: [
    {
      path: "./IRANSansXFaNum-Thin.woff2",
      weight: "100",
    },
    { path: "./IRANSansXFaNum-UltraLight.woff2", weight: "200" },
    { path: "./IRANSansXFaNum-Light.woff2", weight: "300" },
    { path: "./IRANSansXFaNum-Regular.woff2", weight: "400" },
    { path: "./IRANSansXFaNum-Medium.woff2", weight: "500" },
    { path: "./IRANSansXFaNum-DemiBold.woff2", weight: "600" },
    { path: "./IRANSansXFaNum-Bold.woff2", weight: "700" },
    { path: "./IRANSansXFaNum-ExtraBold.woff2", weight: "800" },
    { path: "./IRANSansXFaNum-Black.woff2", weight: "900" },
  ],
});

export default iransans;
