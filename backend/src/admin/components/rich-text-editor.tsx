import { Button, Text } from "@medusajs/ui"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { uploadBlogImages } from "../lib/upload"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      size="small"
      variant={active ? "primary" : "secondary"}
      disabled={disabled}
      onClick={onClick}
      className="min-w-[2rem]"
    >
      {children}
    </Button>
  )
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article…",
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML())
    },
    editorProps: {
      attributes: {
        class: "gg-blog-editor prose max-w-none min-h-[280px] px-4 py-3 outline-none",
      },
    },
  })

  useEffect(() => {
    if (!editor || editor.isFocused) return
    const current = editor.getHTML()
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) {
    return <Text size="small">Loading editor…</Text>
  }

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Link URL", previous || "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const addImageFromUrl = () => {
    const url = window.prompt("Or paste an image URL")
    if (!url) return
    editor.chain().focus().setImage({ src: url }).run()
  }

  const addImageFromFile = () => {
    fileInputRef.current?.click()
  }

  const onImageFiles = async (files: FileList | null) => {
    if (!files?.length || !editor) return
    setUploadingImage(true)
    try {
      const uploaded = await uploadBlogImages(Array.from(files))
      for (const file of uploaded) {
        editor.chain().focus().setImage({ src: file.url }).run()
      }
    } catch (err: any) {
      window.alert(err.message || "Image upload failed")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ui-border-base">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
        className="hidden"
        multiple
        onChange={(e) => onImageFiles(e.target.files)}
      />
      <style>{`
        .gg-blog-editor p { margin: 0.6em 0; }
        .gg-blog-editor h2 { font-size: 1.4rem; font-weight: 600; margin: 1.1em 0 0.4em; }
        .gg-blog-editor h3 { font-size: 1.2rem; font-weight: 600; margin: 1em 0 0.35em; }
        .gg-blog-editor h4 { font-size: 1.05rem; font-weight: 600; margin: 0.9em 0 0.3em; }
        .gg-blog-editor ul { list-style: disc; padding-left: 1.4rem; margin: 0.6em 0; }
        .gg-blog-editor ol { list-style: decimal; padding-left: 1.4rem; margin: 0.6em 0; }
        .gg-blog-editor blockquote {
          border-left: 3px solid #c4a35a;
          padding-left: 0.9rem;
          margin: 0.8em 0;
          color: #6b635a;
          font-style: italic;
        }
        .gg-blog-editor a { color: #8b6914; text-decoration: underline; }
        .gg-blog-editor img { max-width: 100%; height: auto; border-radius: 6px; margin: 0.8em 0; }
        .gg-blog-editor mark { background: #fde68a; padding: 0 0.15em; }
        .gg-blog-editor p.is-editor-empty:first-child::before {
          color: #a1a1aa;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="flex flex-wrap items-center gap-1 border-b border-ui-border-base bg-ui-bg-subtle px-2 py-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          HL
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ui-border-base" />
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ui-border-base" />
        <ToolbarButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ui-border-base" />
        <ToolbarButton active={editor.isActive("link")} onClick={setLink}>
          Link
        </ToolbarButton>
        <ToolbarButton disabled={uploadingImage} onClick={addImageFromFile}>
          {uploadingImage ? "Uploading…" : "Upload image"}
        </ToolbarButton>
        <ToolbarButton onClick={addImageFromUrl}>Image URL</ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          Clear
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-1 text-xs text-ui-fg-subtle">
            Color
            <input
              type="color"
              className="h-7 w-8 cursor-pointer rounded border border-ui-border-base"
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
            />
          </label>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
