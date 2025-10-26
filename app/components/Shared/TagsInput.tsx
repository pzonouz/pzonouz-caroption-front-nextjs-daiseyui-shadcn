import React, { useState } from "react";
import { X } from "lucide-react";

export default function TagsInput({
  title,
  tags,
  setTags,
}: {
  title: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const newTag = value.trim();
    if (newTag && !tags?.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="w-full text-gray-800">
      <label>
        <span>{title}</span>
      </label>

      <div className="flex flex-wrap items-center gap-2 p-2 border border-base-300 rounded-box focus-within:ring focus-within:ring-primary/40">
        {tags?.map((tag) => (
          <div key={tag} className="badge badge-primary gap-1 p-3">
            {tag}
            <button
              type="button"
              className="btn btn-xs btn-circle btn-ghost"
              onClick={() => removeTag(tag)}
            >
              <X />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-ghost grow min-w-[100px] focus:outline-none"
          placeholder="کلمات را وارد کنید و در انتها اینتر بزنید"
        />
      </div>
    </div>
  );
}
