import { JSX } from "react";
import { Entity } from "../../lib/schemas";

interface Props {
  categories: Entity[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const LeveledEntityList = ({ categories, value, onChange }: Props) => {
  const renderOptions = (items: Entity[], level = 0): JSX.Element[] => {
    return items.flatMap((entity) => {
      const indent = "—".repeat(level);
      const option = (
        <option key={entity.id} value={entity.id?.toString()}>
          {indent} {entity.name}
        </option>
      );
      const children = entity.children
        ? renderOptions(entity.children, level + 1)
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

export default LeveledEntityList;
