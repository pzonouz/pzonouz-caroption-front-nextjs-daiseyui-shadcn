"use server";

import { z } from "zod/v4";
import { signIn, signOut } from "../auth";
import { ActionResult, userSchema } from "./schemas";
import { headers } from "next/headers";
import { getBackendUrl } from "./utils";
const h = await headers();
const backendUrl = await getBackendUrl(h);

export const signinAction = async (
  _prevState: unknown,
  data: FormData,
): Promise<ActionResult> => {
  const rawData = Object.fromEntries(data);
  const result = userSchema.safeParse(rawData);
  if (result?.success) {
    try {
      await signIn("credentials", {
        redirect: false,
        email: data.get("email"),
        username: data.get("email"),
        password: data.get("password"),
      });
      return { success: true, error: "", errors: {}, data: {} };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: "نام کابری و پسورد مطابقت ندارد",
        errors: null,
        data: rawData,
      };
    }
  }
  if (!result.success)
    return {
      success: false,
      error: "",
      errors: result.error.flatten().fieldErrors,
      data: { email: rawData?.email, password: rawData?.password },
    };
};

export const signupAction = async (_prevState: unknown, data: FormData) => {
  const rawData = Object.fromEntries(data);
  const userSchema = z
    .object({
      email: z.email("ساختار ایمیل درست نیست"),
      password: z.string().min(1, "پسورد را وارد کنید"),
      password2: z.string().min(1, "پسورد را وارد کنید"),
    })
    .refine((data) => data.password === data.password2, {
      path: ["confirmPassword"],
      message: "پسوردها مطابقت ندارند",
    });
  const result = userSchema.safeParse(rawData);
  data.set("username", data.get("email")!);
  data.set("re_password", data.get("password")!);
  if (result.success) {
    try {
      const res = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      signIn("credentials", {
        redirect: false,
        email: data.get("email"),
        username: data.get("email"),
        password: data.get("password"),
      });
      return {
        success: true,
        error: null,
        errors: {},
        data: {},
      };
    } catch (err) {
      return {
        success: false,
        error: err?.message,
        errors: {},
        data: {},
      };
    }
  }
  if (!result.success)
    return {
      success: false,
      error: "",
      errors: result.error.flatten().fieldErrors,
      data: { email: rawData?.email, password: rawData?.password },
    };
};

export const signOutAction = async () => {
  await signOut();
};
