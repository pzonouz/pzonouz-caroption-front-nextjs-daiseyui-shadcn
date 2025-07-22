"use client";

import { useEditPersonMutation } from "@/app/lib/features/api";
import { Person } from "@/app/lib/schemas";
import { translateRTKFetchBaseQueryErrors } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditPersonModal = ({
  person,
  setPerson,
}: {
  person: Person | undefined;
  setPerson: Function;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Person>();

  useEffect(() => {
    if (person) {
      reset(person);
    }
  }, [person]);

  const [error, setError] = useState("");
  const [editPersonAction, { isLoading: editPersonIsLoading }] =
    useEditPersonMutation();
  if (!person) return null;
  return (
    person && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full">
          <div className="modal-action ">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setPerson(null);
              }}
            />
            <form
              onSubmit={handleSubmit((data) => {
                editPersonAction(data)
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
                    setPerson(null);
                  })
                  .catch((err: FetchBaseQueryError) => {
                    setError(translateRTKFetchBaseQueryErrors(err));
                  });
              })}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-4"
            >
              <input {...register("id")} hidden readOnly type="text" />
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
                    {errors?.firstname?.message?.toString()}
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
                    {errors?.lastname?.message?.toString()}
                  </p>
                )}
              </label>
              <label className="floating-label w-full">
                <span>شماره تماس</span>
                <input
                  {...register("phone")}
                  lang="en"
                  dir="ltr"
                  className={classNames("input input-md w-full", {
                    "input-error": errors?.phone,
                  })}
                  type="text"
                />
                {errors?.phone && (
                  <p className="text-sm text-red-500">
                    {errors?.phone?.message?.toString()}
                  </p>
                )}
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" className="btn btn-primary w-full">
                {editPersonIsLoading && (
                  <span className="loading loading-spinner"></span>
                )}
                {!editPersonIsLoading && <span>ثبت</span>}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditPersonModal;
