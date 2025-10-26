"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditArticle } from "./hooks/useEditArticle";
import ArticleForm from "./ArticleForm";
import React, { useEffect } from "react";
import { Article } from "../../lib/schemas";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { submitHandler } from "../../lib/utils";

const EditArticleModal = ({
  article,
  setArticle,
}: {
  article: Article | null | undefined;
  setArticle: React.Dispatch<React.SetStateAction<Article | null | undefined>>;
}) => {
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editArticleIsLoading,
    editArticleAction,
  } = useEditArticle({ article });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editArticleIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [dispatch, editArticleIsLoading]);

  if (!article) return null;
  return (
    <dialog open className="modal">
      <div className="modal-box w-full h-screen max-w-none p-6 relative rounded-none">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setArticle(undefined);
            }}
          />
          <label className="text-3xl text-center w-5/6">ویرایش کالا</label>

          <ArticleForm
            submitHandler={submitHandler<Article>({
              action: editArticleAction,
              handleSubmit,
              setError,
              reset,
              setObject: setArticle,
            })}
            error={error}
            isLoading={editArticleIsLoading}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </div>
      </div>
    </dialog>
  );
};

export default EditArticleModal;
