"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Editor from "../Utils/Tiptop";
import { toast } from "sonner";
import LeveledCategoryList from "../Categories/LeveledCategoryList";
import {
  formatStringToCommaSepratedNumber,
  replacePersianDigits,
  translateRTKFetchBaseQueryErrors,
} from "@/app/lib/utils";
import ImageUpload from "../Utils/ImageUpload";
import { useCreateProductMutation } from "@/app/lib/features/api";
import { useForm } from "react-hook-form";
import { Category, Product, productSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function CreateProduct({
  parentCategories,
}: {
  parentCategories: Category[];
}) {
  const [createProductAction, { isLoading: createProductIsLoading }] =
    useCreateProductMutation();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    setValue("description", html);
  }, [html]);
  useEffect(() => {
    setValue("image_url", imageUrl);
  }, [imageUrl]);
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Product>({ resolver: zodResolver(productSchema) });

  function handleChangePrice(e: any) {
    setValue(
      "price",
      formatStringToCommaSepratedNumber(replacePersianDigits(e.target.value)),
    );
  }
  function handleChangeCount(e: any) {
    setValue(
      "count",
      formatStringToCommaSepratedNumber(replacePersianDigits(e.target.value)),
    );
  }
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
          <label className=" text-3xl text-center w-5/6">ایجاد کالا</label>
          <form
            onSubmit={handleSubmit((data) => {
              data["price"] = data["price"].replaceAll(",", "");
              data["count"] = data["count"].replaceAll(",", "");
              createProductAction(data)
                .unwrap()
                .then(() => {
                  toast("با موفقیت ایجاد شد", {
                    position: "top-center",
                    duration: 3000,
                    style: {
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: "iransans",
                    },
                  });
                  reset();
                  setHtml("");
                  setImageUrl("");
                })
                .catch((err: FetchBaseQueryError) => {
                  console.log(err);
                  setError(translateRTKFetchBaseQueryErrors(err));
                });
            })}
            className="mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-5/6 mb-4"
            dir="rtl"
          >
            <input type="text" hidden {...register("image_url")} readOnly />
            <input type="text" hidden {...register("category")} readOnly />
            <input type="text" hidden {...register("description")} readOnly />
            <label className="floating-label w-full">
              <span>نام کالا</span>
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

            <label className="floating-label w-full">
              <span>زیر توضیح</span>
              <input
                {...register("info")}
                type="text"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.info,
                })}
              />
              {errors?.info && (
                <p className="text-sm text-red-500">{errors?.info?.message}</p>
              )}
            </label>
            <LeveledCategoryList
              categories={parentCategories}
              value={getValues("category")}
              onChange={(value) => {
                if (!value) return;
                setValue("category", value);
              }}
            />
            <label className="floating-label w-full">
              <span>قیمت</span>
              <input
                lang="en"
                dir="rtl"
                {...register("price", { onChange: handleChangePrice })}
                className={classNames("input input-md w-full", {
                  "input-error": errors?.price,
                })}
                type="text"
              />
              {errors?.price && (
                <p className="text-sm text-red-500">{errors?.price?.message}</p>
              )}
            </label>
            <label className="floating-label w-full">
              <span>تعداد</span>
              <input
                {...register("count", { onChange: handleChangeCount })}
                lang="en"
                dir="ltr"
                className={classNames("input input-md w-full", {
                  "input-error": errors?.count,
                })}
                type="text"
              />
              {errors?.count && (
                <p className="text-sm text-red-500">{errors?.count?.message}</p>
              )}
            </label>

            <div className="col-span-2">
              <Editor state={html} setState={setHtml} />
            </div>
            {errors?.description && (
              <p className="text-sm text-red-500">
                {errors?.description?.message}
              </p>
            )}
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
            {error && (
              <p className="text-sm text-red-500">
                {error == "Bad Request" ? "نام کالا تکراری است" : null}
              </p>
            )}
            <button type="submit" className="btn btn-primary w-full">
              {createProductIsLoading && (
                <span className="loading loading-spinner"></span>
              )}
              {!createProductIsLoading && <span>ثبت</span>}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
