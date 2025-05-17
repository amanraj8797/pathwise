import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
}

const CodeEditor = ({
  value,
  onChange,
  language = "javascript",
  className,
}: CodeEditorProps) => {
  // This is a simplified version for demonstration purposes
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize the textarea based on content
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Simple syntax highlighting simulation with a monospace font
  return (
    <div className={cn("relative h-full w-full overflow-auto", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="h-full w-full resize-none bg-gray-900 p-4 font-mono text-sm text-white outline-none"
        style={{
          minHeight: "100%",
          lineHeight: 1.5,
          tabSize: 2,
        }}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
