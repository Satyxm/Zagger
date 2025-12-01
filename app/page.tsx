"use client";

import { useState } from "react";
import YamlEditor from "@/components/Editor";
import Preview from "@/components/Preview";
import { DEFAULT_YAML } from "@/lib/constants";
import { Share, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [yaml, setYaml] = useState(DEFAULT_YAML);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: yaml }),
      });
      const data = await res.json();
      if (data.url) {
        setShareUrl(data.url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to share");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
          <h1 className="text-xl font-bold text-gray-900">Zagger</h1>
        </div>

        <div className="flex items-center gap-4">
          {shareUrl ? (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-md border border-green-200 animate-in fade-in slide-in-from-top-2">
              <input
                readOnly
                value={shareUrl}
                className="bg-transparent text-sm text-green-800 w-48 outline-none truncate"
              />
              <button onClick={copyToClipboard} className="text-green-700 hover:text-green-900 p-1 hover:bg-green-100 rounded">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <Link href={shareUrl} target="_blank" className="text-green-700 hover:text-green-900 p-1 hover:bg-green-100 rounded">
                <ExternalLink size={16} />
              </Link>
            </div>
          ) : (
            <button
              onClick={handleShare}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium text-sm"
            >
              <Share size={16} />
              {loading ? "Saving..." : "Share"}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Panel */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200 bg-white relative group">
          <div className="absolute top-2 right-4 z-10 bg-gray-100 text-xs text-gray-500 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            YAML Editor
          </div>
          <YamlEditor value={yaml} onChange={(val) => {
            setYaml(val || "");
            setShareUrl(null); // Reset share URL on change
          }} />
        </div>

        {/* Preview Panel */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white overflow-hidden relative">
          <Preview spec={yaml} />
        </div>
      </main>
    </div>
  );
}
