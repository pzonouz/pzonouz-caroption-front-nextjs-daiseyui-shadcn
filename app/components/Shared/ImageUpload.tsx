import Image from "next/image";
import React, { useState } from "react";

const ImageUpload = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (value: string) => void; // plain function
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setImage] = useState<File | null>(null);
  return (
    <>
      <input
        className="file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium
         file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImage(file);

          const formData = new FormData();
          formData.append("image", file);

          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image/`,
            true,
          );

          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100);
              setUploadProgress(percent);
            }
          };

          xhr.onload = function () {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              setImageUrl(response.url);
            }
          };

          xhr.onerror = function () {
            console.error("Upload failed.");
          };

          xhr.send(formData);
        }}
      />
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="text-sm text-blue-500">{uploadProgress}%</div>
      )}
      {imageUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${imageUrl}`}
          alt="Uploaded"
          className="w-32 h-auto mt-2 rounded-md"
          width={800}
          height={800}
        />
      )}
    </>
  );
};

export default ImageUpload;
