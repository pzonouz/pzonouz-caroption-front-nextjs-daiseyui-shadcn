import {
  useEditProductMutation,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";
import { Product, productSchema } from "@/app/lib/schemas";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import ImageUpload from "../Utils/ImageUpload";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  formatStringToCommaSeparatedNumber,
  replacePersianDigits,
  translateRTKFetchBaseQueryErrors,
} from "@/app/lib/utils";
import LeveledCategoryList from "../Categories/LeveledCategoryList";
import Editor from "../Utils/Tiptop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const EditProductModal = ({
  product,
  setProduct,
}: {
  product: Product | undefined;
  setProduct: Function;
}) => {
  const [editProductAction, { isLoading: editProductIsLoading }] =
    useEditProductMutation();
  const [error, setError] = useState("");
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
  useEffect(() => {
    if (!product) return;
    reset(product);
    setValue(
      "count",
      formatStringToCommaSeparatedNumber(
        replacePersianDigits(product?.count?.toString())
      )
    );
    setValue(
      "price",
      formatStringToCommaSeparatedNumber(
        replacePersianDigits(product?.price?.toString())
      )
    );
    setValue("category", product?.category?.toString());
    setImageUrl(product?.image_url!);
    setHtml(product?.description!);
  }, [product]);

  useEffect(() => {}, [errors]);
  useEffect(() => {
    if (error == "400") {
      toast("نام کالا تکراری است", {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
          fontFamily: "iransans",
        },
      });
    }
    setError("");
  }, [error]);
  function handleChangePrice(e: any) {
    setValue(
      "price",
      formatStringToCommaSeparatedNumber(replacePersianDigits(e.target.value))
    );
  }
  function handleChangeCount(e: any) {
    setValue(
      "count",
      formatStringToCommaSeparatedNumber(replacePersianDigits(e.target.value))
    );
  }
  const { data: parentCategories } = useGetParentCategoriesQuery();
  return (
    product && (
      <dialog open className="modal">
        <div className="modal-box">
          <div className="modal-action ">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setProduct(null);
              }}
            />
            <form
              onSubmit={handleSubmit((data) => {
                data["price"] = data["price"].replaceAll(",", "");
                data["count"] = data["count"].replaceAll(",", "");
                editProductAction(data)
                  .unwrap()
                  .then(() => {
                    setProduct("");
                    toast("با موفقیت انجام شد", {
                      position: "top-center",
                      duration: 3000,
                      style: {
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "iransans",
                      },
                    });
                  })
                  .catch((err: FetchBaseQueryError) => {
                    setError(translateRTKFetchBaseQueryErrors(err));
                  });
              })}
              className="mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-5/6 mb-4"
              dir="rtl"
            >
              <input type="text" hidden readOnly />
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
                  <p className="text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
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
                  <p className="text-sm text-red-500">
                    {errors?.info?.message}
                  </p>
                )}
              </label>
              <LeveledCategoryList
                categories={parentCategories}
                value={getValues("category")?.toString()}
                onChange={(value) => {
                  if (!value) return;
                  setValue("category", value?.toString());
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
                  <p className="text-sm text-red-500">
                    {errors?.price?.message}
                  </p>
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
                  <p className="text-sm text-red-500">
                    {errors?.count?.message}
                  </p>
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
                {editProductIsLoading && (
                  <span className="loading loading-spinner"></span>
                )}
                {!editProductIsLoading && <span>ثبت</span>}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditProductModal;
