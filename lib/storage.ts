import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { kv } from '@vercel/kv';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function saveSpec(content: string): Promise<string> {
    const id = crypto.randomBytes(4).toString('hex');

    // Use Vercel KV if configured (Production/Preview)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        await kv.set(`spec:${id}`, content);
        // Set expiration to 30 days (optional, but good practice)
        await kv.expire(`spec:${id}`, 60 * 60 * 24 * 30);
    } else {
        // Fallback to filesystem (Local Development)
        await fs.mkdir(DATA_DIR, { recursive: true });
        const filePath = path.join(DATA_DIR, `${id}.yaml`);
        await fs.writeFile(filePath, content, 'utf-8');
    }

    return id;
}

export async function getSpec(id: string): Promise<string | null> {
    // Try Vercel KV first if configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const content = await kv.get<string>(`spec:${id}`);
        return content;
    }

    // Fallback to filesystem
    const filePath = path.join(DATA_DIR, `${id}.yaml`);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        return null;
    }
}
