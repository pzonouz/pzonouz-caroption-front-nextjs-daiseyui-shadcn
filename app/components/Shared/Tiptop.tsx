"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";

import { SetStateAction, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

export default function Editor({
  state,
  setStateAction,
  className,
}: {
  state: string | null | undefined;
  setStateAction: React.Dispatch<SetStateAction<string | null | undefined>>;
  className?: string;
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
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: state,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setStateAction(editor.getHTML());
    },
  });

  // sync content from outside state -> editor
  useEffect(() => {
    if (editor && state !== editor.getHTML()) {
      editor.commands.setContent(state || "", { emitUpdate: false });
    }
  }, [state, editor]);

  // ✅ Fixed link function
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return; // canceled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }, [editor]);

  // ✅ Simple check without useEditorState
  const isLink = editor?.isActive("link");

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/backend/upload-file`, {
      method: "POST",
      body: formData,
    });

    const data = await res.text();
    return data;
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
          .setImage({ src: `/media/${url}` })
          .run();
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="btn_tiptap" onClick={handleImageUpload}>
          🖼
        </div>

        {/* Link Buttons */}
        <div
          className={classNames("btn_tiptap", { is_active: isLink })}
          onClick={setLink}
        >
          Set link
        </div>

        <button
          className={classNames("btn_tiptap", { is_active: isLink })}
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!isLink}
        >
          Unset link
        </button>

        {/* Formatting Buttons */}
        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("bold"),
          })}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </div>

        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("italic"),
          })}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </div>

        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("strike"),
          })}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </div>

        {/* Headings */}
        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("heading", { level: 1 }),
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </div>
        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("heading", { level: 2 }),
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </div>
        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("heading", { level: 3 }),
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </div>

        {/* Color picker */}
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

        {/* Lists */}
        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("bulletList"),
          })}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </div>

        <div
          className={classNames("btn_tiptap", {
            is_active: editor.isActive("orderedList"),
          })}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </div>
      </div>

      {/* Editor area */}
      <div className="min-h-[150px] pr-6 border rounded-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
