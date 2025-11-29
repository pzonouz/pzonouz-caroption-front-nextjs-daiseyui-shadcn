"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signupAction } from "../../lib/actions";
import { SignResponse } from "../../lib/schemas";

export default function SignUp() {
  const [messages, signupFormAction, isPending] = useActionState(
    signupAction,
    null
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
      className="max-w-md min-w-xs mx-auto mt-10 flex flex-col items-center gap-3 mb-20 p-4"
      action={signupFormAction}
    >
      <label className="text-3xl my-3 text-center w-full">ثبت نام</label>

      {/* Email */}
      <label className="floating-label w-full max-w-md">
        <span>ایمیل</span>
        <input
          defaultValue={msg?.data?.email?.toString()}
          name="email"
          type="text"
          placeholder="mail@site.com"
          className={classNames("input input-md w-full", {
            "input-error": msg?.errors?.email?.length,
          })}
        />
        {msg?.errors?.email && (
          <p className="text-sm text-red-500">{msg?.errors?.email?.[0]}</p>
        )}
      </label>

      {/* Password */}
      <label className="floating-label w-full max-w-md">
        <span>پسورد</span>
        <input
          name="password"
          type="password"
          placeholder="*******"
          className={classNames("input input-md w-full", {
            "input-error":
              msg?.errors?.password?.length ||
              msg?.errors?.confirmPassword?.length,
          })}
        />
        {msg?.errors?.password && (
          <p className="text-sm text-red-500">{msg?.errors?.password?.[0]}</p>
        )}
      </label>

      {/* Confirm Password */}
      <label className="floating-label w-full max-w-md">
        <span>تایید پسورد</span>
        <input
          name="password2"
          type="password"
          placeholder="*******"
          className={classNames("input input-md w-full", {
            "input-error":
              msg?.errors?.password2?.length ||
              msg?.errors?.confirmPassword?.length,
          })}
        />
        {msg?.errors?.password2 && (
          <p className="text-sm text-red-500">{msg?.errors?.password2?.[0]}</p>
        )}
      </label>

      {/* Confirm Password Error */}
      {msg?.errors?.confirmPassword?.length && (
        <p className="text-sm text-red-500 -mt-2">
          {msg?.errors.confirmPassword?.[0]}
        </p>
      )}

      {/* General Error */}
      {msg?.error && (
        <p className="text-sm text-red-500">
          {msg?.error ? "ایمیل قبلا ثبت شده است" : null}
        </p>
      )}

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full max-w-md">
        {isPending && <span className="loading loading-spinner"></span>}
        {!isPending && <span>ثبت</span>}
      </button>

      {/* Link */}
      <div className="flex flex-row justify-between w-full max-w-md -mt-2">
        <Link href={"/signin"} className="link link-primary text-sm">
          ورود
        </Link>
      </div>
    </form>
  );
}
