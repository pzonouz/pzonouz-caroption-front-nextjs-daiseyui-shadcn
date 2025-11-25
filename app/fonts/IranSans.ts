import localFont from "next/font/local";

const iransans = localFont({
  src: [
    { path: "./IRANSansX-Thin.woff2", weight: "100" },
    { path: "./IRANSansX-UltraLight.woff2", weight: "200" },
    { path: "./IRANSansX-Regular.woff2", weight: "400" },
    { path: "./IRANSansX-Medium.woff2", weight: "500" },
    { path: "./IRANSansX-DemiBold.woff2", weight: "600" },
    { path: "./IRANSansX-Bold.woff2", weight: "700" },
    { path: "./IRANSansX-ExtraBold.woff2", weight: "800" },
    { path: "./IRANSansX-Black.woff2", weight: "900" },
    { path: "./IRANSansX-Light.woff2", weight: "300" },
  ],
});

export default iransans;
