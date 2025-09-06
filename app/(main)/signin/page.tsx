"use client";
import { Suspense } from "react";
import Loading from "@/app/components/Shared/Loading";
import SignInForm from "@/app/components/Auth/SigninForm";

export default function SignIn() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInForm />
    </Suspense>
  );
}
