"use client";
import { useGetParentEntitiesQuery } from "@/app/lib/features/api";
import Image from "next/image";
import Link from "next/link";
const FirstLevelEntities = () => {
  const { data: entities, error } = useGetParentEntitiesQuery();
  const firstLevel = entities?.filter((item) => item?.parentId === null);
  return (
    <div className="bg-gray-600  mt-6">
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {firstLevel?.map((e) => (
          <Link key={e.id} href={`/entities/${e.id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${e?.imageUrl}`}
              alt={e?.name}
              width={400}
              height={300}
              className="rounded-lg shadow-md m-4"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FirstLevelEntities;
