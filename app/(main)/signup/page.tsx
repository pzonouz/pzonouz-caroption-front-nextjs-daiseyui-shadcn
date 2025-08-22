"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signupAction } from "../../lib/actions";
import { SignResponse } from "../../lib/schemas";

export default function SignUp() {
  const [messages, signupFormAction, ispending] = useActionState(
    signupAction,
    null,
  );
  const msg = messages as SignResponse | null;
  const router = useRouter();
  useEffect(() => {
    if (msg?.success) {
      router.push("/profile");
    }
  }, [msg, router]);
  return (
    <form
      className="w-1/2 mx-auto mt-10 flex flex-col justify-center items-start gap-3 "
      action={signupFormAction}
    >
      <label className=" text-3xl my-3 text-center w-full">ثبت نام</label>
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
          type="password"
          className={classNames("input input-md", {
            "input-error":
              msg?.errors?.password?.length ||
              msg?.errors?.confirmPassword?.length,
          })}
        />
        {msg?.errors?.password && (
          <p className="text-sm text-red-500">{msg?.errors?.password?.[0]}</p>
        )}
      </label>
      <label className="floating-label w-full">
        <span>تایید پسورد</span>
        <input
          name="password2"
          className={classNames("input input-md", {
            "input-error":
              msg?.errors?.password2?.length ||
              msg?.errors?.confirmPassword?.length,
          })}
          placeholder="*******"
          type="password"
        />
        {msg?.errors?.password2 && (
          <p className="text-sm text-red-500">{msg?.errors?.password2?.[0]}</p>
        )}
      </label>
      {msg?.errors?.confirmPassword?.length && (
        <p className="text-sm text-red-500 -mt-2">
          {msg?.errors.confirmPassword?.[0]}
        </p>
      )}
      {msg?.error && (
        <p className="text-sm text-red-500">
          {msg?.error ? "ایمیل قبلا ثبت شده است" : null}
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
