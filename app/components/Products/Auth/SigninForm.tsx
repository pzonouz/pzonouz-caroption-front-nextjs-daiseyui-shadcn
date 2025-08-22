"use client";
import { signinAction } from "@/app/lib/actions";
import { SignResponse } from "@/app/lib/schemas";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || "/profile";
  const router = useRouter();
  const [messages, signinFormAction, ispending] = useActionState(
    signinAction,
    null,
  );
  const msg = messages as SignResponse | null;

  useEffect(() => {
    if (msg?.success) {
      router.push(callback);
    }
  }, [msg, router, callback]);

  return (
    <form
      className="w-1/2 mx-auto mt-10 flex flex-col justify-center items-start gap-3 "
      action={signinFormAction}
    >
      <input hidden name="callback" defaultValue={callback} />
      <label className=" text-3xl my-3 text-center w-full">ورود</label>
      <label className="floating-label w-full">
        <span>ایمیل</span>
        <input
          defaultValue={msg?.data?.email?.toString()}
          name="email"
          type="text"
          placeholder="mail@site.com"
          className={classNames("input input-md", {
            "input-error": msg?.errors?.email?.length,
          })}
        />
        {msg?.errors?.email && (
          <p className="text-sm text-red-500">{msg?.errors?.email?.[0]}</p>
        )}
      </label>
      <label className="floating-label w-full">
        <span>پسورد</span>
        <input
          name="password"
          placeholder="*******"
          type="password"
          className={classNames("input input-md", {
            "input-error": msg?.errors?.password?.length,
          })}
        />
        {msg?.errors?.password && (
          <p className="text-sm text-red-500">{msg?.errors?.password?.[0]}</p>
        )}
      </label>
      {msg?.error && <p className="text-sm text-red-500">{msg?.error}</p>}

      <button type="submit" className="btn btn-primary w-full ">
        {ispending && <span className="loading loading-spinner"></span>}
        {!ispending && <span> ورود</span>}
      </button>
      <div className="flex flex-row justify-between w-full -mt-2">
        <Link href={"/signup"} className="link link-primary text-sm">
          ثبت نام
        </Link>
        <a className="link link-primary text-sm">فراموشی کلمه عبور</a>
      </div>
    </form>
  );
}
