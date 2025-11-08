"use client";

import { changePasswordAction } from "@/app/lib/actions";
import { ChangePasswordResponse } from "@/app/lib/schemas";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ChagePassword({ token }: { token: string }) {
  const [messages, changePasswordFormAction, ispending] = useActionState(
    changePasswordAction,
    null,
  );
  const msg = messages as ChangePasswordResponse | null;
  const router = useRouter();
  useEffect(() => {
    if (msg?.success) {
      SuccessToast();
      router.push("/signin");
      return;
    }
    if (msg?.error == "401") {
      ErrorToast("توکن صحیح نیست");
      return;
    }
    if (msg?.error) {
      ErrorToast("ایراد سیستمی");
    }
  }, [msg]);
  return (
    <form
      className="w-1/2 mx-auto flex flex-col justify-start items-center gap-3 h-screen"
      action={changePasswordFormAction}
    >
      <label className=" text-3xl my-3 text-center w-full">تغییر پسورد</label>
      <input hidden defaultValue={token} name="token" />

      <label className="floating-label w-full">
        <span>پسورد</span>
        <input
          name="password"
          type="password"
          className={classNames("input input-md w-full", {
            "input-error": msg?.errors?.password?.length,
          })}
        />
        {msg?.errors?.password && (
          <p className="text-sm text-red-500">{msg?.errors?.password?.[0]}</p>
        )}
      </label>
      <label className="floating-label w-full">
        <span>تایید پسورد</span>
        <input
          name="confirmPassword"
          className={classNames("input input-md w-full", {
            "input-error": msg?.errors?.confirmPassword?.length,
          })}
          type="password"
        />
        {msg?.errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {msg?.errors?.confirmPassword?.[0]}
          </p>
        )}
      </label>

      <button type="submit" className="btn btn-primary w-full">
        {ispending && <span className="loading loading-spinner"></span>}
        {!ispending && <span>ثبت</span>}
      </button>
    </form>
  );
}
