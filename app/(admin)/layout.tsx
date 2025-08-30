import { ReactNode } from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import CRMMenu from "../components/Navigations/CRMMenu";
import { Toaster } from "sonner";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/signin?callback=crm");
  }
  //@ts-ignore
  if (session?.user?.isAdmin) {
    return (
      <div className="">
        <Toaster />
        <CRMMenu user={session?.user} />
        {children}
      </div>
    );
  } else {
    return (
      <>
        <CRMMenu user={session?.user} />
        <div className="text-center py-24 text-2xl">غیر مجاز</div>
      </>
    );
  }
};

export default layout;
