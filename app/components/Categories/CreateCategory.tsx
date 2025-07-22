"use client";

import classNames from "classnames";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LeveledCategoryList from "./LeveledCategoryList";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categorySchema } from "@/app/lib/schemas";
import { useCreateCategoryMutation } from "@/app/lib/features/api";
import ImageUpload from "../Utils/ImageUpload";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { translateRTKFetchBaseQueryErrors } from "@/app/lib/utils";
export function CreateCategory({ categories }: { categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [parent, setParent] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createCategoryAction, { isLoading: createCategoryIsLoading }] =
    useCreateCategoryMutation();

  useEffect(() => {
    setValue("image_url", imageUrl.toString());
  }, [imageUrl]);
  return (
    <div
      className="w-full flex flex-col items-center justify-center mx-auto relative"
      dir="rtl"
    >
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
          <label className=" text-3xl text-center w-5/6">ایجاد دسته بندی</label>
          <form
            className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-5/6 mb-4"
            dir="rtl"
            onSubmit={handleSubmit((data) => {
              createCategoryAction(data)
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
          >
            <input
              type="text"
              hidden
              value={imageUrl}
              {...register("image_url")}
              readOnly
            />
            <input
              type="text"
              hidden
              value={parent!}
              {...register("parent")}
              readOnly
            />
            <label className="floating-label w-full">
              <span>نام دسته بندی</span>
              <input
                {...register("name")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.name,
                })}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
              )}
            </label>
            <LeveledCategoryList
              categories={categories}
              value={parent}
              onChange={setParent}
            />
            <label className="floating-label w-full">
              <span>توضیح</span>
              <input
                {...register("description")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.description?.message,
                })}
              />
              {errors?.description && (
                <p className="text-sm text-red-500">
                  {errors?.description?.message}
                </p>
              )}
            </label>
            <label className="floating-label w-full">
              <span>اولویت</span>
              <input
                {...register("order")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.order?.message,
                })}
              />
              {errors?.order && (
                <p className="text-sm text-red-500">{errors?.order?.message}</p>
              )}
            </label>
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
              {createCategoryIsLoading && (
                <span className="loading loading-spinner"></span>
              )}
              {!createCategoryIsLoading && <span>ثبت</span>}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
