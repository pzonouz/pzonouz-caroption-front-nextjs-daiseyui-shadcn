"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const MultipleImageUpload = ({
  parentId,
  imageUrls,
  setImageUrls,
}: {
  parentId: string;
  imageUrls: string[];
  setImageUrls: (value: string[]) => void;
}) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/backend/upload-image/`, true);

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
        }
      };

      xhr.onload = function () {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setImageUrls([...imageUrls, response.url]);
        }
      };

      xhr.onerror = function () {
        console.error("Upload failed for:", file.name);
      };

      xhr.send(formData);
    });
  };

  return (
    <>
      <input
        className="file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium
         file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
      />

      <div className="mt-2 space-y-2">
        {Object.entries(uploadProgress).map(([fileName, percent]) => (
          <div key={fileName} className="text-sm text-blue-500">
            {fileName}: {percent}%
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {imageUrls.map((url, i) => (
          <div className="relative" key={url}>
            <X
              className="absolute top-2 right-2 bg-red-600 text-white rounded-xl cursor-pointer"
              onClick={() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/delete_from_image_urls/${parentId}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image_name: url }),
                  },
                )
                  .then(() => {
                    setImageUrls(imageUrls.filter((item) => item != url));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
            <Image
              key={i}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`}
              alt={`Uploaded-${i}`}
              className="w-32 h-32 object-cover rounded-md"
              width={128}
              height={128}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleImageUpload;
