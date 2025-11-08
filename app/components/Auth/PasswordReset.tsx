"use client";

import { PasswordResetRequestAction } from "@/app/lib/actions";
import { PasswordChangeRequestResponse } from "@/app/lib/schemas";
import { SuccessToast } from "@/app/lib/Toasts";
import classNames from "classnames";
import { useActionState, useEffect } from "react";

export default function PasswordReset() {
  const [messages, PasswordResetFormAction, ispending] = useActionState(
    PasswordResetRequestAction,
    null,
  );
  const msg = messages as PasswordChangeRequestResponse | null;
  useEffect(() => {
    if (msg?.success) {
      SuccessToast();
    }
  }, [msg]);

  return (
    <form
      className="w-1/2 mt-10 mx-auto flex flex-col justify-center items-start gap-3 "
      action={PasswordResetFormAction}
    >
      <label className=" text-3xl my-3 text-center w-full">بازیابی پسورد</label>
      <label className="floating-label w-full">
        <span>ایمیل</span>
        <input
          defaultValue={msg?.data?.email?.toString()}
          name="email"
          type="text"
          placeholder="ایمیل خود را وارد کنید"
          className={classNames("input input-md w-full", {
            "input-error": msg?.errors?.email?.length,
          })}
        />
        {msg?.errors?.email && (
          <p className="text-sm text-red-500">{msg?.errors?.email?.[0]}</p>
        )}
      </label>
      {msg?.error && <p className="text-sm text-red-500">{msg?.error}</p>}

      <button type="submit" className="btn btn-primary w-full ">
        {ispending && <span className="loading loading-spinner"></span>}
        {!ispending && <span>ارسال</span>}
      </button>
      <div className="flex flex-row justify-between w-full -mt-2"></div>
    </form>
  );
}
