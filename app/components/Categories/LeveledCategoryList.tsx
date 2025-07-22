import { Category } from "@/app/lib/types";
import { JSX } from "react";

interface Props {
  categories: Category[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const LeveledCategoryList = ({ categories, value, onChange }: Props) => {
  const renderOptions = (items: Category[], level = 0): JSX.Element[] => {
    return items.flatMap((category) => {
      const indent = "—".repeat(level);
      const option = (
        <option key={category.id} value={category.id?.toString()}>
          {indent} {category.name}
        </option>
      );
      const children = category.children
        ? renderOptions(category.children, level + 1)
        : [];
      return [option, ...children];
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value === "" ? "" : e.target.value;
    onChange(selectedValue!);
  };

  return (
    <div className="form-control w-full">
      <select
        className="select select-bordered w-full"
        value={value!}
        onChange={handleChange}
      >
        <option value="">انتخاب دسته‌بندی</option>
        {renderOptions(categories)}
      </select>
    </div>
  );
};

export default LeveledCategoryList;
