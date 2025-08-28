"use client";

import { Brand } from "@/app/lib/schemas";
import { submitHandler } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandForm from "./BrandForm";
import { useEditBrand } from "./Hooks/useEditBrand";

const EditBrandModal = ({
  brand,
  setBrand,
}: {
  brand: Brand | null | undefined;
  setBrand: React.Dispatch<React.SetStateAction<Brand | null | undefined>>;
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
    editBrandIsLoading,
    editBrandAction,
  } = useEditBrand({ brand: brand ?? undefined });
  if (!brand) return null;
  return (
    brand && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full relative">
          <div className="modal-action w-full flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setBrand(null);
              }}
            />
            <label className=" text-3xl text-center w-5/6">ویرایش برند</label>
            <BrandForm
              submitHandler={submitHandler<Brand>({
                action: editBrandAction,
                handleSubmit,
                setError,
                reset,
                setObject: setBrand,
              })}
              error={error}
              isLoading={editBrandIsLoading}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditBrandModal;
