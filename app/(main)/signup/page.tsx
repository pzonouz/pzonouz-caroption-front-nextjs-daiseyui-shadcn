"use client";

import { signupAction } from "@/app/lib/actions";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function SignUp() {
  const [messages, signupFormAction, ispending] = useActionState(
    signupAction,
    null,
  );
  const router = useRouter();
  useEffect(() => {
    if (messages?.success) {
      router.push("/profile");
    }
  }, [messages]);
  return (
    <form
      className="w-1/2 mx-auto mt-10 flex flex-col justify-center items-start gap-3 "
      action={signupFormAction}
    >
      <label className=" text-3xl my-3 text-center w-full">ثبت نام</label>
      <label className="floating-label w-full">
        <span>ایمیل</span>
        <input
          defaultValue={messages?.data?.email?.toString()}
          name="email"
          type="text"
          placeholder="mail@site.com"
          className={classNames("input input-md", {
            "input-error": messages?.errors?.email?.length,
          })}
        />
        {messages?.errors?.email && (
          <p className="text-sm text-red-500">{messages?.errors?.email?.[0]}</p>
        )}
      </label>

      <label className="floating-label w-full">
        <span>پسورد</span>
        <input
          name="password"
          type="password"
          className={classNames("input input-md", {
            "input-error":
              messages?.errors?.password?.length ||
              messages?.errors?.confirmPassword?.length,
          })}
        />
        {messages?.errors?.password && (
          <p className="text-sm text-red-500">
            {messages?.errors?.password?.[0]}
          </p>
        )}
      </label>
      <label className="floating-label w-full">
        <span>تایید پسورد</span>
        <input
          name="password2"
          className={classNames("input input-md", {
            "input-error":
              messages?.errors?.password2?.length ||
              messages?.errors?.confirmPassword?.length,
          })}
          placeholder="*******"
          type="password"
        />
        {messages?.errors?.password2 && (
          <p className="text-sm text-red-500">
            {messages?.errors?.password2?.[0]}
          </p>
        )}
      </label>
      {messages?.errors?.confirmPassword?.length && (
        <p className="text-sm text-red-500 -mt-2">
          {messages?.errors.confirmPassword?.[0]}
        </p>
      )}
      {messages?.error && (
        <p className="text-sm text-red-500">
          {messages?.error ? "ایمیل قبلا ثبت شده است" : null}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full">
        {ispending && <span className="loading loading-spinner"></span>}
        {!ispending && <span>ثبت</span>}
      </button>
      <div className="flex flex-row justify-between w-full -mt-2">
        <Link href={"/signin"} className="link link-primary text-sm">
          ورود
        </Link>
      </div>
    </form>
  );
}
