"use client";

import Editor from "@monaco-editor/react";

interface EditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
}

export default function YamlEditor({ value, onChange }: EditorProps) {
    return (
        <div className="h-full w-full border-r border-gray-200 dark:border-gray-800">
            <Editor
                height="100%"
                defaultLanguage="yaml"
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
