"use server";
import { signOut } from "@/app/auth";

const page = async () => {
  await signOut();

  return <div></div>;
};

export default page;
