import { saveSpec } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { content } = await request.json();
        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }
        const id = await saveSpec(content);
        // Construct full URL
        const url = `${new URL(request.url).origin}/view/${id}`;
        return NextResponse.json({ id, url });
    } catch (error) {
        console.error('Share error:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
