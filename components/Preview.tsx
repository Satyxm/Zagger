"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

interface PreviewProps {
    spec: string | object;
}

export default function Preview({ spec }: PreviewProps) {
    return (
        <div className="h-full w-full overflow-auto bg-white">
            <div className="swagger-wrapper">
                <SwaggerUI spec={spec} />
            </div>
        </div>
    );
}
