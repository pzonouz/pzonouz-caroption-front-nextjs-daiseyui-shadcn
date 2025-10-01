import { Image as ImageType } from "@/app/lib/schemas";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ImageCard = ({
  image,
  selected,
  toggleSelected,
}: {
  image: ImageType;
  selected: boolean;
  toggleSelected: (image: ImageType) => void;
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="">
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
          <Trash className="bg-white text-red-500 p-1 rounded-2xl " size={24} />
        </div>
        <Image
          alt={image?.name}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image?.imageUrl}`}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default ImageCard;
