// "use client";
//
// import { useState } from "react";
// import Image from "next/image";
// import {
//   useCreateImageMutation,
//   useGetImagesQuery,
// } from "@/app/lib/features/api";
// import { Image as ImageType } from "@/app/lib/schemas";
// import ImageCard from "./ImageCard";
// import { CollapsibleSection } from "./CollapsibleSection";
// import ImageUpload from "./ImageUpload";
// import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";
// import { translateRTKFetchBaseQueryErrors } from "@/app/lib/utils";
//
// type ImagesManagerProps = {
//   type: "One" | "Multiple";
//   selectedImageId?: string | null;
//   setSelectedImageId?: React.Dispatch<React.SetStateAction<string>> | null;
//   selectedImages?: ImageType[] | null;
//   setSelectedImages?: (string) => void;
// };
//
// const ImagesManager = ({
//   type,
//   selectedImageId,
//   setSelectedImageId,
//   selectedImages,
//   setSelectedImages,
// }: ImagesManagerProps) => {
//   const { data: images } = useGetImagesQuery();
//   const [createImageOpen, setCreateImageOpen] = useState(false);
//   const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
//
//   const handleToggleGallery = () => setImageGalleryOpen(true);
//
//   return (
//     <div className="w-full border-[2px] border-solid rounded-md p-2">
//       {type == "One" && selectedImageId && <div>تصویر اصلی</div>}
//       {type == "Multiple" && selectedImages?.length > 0 && <div>تصاویر</div>}
//       <SelectedImagePreview
//         type={type}
//         selectedImageId={selectedImageId}
//         selectedImages={selectedImages}
//         images={images}
//         onClick={handleToggleGallery}
//       />
//
//       {imageGalleryOpen && (
//         <div className="w-full">
//           <CollapsibleSection
//             isOpen={createImageOpen}
//             onToggle={() => setCreateImageOpen((prev) => !prev)}
//           >
//             <CreateImageForm />
//           </CollapsibleSection>
//
//           <ImageGallery
//             type={type}
//             images={images}
//             selectedImageId={selectedImageId}
//             setSelectedImageId={setSelectedImageId}
//             selectedImages={selectedImages}
//             setSelectedImages={setSelectedImages}
//             closeGallery={() => setImageGalleryOpen(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ImagesManager;
//
// //
// // --- Subcomponents ---
// //
//
// const SelectedImagePreview = ({
//   type,
//   selectedImageId,
//   selectedImages,
//   images,
//   onClick,
// }: {
//   type: "One" | "Multiple";
//   selectedImageId?: string | null;
//   selectedImages?: ImageType[] | null;
//   images?: ImageType[];
//   onClick: () => void;
// }) => {
//   if (type === "One") {
//     const selected = images?.find((i) => i.id === selectedImageId);
//     return selected ? (
//       <Image
//         className="cursor-pointer"
//         onClick={onClick}
//         width={100}
//         height={100}
//         alt=""
//         src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selected.imageUrl}`}
//       />
//     ) : (
//       <div onClick={onClick} className="cursor-pointer text-primary">
//         اضافه کردن تصویر اصلی
//       </div>
//     );
//   }
//
//   if (selectedImages?.length) {
//     return (
//       <div className="grid grid-cols-2">
//         {selectedImages.map((i) => (
//           <Image
//             key={i.id}
//             className="cursor-pointer"
//             onClick={onClick}
//             width={100}
//             height={100}
//             alt=""
//             src={`${process.env.NEXT_PUBLIC_BASE_URL}/${i.imageUrl}`}
//           />
//         ))}
//       </div>
//     );
//   }
//
//   return (
//     <div onClick={onClick} className="cursor-pointer text-primary">
//       اضافه کردن تصاویر
//     </div>
//   );
// };
//
// const CreateImageForm = () => {
//   const [imageUrl, setImageUrl] = useState("");
//   const [imageName, setImageName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [createImage] = useCreateImageMutation();
//
//   const handleSubmit = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await createImage({ name: imageName, imageUrl }).unwrap();
//       SuccessToast();
//     } catch (err) {
//       ErrorToast(translateRTKFetchBaseQueryErrors(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//     <div className="flex flex-col items-start gap-1">
//       <input
//         className="input"
//         type="text"
//         value={imageName}
//         onChange={(e) => setImageName(e.target.value)}
//       />
//       <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
//       <button
//         className="btn btn-primary"
//         onClick={handleSubmit}
//         disabled={isLoading}
//       >
//         {isLoading ? <div className="loading loading-spinner" /> : "ثبت"}
//       </button>
//     </div>
//   );
// };
//
// const ImageGallery = ({
//   type,
//   images,
//   selectedImageId,
//   setSelectedImageId,
//   selectedImages,
//   setSelectedImages,
//   closeGallery,
// }: {
//   type: "One" | "Multiple";
//   images?: ImageType[];
//   selectedImageId?: string | null;
//   setSelectedImageId?: React.Dispatch<React.SetStateAction<string>> | null;
//   selectedImages?: ImageType[] | null;
//   setSelectedImages?: React.Dispatch<React.SetStateAction<ImageType[]>> | null;
//   closeGallery: () => void;
// }) => {
//   const toggleSelected = (image: ImageType) => {
//     if (type === "Multiple" && selectedImages && setSelectedImages) {
//       const exists = selectedImages.some(
//         (img) => String(img.id) === String(image.id),
//       );
//       setSelectedImages(
//         exists
//           ? selectedImages.filter((p) => String(p.id) !== String(image.id))
//           : [...selectedImages, image],
//       );
//     } else if (type === "One" && setSelectedImageId) {
//       setSelectedImageId(image.id);
//       closeGallery();
//     }
//   };
//
//   return (
//     <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-h-[60vh] overflow-y-auto">
//       {images?.map((i) => (
//         <ImageCard
//           key={String(i.id)}
//           selected={
//             type === "Multiple"
//               ? (selectedImages?.some(
//                   (img) => String(img.id) === String(i.id),
//                 ) ?? false)
//               : selectedImageId === i.id
//           }
//           toggleSelected={toggleSelected}
//           image={{ ...i, id: String(i.id) }}
//         />
//       ))}
//     </div>
//   );
// };
//
"use client";
import { useState } from "react";
import Image from "next/image";
import {
  useCreateImageMutation,
  useGetImagesQuery,
} from "@/app/lib/features/api";
import { Image as ImageType } from "@/app/lib/schemas";
import ImageCard from "./ImageCard";
import { CollapsibleSection } from "./CollapsibleSection";
import ImageUpload from "./ImageUpload";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";
import { translateRTKFetchBaseQueryErrors } from "@/app/lib/utils";

