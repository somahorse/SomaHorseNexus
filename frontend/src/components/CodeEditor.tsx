import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    initialValue: string;
    theme?: "vs-dark" | "light";
    language?: string;
    onChange: (value: string | undefined) => void;
}

export function CodeEditor({
    initialValue,
    theme = "vs-dark",
    language = "python",
    onChange
}: CodeEditorProps) {
    return (
        <div className="h-full w-full rounded-md overflow-hidden border border-white/10">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue={initialValue}
                theme={theme}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 }
                }}
            />
        </div>
    );
}
