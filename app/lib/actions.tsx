"use server";

import { z } from "zod/v4";
import { signIn, signOut } from "../auth";
import { ActionResult, userSchema } from "./schemas";

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
        password: data.get("password"),
      });
      return { success: true, error: "", errors: {}, data: {} };
    } catch (error) {
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
  if (result.success) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
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

export const changePasswordAction = async (
  _prevState: unknown,
  data: FormData,
) => {
  const rawData = Object.fromEntries(data);
  const userSchema = z
    .object({
      password: z.string().min(1, "پسورد را وارد کنید"),
      confirmPassword: z.string().min(1, "پسورد را وارد کنید"),
      token: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "پسوردها مطابقت ندارند",
    });
  const result = userSchema.safeParse(rawData);
  if (result.success) {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/auth/reset_password_callback/${result?.data?.token}`,
        {
          method: "POST",
          body: JSON.stringify({
            password: result.data.password,
          }),
        },
      );
      if (!res.ok) {
        throw new Error(res.status?.toString());
      }
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
  if (!result.success) {
    return {
      success: false,
      error: "",
      errors: result.error.flatten().fieldErrors,
    };
  }
};
export const PasswordResetRequestAction = async (
  _prevState: unknown,
  data: FormData,
) => {
  const rawData = Object.fromEntries(data);
  const userSchema = z.object({
    email: z.string().min(1, "ایمیل را وارد کنید"),
  });
  const result = userSchema.safeParse(rawData);
  if (result.success) {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/auth/reset_password/${result?.data?.email}`,
        { cache: "no-cache" },
      );
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
  if (!result.success) {
    return {
      success: false,
      error: "",
      errors: result.error.flatten().fieldErrors,
    };
  }
};
