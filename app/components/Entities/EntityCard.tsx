import Image from "next/image";
import Link from "next/link";
import { Entity } from "../../lib/schemas";

const EntityCard = ({
  entity,
  type = "col",
  className = "",
}: {
  entity: Entity;
  type?: "col" | "row";
  className?: string;
}) => {
  return (
    <Link
      href={`/entities/${entity?.slug}`}
      className={`flex ${
        type === "col" ? "flex-col" : "flex-row"
      } gap-3 items-center border-gray-500 bg-white border border-solid rounded-md relative overflow-hidden ${className}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-800/0 hover:bg-gray-800/10 transition-colors duration-300"
        id="overlay"
      ></div>

      {/* Image */}
      <Image
        src={
          entity.imageUrl
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${entity?.imageUrl}`
            : "/images/logo.jpg"
        }
        alt={entity.name}
        width={400}
        height={400}
        className={`${
          type === "col" ? "w-full" : "w-32 h-32 object-cover"
        } p-0.5 flex-shrink-0`}
      />

      {/* Text */}
      <div
        className={`flex flex-col ${
          type === "col" ? "items-center px-6 pb-4" : "items-start px-2 py-2"
        }`}
      >
        <div className="text-sm font-bold line-clamp-2">{entity.name}</div>
        <div className="flex flex-row gap-1 text-emerald-500 text-xs font-bold">
          قیمت: تماس بگیرید
        </div>
      </div>
    </Link>
  );
};

export default EntityCard;
