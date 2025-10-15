import { useDeleteImageMutation } from "@/app/lib/features/api";
import { Image as ImageType } from "@/app/lib/schemas";
import { Trash } from "lucide-react";
import Image from "next/image";

const ImageCard = ({
  image,
  selected,
  toggleSelected,
}: {
  image: ImageType;
  selected: boolean;
  toggleSelected: (image: ImageType) => void;
}) => {
  const [deleteImage, { isLoading }] = useDeleteImageMutation();
  return (
    <div className="border border-solid border-gray-600 w-full grid items-center">
      <div
        id="image actions"
        className="flex items-center justify-between gap-1 px-1 py-2 bg-gray-200"
      >
        <div className="bg-white rounded-2xl ">
          <input
            checked={selected}
            onChange={() => {
              toggleSelected(image);
            }}
            type="checkbox"
            className="checkbox checkbox-md rounded-2xl bg-white"
          />
        </div>
        {isLoading ? (
          <div className="loading loading-spinner text-error"></div>
        ) : (
          <Trash
            onClick={() => deleteImage(image?.id).then().catch()}
            className="bg-white text-red-500 p-1 rounded-2xl cursor-pointer "
            size={24}
          />
        )}
      </div>
      <Image
        alt={image?.name}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image?.imageUrl}`}
        width={100}
        height={100}
        className=" mx-auto"
      />
      <p className="text-sm border-t border-solid border-grey-500 text-center">
        {image?.name}
      </p>
    </div>
  );
};

export default ImageCard;
