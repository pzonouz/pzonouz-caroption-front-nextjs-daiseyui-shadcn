"use client";

import classNames from "classnames";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePersonMutation } from "@/app/lib/features/api";
import {
  replacePersianDigits,
  translateRTKFetchBaseQueryErrors,
} from "@/app/lib/utils";
import { Person, personSchema } from "@/app/lib/schemas";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function CreatePerson() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Person>({
    resolver: zodResolver(personSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createPersonAction, { isLoading: createPersonIsLoading }] =
    useCreatePersonMutation();
  const phoneValue = watch("phone", "");
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = replacePersianDigits(e.target.value);
    setValue("phone", replaced, { shouldValidate: true, shouldDirty: true });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto relative">
      <div
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          setOpen(true);
        }}
        className="w-10 self-start mb-4 cursor-pointer "
      >
        {!open ? (
          <Plus className=" hover:bg-gray-300 hover:text-white rounded-2xl mr-4" />
        ) : (
          <Minus className="hover:bg-gray-300 hover:text-white rounded-2xl mr-4" />
        )}
      </div>
      {open && (
        <>
          <label className=" text-3xl text-center w-5/6">ایجاد طرف حساب</label>
          <form
            onSubmit={handleSubmit((data) => {
              createPersonAction(data)
                .unwrap()
                .then(() => {
                  setError("");
                  reset();
                  toast("با موفقیت ایجاد شد", {
                    position: "top-center",
                    duration: 3000,
                    style: {
                      backgroundColor: "green",
                      color: "white",
                      padding: "1rem",
                      fontFamily: "IranSans",
                      fontWeight: "bold",
                    },
                  });
                })
                .catch((err: FetchBaseQueryError) => {
                  setError(translateRTKFetchBaseQueryErrors(err));
                });
            })}
            className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-5/6 mb-4"
          >
            <label className="floating-label w-full">
              <span>نام</span>
              <input
                {...register("firstname")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.firstname,
                })}
              />
              {errors?.firstname && (
                <p className="text-sm text-red-500">
                  {errors?.firstname?.message}
                </p>
              )}
            </label>

            <label className="floating-label w-full">
              <span>نام خانوادگی</span>
              <input
                {...register("lastname")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.lastname,
                })}
              />
              {errors?.lastname && (
                <p className="text-sm text-red-500">
                  {errors?.lastname?.message}
                </p>
              )}
            </label>
            <label className="floating-label w-full">
              <span>شماره تماس</span>
              <input
                {...register("phone")}
                value={phoneValue}
                onChange={handlePhoneChange}
                lang="en"
                dir="ltr"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.phone,
                })}
                type="text"
              />
              {errors?.phone && (
                <p className="text-sm text-red-500">{errors?.phone?.message}</p>
              )}
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
              {createPersonIsLoading && (
                <span className="loading loading-spinner"></span>
              )}
              {!createPersonIsLoading && <span>ثبت</span>}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
