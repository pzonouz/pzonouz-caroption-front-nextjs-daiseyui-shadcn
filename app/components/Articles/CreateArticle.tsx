"use client";

import { Article } from "../../lib/schemas";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { useCreateArticle } from "./hooks/useCreateArticle";
import ArticleForm from "./ArticleForm";
import { submitHandler, toggle } from "../../lib/utils";

export function CreateArticle() {
  const {
    open,
    setOpen,
    error,
    errors,
    createArticleIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createArticleAction,
  } = useCreateArticle();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد مقاله</label>
        <ArticleForm
          error={error}
          isLoading={createArticleIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Article>({
            action: createArticleAction,
            handleSubmit,
            setError,
            reset,
            transform: (data) => ({
              ...data,
              count: data.count?.replaceAll(",", ""),
              price: data?.price?.replaceAll(",", ""),
            }),
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
