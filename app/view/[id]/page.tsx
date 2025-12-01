import { getSpec } from '@/lib/storage';
import Preview from '@/components/Preview';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ViewPage({ params }: PageProps) {
    const { id } = await params;
    const content = await getSpec(id);

    if (!content) {
        notFound();
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <header className="h-14 border-b flex items-center px-4 bg-white shadow-sm shrink-0">
                <h1 className="font-bold text-lg">Zagger Preview</h1>
                <span className="ml-4 text-sm text-gray-500">Read-only Mode</span>
            </header>
            <div className="flex-1 overflow-hidden">
                <Preview spec={content} />
            </div>
        </div>
    );
}
