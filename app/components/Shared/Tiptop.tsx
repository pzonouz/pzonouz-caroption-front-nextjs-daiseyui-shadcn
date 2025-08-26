"use client";

// import styles from "./tiptop.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";

import { SetStateAction, useEffect, useState } from "react";

export default function Editor({
  state,
  setState,
}: {
  state: string | null | undefined;
  setState: React.Dispatch<SetStateAction<string | null | undefined>>;
}) {
  const [color, setColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Bold,
      Italic,
      Strike,
      TextStyle,
      Color,
      ListItem,
      BulletList,
      OrderedList,
      Text,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    onUpdate: ({ editor }) => {
      setState(editor?.getHTML());
    },
    content: state,
    immediatelyRender: false,
  });
  //immediate update of tiptap
  useEffect(() => {
    if (editor && state !== editor.getHTML()) {
      editor.commands.setContent(state, false); // `false` avoids creating history step
    }
  }, [state, editor]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/backend/upload-image/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const url = await uploadImage(file);
        editor
          ?.chain()
          .focus()
          .setImage({ src: `${url}` })
          .run();
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="btn_tiptap" onClick={handleImageUpload}>
          🖼
        </div>
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </div>
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </div>
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            editor.chain().focus().setColor(e.target.value).run();
          }}
        />
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          R
        </div>
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </div>
        <div
          className="btn_tiptap"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </div>
      </div>

      <div className="min-h-[150px] pr-6 border rounded-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
