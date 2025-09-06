import { useEffect } from "react";

const SelectBox = <T extends { id?: string; name: string }>({
  allItems,
  selectedItems = [],
  setselectedItems,
}: {
  allItems: T[];
  selectedItems: T[];
  setselectedItems: React.Dispatch<React.SetStateAction<T[]>>;
}) => {
  return (
    <div>
      {allItems?.map((item) => (
        <div key={item?.id} className="flex gap-2">
          <p>{item?.name}</p>
          <input
            key={item?.id}
            type="checkbox"
            checked={!!selectedItems?.find((i) => i?.id == item?.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setselectedItems([...selectedItems, item]);
              } else {
                setselectedItems(selectedItems.filter((i) => i.id != item.id));
              }
            }}
            className="toggle"
          />
        </div>
      ))}
    </div>
  );
};

export default SelectBox;
