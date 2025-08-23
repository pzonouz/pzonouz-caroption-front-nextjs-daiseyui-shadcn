"use client";
import { Suspense } from "react";
import SignInForm from "@/app/components/Products/Auth/SigninForm";
import Loading from "@/app/components/Shared/Loading";

export default function SignIn() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInForm />
    </Suspense>
  );
}
