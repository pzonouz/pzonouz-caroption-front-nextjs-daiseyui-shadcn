"use client";

import { useEditCategoryMutation } from "@/app/lib/features/api";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LeveledCategoryList from "./LeveledCategoryList";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categorySchema } from "@/app/lib/schemas";
import { translateRTKFetchBaseQueryErrors } from "@/app/lib/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ImageUpload from "../Utils/ImageUpload";

const EditCategoryModal = ({
  category,
  setCategory,
  parentCategories,
}: {
  category: Category;
  setCategory: Function;
  parentCategories: Category[];
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(categorySchema) });
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    category?.image_url,
  );
  const [parent, setParent] = useState<string | null>(category?.parent ?? "");
  const [editCategoryAction, { isLoading: editCategeoryIsLoading }] =
    useEditCategoryMutation();
  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category]);

  useEffect(() => {
    if (!parent) {
      setValue("parent", null);
    }
    setValue("parent", parent);
  }, [parent]);
  useEffect(() => {
    if (imageUrl) setValue("image_url", imageUrl.toString());
  }, [imageUrl]);

  if (!category || !parentCategories) return null;
  return (
    category && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full">
          <div className="modal-action ">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setCategory(null);
              }}
            />
            <form
              onSubmit={handleSubmit((data) => {
                editCategoryAction(data)
                  .unwrap()
                  .then(() => {
                    setError("");
                    toast("با موفقیت انجام شد", {
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
                    setCategory(null);
                  })
                  .catch((err: FetchBaseQueryError) => {
                    setError(translateRTKFetchBaseQueryErrors(err));
                  });
              })}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-4"
            >
              <input {...register("id")} hidden type="text" />
              <input {...register("parent")} hidden readOnly type="text" />

              <input {...register("image_url")} type="text" hidden readOnly />
              <label className="floating-label w-full">
                <span>نام دسته بندی</span>
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  className={classNames("input input-md w-full", {
                    "input-error": errors?.name,
                  })}
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">
                    {errors?.name?.message?.toString()}
                  </p>
                )}
              </label>
              <LeveledCategoryList
                categories={parentCategories ? parentCategories : []}
                value={parent}
                onChange={setParent}
              />
              <label className="floating-label w-full">
                <span>توضیح</span>
                <input
                  {...register("description")}
                  type="text"
                  className={classNames("input input-md w-full", {
                    "input-error": errors?.description,
                  })}
                />
                {errors?.description && (
                  <p className="text-sm text-red-500">
                    {errors?.description?.message?.toString()}
                  </p>
                )}
              </label>

              <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
                  <p className="text-sm text-red-500">
                    {errors?.order?.message}
                  </p>
                )}
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" className="btn btn-primary w-full">
                {editCategeoryIsLoading && (
                  <span className="loading loading-spinner"></span>
                )}
                {!editCategeoryIsLoading && <span>ثبت</span>}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditCategoryModal;