type ImagesManagerProps = {
  type: "One" | "Multiple";
  selectedImageId?: string | null;
  setSelectedImageId?: (id: string) => void;
  selectedImageIds?: string[] | null;
  setSelectedImageIds?: (ids: string[]) => void;
};

const ImagesManager = ({
  type,
  selectedImageId,
  setSelectedImageId,
  selectedImageIds,
  setSelectedImageIds,
}: ImagesManagerProps) => {
  const { data: images } = useGetImagesQuery();
  const [createImageOpen, setCreateImageOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);

  const handleToggleGallery = () => setImageGalleryOpen(true);

  return (
    <div className="w-full border-[2px] border-solid rounded-md p-2">
      {type == "One" && selectedImageId && <div>تصویر اصلی</div>}
      {type == "Multiple" && selectedImageIds?.length > 0 && <div>تصاویر</div>}

      <SelectedImagePreview
        type={type}
        selectedImageId={selectedImageId}
        selectedImageIds={selectedImageIds}
        images={images}
        onClick={handleToggleGallery}
      />

      {imageGalleryOpen && (
        <div className="w-full">
          <CollapsibleSection
            isOpen={createImageOpen}
            onToggle={() => setCreateImageOpen((prev) => !prev)}
          >
            <CreateImageForm />
          </CollapsibleSection>

          <ImageGallery
            type={type}
            images={images}
            selectedImageId={selectedImageId}
            setSelectedImageId={setSelectedImageId}
            selectedImageIds={selectedImageIds}
            setSelectedImageIds={setSelectedImageIds}
            closeGallery={() => setImageGalleryOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ImagesManager;

//
// --- Subcomponents ---
//

const SelectedImagePreview = ({
  type,
  selectedImageId,
  selectedImageIds,
  images,
  onClick,
}: {
  type: "One" | "Multiple";
  selectedImageId?: string | null;
  selectedImageIds?: string[] | null;
  images?: ImageType[];
  onClick: () => void;
}) => {
  if (type === "One") {
    const selected = images?.find((i) => String(i.id) === selectedImageId);
    return selected ? (
      <Image
        className="cursor-pointer"
        onClick={onClick}
        width={100}
        height={100}
        alt=""
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selected.imageUrl}`}
      />
    ) : (
      <div onClick={onClick} className="cursor-pointer text-primary">
        اضافه کردن تصویر اصلی
      </div>
    );
  }

  if (selectedImageIds?.length && images) {
    return (
      <div className="grid grid-cols-2">
        {selectedImageIds.map((id) => {
          const img = images.find((i) => String(i.id) === id);
          return (
            img && (
              <Image
                key={id}
                className="cursor-pointer"
                onClick={onClick}
                width={100}
                height={100}
                alt=""
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${img.imageUrl}`}
              />
            )
          );
        })}
      </div>
    );
  }

  return (
    <div onClick={onClick} className="cursor-pointer text-primary">
      اضافه کردن تصاویر
    </div>
  );
};

const CreateImageForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createImage] = useCreateImageMutation();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createImage({ name: imageName, imageUrl }).unwrap();
      SuccessToast();
    } catch (err) {
      ErrorToast(translateRTKFetchBaseQueryErrors(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <input
        className="input"
        type="text"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <div className="loading loading-spinner" /> : "ثبت"}
      </button>
    </div>
  );
};

const ImageGallery = ({
  type,
  images,
  selectedImageId,
  setSelectedImageId,
  selectedImageIds,
  setSelectedImageIds,
  closeGallery,
}: {
  type: "One" | "Multiple";
  images?: ImageType[];
  selectedImageId?: string | null;
  setSelectedImageId?: (id: string) => void;
  selectedImageIds?: string[] | null;
  setSelectedImageIds?: (ids: string[]) => void;
  closeGallery: () => void;
}) => {
  const toggleSelected = (image: ImageType) => {
    if (type === "Multiple" && selectedImageIds && setSelectedImageIds) {
      const exists = selectedImageIds.some(
        (id) => String(id) === String(image.id),
      );
      setSelectedImageIds(
        exists
          ? selectedImageIds.filter((id) => String(id) !== String(image.id))
          : [...selectedImageIds, String(image.id)],
      );
    } else if (type === "One" && setSelectedImageId) {
      setSelectedImageId(String(image.id));
      closeGallery();
    }
  };

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-h-[60vh] overflow-y-auto">
      {images?.map((i) => (
        <ImageCard
          key={String(i.id)}
          selected={
            type === "Multiple"
              ? (selectedImageIds?.some((id) => String(id) === String(i.id)) ??
                false)
              : selectedImageId === String(i.id)
          }
          toggleSelected={() => toggleSelected(i)}
          image={{ ...i, id: String(i.id) }}
        />
      ))}
    </div>
  );
};
