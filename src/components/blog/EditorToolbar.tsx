import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
  disabled?: boolean;
}

export function EditorToolbar({ editor, disabled }: EditorToolbarProps) {
  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="editor-toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('bold') ? 'active' : ''}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('italic') ? 'active' : ''}`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('bulletList') ? 'active' : ''}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('orderedList') ? 'active' : ''}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('blockquote') ? 'active' : ''}`}
      >
        <Quote size={18} />
      </button>
      <button
        type="button"
        onClick={addLink}
        disabled={disabled}
        className={`toolbar-button ${editor.isActive('link') ? 'active' : ''}`}
      >
        <LinkIcon size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={disabled || !editor.can().undo()}
        className="toolbar-button"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={disabled || !editor.can().redo()}
        className="toolbar-button"
      >
        <Redo size={18} />
      </button>
    </div>
  );
}